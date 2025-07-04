package admin

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

type Server struct{}

// mustEmbedUnimplementedAdminServiceServer implements AdminServiceServer.
func (s *Server) mustEmbedUnimplementedAdminServiceServer() {
	panic("unimplemented")
}

func (s *Server) Profile(ctx context.Context, req *common.EmptyRequest) (*AdminObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	return &AdminObject{
		Id:        int32(authInfo.Admin.ID),
		Name:      authInfo.Admin.Name,
		Email:     authInfo.Admin.Email,
		CreatedAt: authInfo.Admin.CreatedAt.Format(time.RFC3339),
		UpdatedAt: authInfo.Admin.UpdatedAt.Format(time.RFC3339),
	}, nil
}
