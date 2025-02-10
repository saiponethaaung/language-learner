package admin

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

type Server struct{}

func (s *Server) Profile(ctx context.Context, _ *common.EmptyRequest) (*AdminObject, error) {
	return &AdminObject{
		Id:        "1",
		Name:      "Admin",
		Email:     "as",
		CreatedAt: "Asd",
		UpdatedAt: "ASd",
	}, nil
}
