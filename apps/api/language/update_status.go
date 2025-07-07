package language

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// UpdateLanguageStatus implements LanguageServiceServer.
func (s *Server) UpdateLanguageStatus(ctx context.Context, dto *UpdateLanguageStatusRequest) (*LanguageObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	language, err := s.languageRepo.GetLanguage(ctx, int(dto.Id))

	// TODO handle error separately
	if err != nil || language.ID == 0 {
		return nil, status.Error(codes.NotFound, "Language not found!")
	}

	if dto.Status {
		language.Status = 1
	} else {
		language.Status = 0
	}

	language.UpdatedBy = authInfo.Admin.ID
	language.UpdatedAt = time.Now()

	_, err = s.languageRepo.UpdateLanguage(ctx, &language)

	if err != nil {
		return nil, status.Error(codes.Internal, "Failed to update language")
	}

	return &LanguageObject{
		Id:        int32(language.ID),
		Name:      language.Name,
		Code:      language.Code,
		CreatedAt: language.CreatedAt.UTC().Format("2006-01-02 15:04:05"),
		UpdatedAt: language.UpdatedAt.UTC().Format("2006-01-02 15:04:05"),
	}, nil
}
