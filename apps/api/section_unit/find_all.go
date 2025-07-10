package section_unit

import (
	"context"
	"math"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// GetAll implements SectionUnitServiceServer.
func (s *Server) GetAll(ctx context.Context, dto *GetSectionUnitRequest) (*PaginationResponse, error) {
	sections, err := s.sectionUnitRepo.GetAllSectionUnit(ctx, int(dto.Limit), int(dto.Page))

	if err != nil {
		return nil, err
	}

	var sectionObjects []*SectionUnitObject

	for _, section := range sections {
		sectionObjects = append(sectionObjects, &SectionUnitObject{
			Id:        int32(section.ID),
			Name:      section.Name,
			SectionID: int32(section.SectionID),
		})
	}

	total, err := s.sectionUnitRepo.CountSectionUnit(ctx)

	if err != nil {
		return nil, err
	}

	totalPage := math.Ceil(float64(total) / float64(dto.Limit))

	return &PaginationResponse{
		Data: sectionObjects,
		Pagination: &common.PaginationObject{
			Total:      int32(total),
			Page:       dto.Page,
			Limit:      dto.Limit,
			TotalPages: int32(totalPage),
		},
	}, nil
}
