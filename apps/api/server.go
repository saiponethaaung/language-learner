package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saiponethaaung/language-learner/apps/api/admin"
	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/course"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"github.com/saiponethaaung/language-learner/apps/api/language"
	"github.com/saiponethaaung/language-learner/apps/api/user"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	// Setup DB
	// fmt.Println("DB URL IS" + os.Getenv("DB_URL"))
	dbCon, err := pgxpool.New(context.Background(), "postgres://root:root@localhost:5437/ll")

	if err != nil {
		log.Fatal("Failed to start db connection, %v", err)
	}

	defer dbCon.Close()

	db.Pool = dbCon

	// Setup GRPC
	port := "0.0.0.0:9090"
	lis, err := net.Listen("tcp", port)

	if err != nil {
		errorMessage := fmt.Sprintf("Failed to listen on port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}

	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(common.Authenticate),
	)

	reflection.Register(grpcServer)

	// Register admin Handler
	adminServer := admin.Server{}
	admin.RegisterAdminServiceServer(grpcServer, &adminServer)

	// Register language Handler
	languageServer := language.Server{}
	language.RegisterLanguageServiceServer(grpcServer, &languageServer)

	// Register user Handler
	userServer := user.Server{}
	user.RegisterUserServiceServer(grpcServer, &userServer)

	// Course Handler
	courseServer := course.Server{}
	course.RegisterCourseServiceServer(grpcServer, &courseServer)

	fmt.Printf("Server started on port %s", port)

	if err := grpcServer.Serve(lis); err != nil {
		errorMessage := fmt.Sprintf("Failed to server gRPC server over port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}
}
