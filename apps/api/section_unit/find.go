package section_unit

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// Get implements SectionUnitServiceServer.
func (s *Server) Get(ctx context.Context, dto *common.IntIDRequest) (*SectionUnitObject, error) {
	section, err := s.sectionUnitRepo.GetSectionUnit(ctx, int(dto.Id))

	if err != nil {
		return nil, err
	}

	sectionObject := &SectionUnitObject{
		Id:        int32(section.ID),
		Name:      section.Name,
		SectionID: int32(section.SectionID),
	}

	return sectionObject, nil
}
