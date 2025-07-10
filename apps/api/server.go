package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saiponethaaung/language-learner/apps/api/admin"
	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/course"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"github.com/saiponethaaung/language-learner/apps/api/language"
	"github.com/saiponethaaung/language-learner/apps/api/section"
	"github.com/saiponethaaung/language-learner/apps/api/section_unit"
	"github.com/saiponethaaung/language-learner/apps/api/user"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	// Context for database initialization (e.g., with a timeout)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second) // Add time import

	defer cancel()
	// Setup DB
	// fmt.Println("DB URL IS" + os.Getenv("DB_URL"))
	dbPool, err := pgxpool.New(ctx, "postgres://root:root@localhost:5437/ll")

	if err != nil {
		log.Fatal("Failed to start db connection, %v", err)
	}

	defer dbPool.Close()

	// Ping the database to ensure connectivity
	err = dbPool.Ping(ctx)
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Successfully connected to database.")

	// Setup GRPC
	port := "0.0.0.0:9090"
	lis, err := net.Listen("tcp", port)

	if err != nil {
		errorMessage := fmt.Sprintf("Failed to listen on port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}

	// Initialize repositories
	adminRepo := db.NewAdminRepo(dbPool)
	userRepo := db.NewUserRepo(dbPool)
	langugeRepo := db.NewLanguageRepo(dbPool)
	courseRepo := db.NewCourseRepo(dbPool)
	sectionRepo := db.NewSectionRepo(dbPool)
	sectionUnitRepo := db.NewSectionUnitRepo(dbPool)

	// Auth interceptor
	authInterceptor := common.NewAuthInterceptor(adminRepo, userRepo)

	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(authInterceptor.UnaryInterceptor()),
	)

	reflection.Register(grpcServer)

	// Admin Handler
	adminServer := admin.NewAdminServer(adminRepo)
	admin.RegisterAdminServiceServer(grpcServer, adminServer)

	// Language Handler
	languageServer := language.NewLanguageServer(langugeRepo)
	language.RegisterLanguageServiceServer(grpcServer, languageServer)

	// User Handler
	userServer := user.NewUserServer(userRepo)
	user.RegisterUserServiceServer(grpcServer, userServer)

	// Course Handler
	courseServer := course.NewCourseServer(courseRepo, langugeRepo)
	course.RegisterCourseServiceServer(grpcServer, courseServer)

	// Section Handler
	sectionServer := section.NewSectionServer(sectionRepo)
	section.RegisterSectionServiceServer(grpcServer, sectionServer)

	// Section unit handler
	sectionUnitHandler := section_unit.NewSectionUnitServer(sectionUnitRepo)
	section_unit.RegisterSectionUnitServiceServer(grpcServer, sectionUnitHandler)

	fmt.Printf("Server started on port %s", port)

	if err := grpcServer.Serve(lis); err != nil {
		errorMessage := fmt.Sprintf("Failed to server gRPC server over port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}
}
