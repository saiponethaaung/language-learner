package common

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type TokenData struct {
	ID   int    `json:"id"`
	Role string `json:"role"`
	jwt.RegisteredClaims
}

type AuthInfo struct {
	Type  string
	User  db.User
	Admin db.Admin
}

type contextKey string

const UserContextKey contextKey = "user"

func GenerateJWT(id *int, role *string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":   id,
			"role": role,
			"exp":  time.Now().Add(time.Hour * 24).Unix(),
		})

	secret := []byte("secret")
	tokenString, err := token.SignedString(secret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func ValidateJWT(tokenString string) (*TokenData, error) {
	secret := []byte("secret")
	token, err := jwt.ParseWithClaims(tokenString, &TokenData{}, func(token *jwt.Token) (interface{}, error) {
		if token.Method != jwt.SigningMethodHS256 {
			return nil, errors.New("unexpected signing method")
		}
		return secret, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*TokenData)

	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

func Authenticate(ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler) (interface{}, error) {
	md, ok := metadata.FromIncomingContext(ctx)

	excludedMethods := map[string]bool{"/admin.AdminService/Login": true, "/admin.AdminService/Register": true, "/user.UserService/Login": true, "/user.UserService/Register": true}

	// Extract metadata from context
	if !ok {
		return nil, fmt.Errorf("missing metadata")
	}

	if _, isSkipped := excludedMethods[info.FullMethod]; isSkipped {
		// Proceed with the request
		return handler(ctx, req)
	}

	// Extract Authorization token
	authHeader, exists := md["authorization"]
	if !exists || len(authHeader) == 0 {
		return nil, fmt.Errorf("authorization token required")
	}

	// Token format: "Bearer <token>"
	tokenString := authHeader[0]
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}

	// Validate the JWT and extract user info
	claims, err := ValidateJWT(tokenString)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid token: %v", err)
	}

	fmt.Println("middleware")
	fmt.Println(claims)
	fmt.Println("middleware")

	authInfo := AuthInfo{
		Type: claims.Role,
	}

	if claims.Role == "admin" {
		adminRepo := &db.AdminRepo{}
		admin, err := adminRepo.GetAdmin(ctx, claims.ID)

		if err != nil {
			return nil, status.Errorf(codes.Unauthenticated, "invalid token: %v", err)
		}

		authInfo.Admin = admin
	}

	// Store user info in context
	ctx = context.WithValue(ctx, UserContextKey, authInfo)

	// Proceed with the request
	return handler(ctx, req)
}
