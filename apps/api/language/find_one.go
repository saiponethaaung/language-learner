package language

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// GetLanguage implements LanguageServiceServer.
func (s *Server) GetLanguage(ctx context.Context, dto *common.IntIDRequest) (*LanguageObject, error) {
	repo := &db.LanguageRepo{}

	language, err := repo.GetLanguage(ctx, int(dto.Id))

	// TODO handle error separately

	if err != nil || language.ID == 0 {
		return nil, status.Error(codes.NotFound, "Language not found!")
	}

	return &LanguageObject{
		Id:        int32(language.ID),
		Name:      language.Name,
		Code:      language.Code,
		CreatedAt: language.CreatedAt.UTC().Format("2006-01-02 15:04:05"),
		UpdatedAt: language.UpdatedAt.UTC().Format("2006-01-02 15:04:05"),
	}, nil
}
