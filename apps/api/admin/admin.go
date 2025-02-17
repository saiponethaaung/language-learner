package admin

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

type Server struct{}

func (s *Server) Profile(ctx context.Context, req *common.EmptyRequest) (*AdminObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	return &AdminObject{
		Id:        int32(authInfo.Admin.ID),
		Name:      authInfo.Admin.Name,
		Email:     authInfo.Admin.Email,
		CreatedAt: authInfo.Admin.CreatedAt,
		UpdatedAt: authInfo.Admin.UpdatedAt,
	}, nil
}
