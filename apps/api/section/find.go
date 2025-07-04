package section

import (
	"context"
	"math"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

// GetAll implements SectionServiceServer.
func (s *Server) GetAll(ctx context.Context, dto *GetSectionRequest) (*PaginationResponse, error) {
	// authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)
	repo := &db.SectionRepo{}

	sections, err := repo.GetAllSection(ctx, int(dto.Limit), int(dto.Page))

	if err != nil {
		return nil, err
	}

	var sectionObjects []*SectionObject

	for _, section := range sections {
		sectionObjects = append(sectionObjects, &SectionObject{
			Id:       int32(section.ID),
			Name:     section.Name,
			CourseID: int32(section.CourseID),
		})
	}

	total, err := repo.CountSection(ctx)

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
