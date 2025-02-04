package user

import (
	"context"
	"fmt"
)

type Server struct{}

func (s *Server) SayHello(ctx context.Context, message *Message) (*Message, error) {
	fmt.Printf("Received message body from client %s", message.Body)
	return &Message{Body: "Hello from server"}, nil
}
