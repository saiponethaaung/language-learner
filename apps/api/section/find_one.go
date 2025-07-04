package section

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

// GetAll implements SectionServiceServer.
func (s *Server) Get(ctx context.Context, dto *common.IntIDRequest) (*SectionObject, error) {
	// authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)
	repo := &db.SectionRepo{}

	section, err := repo.GetSection(ctx, int(dto.Id))

	if err != nil {
		return nil, err
	}

	sectionObject := &SectionObject{
		Id:       int32(section.ID),
		Name:     section.Name,
		CourseID: int32(section.CourseID),
	}

	return sectionObject, nil
}
