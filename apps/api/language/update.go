package language

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// UpdateLanguage implements LanguageServiceServer.
func (s *Server) UpdateLanguage(ctx context.Context, dto *UpdateLanguageRequest) (*LanguageObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	// Validate dto
	if dto.Name == "" {
		return nil, status.Error(codes.InvalidArgument, "Name is required")
	}

	if dto.Code == "" {
		return nil, status.Error(codes.InvalidArgument, "Code is required")
	}

	// Check language code is already exists or not
	languageCheck, _ := s.languageRepo.GetLanguageByCode(ctx, dto.Code)

	if languageCheck.ID != 0 && languageCheck.ID != int(dto.Id) {
		return nil, status.Error(codes.AlreadyExists, "Language already exists")
	}

	language, err := s.languageRepo.GetLanguage(ctx, int(dto.Id))

	// TODO handle error separately
	if err != nil || language.ID == 0 {
		return nil, status.Error(codes.NotFound, "Language not found!")
	}

	language.Name = dto.Name
	language.Code = dto.Code
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
