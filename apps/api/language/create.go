package language

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (s *Server) CreateLanguage(ctx context.Context, dto *CreateLanguageRequest) (*LanguageObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)
	repo := &db.LanguageRepo{}

	// Check language is already exists or not
	languageCheck, _ := repo.GetLanguageByCode(ctx, dto.Code)

	if languageCheck.ID != 0 {
		return nil, status.Error(codes.AlreadyExists, "Language already exists")
	}

	languageID, err := repo.CreateLanguage(ctx, db.Language{
		Name:      dto.Name,
		Code:      dto.Code,
		CreatedBy: authInfo.Admin.ID,
	})

	if err != nil {
		return nil, err
	}

	language, _ := repo.GetLanguage(ctx, languageID)

	return &LanguageObject{
		Id:        int32(language.ID),
		Name:      language.Name,
		Code:      language.Code,
		CreatedAt: language.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt: language.UpdatedAt.UTC().Format(time.RFC3339),
	}, nil
}
