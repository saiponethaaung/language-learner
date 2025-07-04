package course

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

type Server struct{}

func (s *Server) mustEmbedUnimplementedCourseServiceServer() {
	panic("unimplemented")
}

// Delete implements CourseServiceServer.
func (s *Server) Delete(context.Context, *common.IDRequest) (*common.StatusResponse, error) {
	panic("unimplemented")
}

// Get implements CourseServiceServer.
func (s *Server) Get(context.Context, *common.IntIDRequest) (*CourseObject, error) {
	panic("unimplemented")
}

// Update implements CourseServiceServer.
func (s *Server) Update(context.Context, *UpdateCourseRequet) (*CourseObject, error) {
	panic("unimplemented")
}
