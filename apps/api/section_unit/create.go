package section_unit

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

// Create implements SectionUnitServiceServer.
func (s *Server) Create(ctx context.Context, dto *CreateSectionUnitRequest) (*SectionUnitObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	sectionUnitID, err := s.sectionUnitRepo.CreateSectionUnit(ctx, db.SectionUnit{
		Name:      dto.Name,
		SectionID: int(dto.SectionID),
		Status:    1,
		CreatedBy: authInfo.Admin.ID,
		UpdatedBy: authInfo.Admin.ID,
	})

	if err != nil {
		msg := "Failed to create section unit"
		common.LogError(&msg, err)
	}

	sectionUnit, err := s.sectionUnitRepo.GetSectionUnit(ctx, sectionUnitID)

	if err != nil {
		msg := "Failed to create section"
		common.LogError(&msg, err)
	}

	return &SectionUnitObject{
		Id:        int32(sectionUnit.ID),
		Name:      sectionUnit.Name,
		SectionID: int32(sectionUnit.SectionID),
	}, nil
}
