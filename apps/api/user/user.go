package user

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

type Server struct {
	userRepo db.UserRepository
}

func NewUserServer(userRepo db.UserRepository) *Server {
	return &Server{
		userRepo: userRepo,
	}
}

func (s *Server) mustEmbedUnimplementedUserServiceServer() {
	panic("unimplemented")
}

func (s *Server) Profile(ctx context.Context, req *common.EmptyRequest) (*UserObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	return &UserObject{
		Id:        int32(authInfo.User.ID),
		Name:      authInfo.User.Name,
		Email:     authInfo.User.Email,
		CreatedAt: authInfo.User.CreatedAt.Format(time.RFC3339),
		UpdatedAt: authInfo.User.UpdatedAt.Format(time.RFC3339),
	}, nil
}
