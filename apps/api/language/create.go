package language

import (
	"context"
	"strconv"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

func (s *Server) CreateLanguage(ctx context.Context, dto *CreateLanguageRequest) (*LanguageObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)
	repo := &db.LanguageRepo{}
	// message := &RegisterResponse{
	// 	Status: true,
	// }

	adminID, err := repo.CreateLanguage(ctx, db.Language{
		Name:      dto.Name,
		Code:      dto.Code,
		CreatedBy: authInfo.Admin.ID,
	})

	if err != nil {
		return nil, err
	}

	// successMessage := "Admin created successfully!"
	// message.Message = &successMessage

	language, _ := repo.GetLanguage(ctx, adminID)

	return &LanguageObject{
		Id:        strconv.Itoa(language.ID),
		Name:      language.Name,
		Code:      language.Code,
		CreatedAt: language.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt: language.UpdatedAt.UTC().Format(time.RFC3339),
	}, nil
}
