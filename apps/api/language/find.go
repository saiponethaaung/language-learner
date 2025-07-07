package language

import (
	"context"
	"math"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// GetLanguages implements LanguageServiceServer.
func (s *Server) GetLanguages(ctx context.Context, dto *GetLanguagesRequest) (*PaginationResponse, error) {
	languages, err := s.languageRepo.GetLanguages(ctx, int(dto.Limit), int(dto.Page))

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

	total, err := s.languageRepo.CountLanguage(ctx)

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

func (s *Server) GetLanguagesByIds(ctx context.Context, dto *GetLanguagesByIdsRequest) (*LanguagesResponse, error) {

	ids := make([]int, len(dto.Ids))
	for i, id := range dto.Ids {
		ids[i] = int(id)
	}

	languages, err := s.languageRepo.GetLanguagesByIds(ctx, ids)

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

	return &LanguagesResponse{
		Languages: languageObjects,
	}, nil
}
