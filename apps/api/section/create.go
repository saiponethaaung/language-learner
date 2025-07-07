package section

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

func (s *Server) Create(ctx context.Context, dto *CreateSectionRequest) (*SectionObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	sectionID, err := s.sectionRepo.CreateSection(ctx, db.Section{
		Name:      dto.Name,
		CourseID:  int(dto.CourseID),
		Status:    1,
		CreatedBy: authInfo.Admin.ID,
		UpdatedBy: authInfo.Admin.ID,
	})

	if err != nil {
		msg := "Failed to create section"
		common.LogError(&msg, err)
	}

	section, err := s.sectionRepo.GetSection(ctx, sectionID)

	if err != nil {
		msg := "Failed to create section"
		common.LogError(&msg, err)
	}

	return &SectionObject{
		Id:       int32(section.ID),
		Name:     section.Name,
		CourseID: int32(section.CourseID),
	}, nil
}
