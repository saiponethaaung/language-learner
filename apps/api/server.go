package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saiponethaaung/language-learner/apps/api/admin"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"google.golang.org/grpc"
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
	port := ":9090"
	lis, err := net.Listen("tcp", port)

	if err != nil {
		errorMessage := fmt.Sprintf("Failed to listen on port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}

	grpcServer := grpc.NewServer()

	// Register admin Handler
	adminServer := admin.Server{}
	admin.RegisterAdminServiceServer(grpcServer, &adminServer)

	if err := grpcServer.Serve(lis); err != nil {
		errorMessage := fmt.Sprintf("Failed to server gRPC server over port %s", port)
		log.Fatal(errorMessage+", %v", err)
	}

}
