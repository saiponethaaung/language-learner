package language

import (
	"context"
	"math"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

// GetLanguages implements LanguageServiceServer.
func (s *Server) GetLanguages(ctx context.Context, dto *GetLanguagesRequest) (*PaginationResponse, error) {
	repo := &db.LanguageRepo{}

	languages, err := repo.GetLanguages(ctx, int(dto.Limit), int(dto.Page))

	if err != nil {
		return nil, err
	}

	var languageObjects []*LanguageObject

	for _, language := range languages {
		languageObjects = append(languageObjects, &LanguageObject{
			Id:        int32(language.ID),
			Name:      language.Name,
			Code:      language.Code,
			CreatedAt: language.CreatedAt.UTC().Format(time.RFC3339),
			UpdatedAt: language.UpdatedAt.UTC().Format(time.RFC3339),
		})
	}

	total, err := repo.CountLanguage(ctx)

	if err != nil {
		// log.Fatal(err)
		return nil, err
	}

	totalPage := math.Ceil(float64(total) / float64(dto.Limit))

	return &PaginationResponse{
		Data: languageObjects,
		Pagination: &common.PaginationObject{
			Total:      int32(total),
			Page:       dto.Page,
			Limit:      dto.Limit,
			TotalPages: int32(totalPage),
		},
	}, nil
}
