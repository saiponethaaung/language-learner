package language

import (
	"context"
	"strconv"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

// GetLanguages implements LanguageServiceServer.
func (s *Server) GetLanguages(ctx context.Context, dto *GetLanguagesRequest) (*PaginationResponse, error) {
	repo := &db.LanguageRepo{}

	languages, err := repo.GetLanguages(ctx)

	if err != nil {
		// log.Fatal(err)
		return nil, err
	}

	var languageObjects []*LanguageObject

	for _, language := range languages {
		languageObjects = append(languageObjects, &LanguageObject{
			Id:        strconv.Itoa(language.ID),
			Name:      language.Name,
			Code:      language.Code,
			CreatedAt: language.CreatedAt.UTC().Format(time.RFC3339),
			UpdatedAt: language.UpdatedAt.UTC().Format(time.RFC3339),
		})
	}

	return &PaginationResponse{
		Data: languageObjects,
		Pagination: &common.PaginationObject{
			Total:      0,
			Page:       0,
			Limit:      0,
			TotalPages: 0,
		},
	}, nil
}
