package user

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

func (s *Server) Login(ctx context.Context, dto *LoginRequest) (*LoginResponse, error) {
	message := &LoginResponse{
		Status: true,
	}

	if err := common.ValidateEmail(&dto.Email); err != nil {
		message.Status = false
		message.Error = err

		return message, nil
	}

	userUser, _ := s.userRepo.GetUserByEmail(ctx, dto.Email)

	if userUser.ID == 0 || !common.VerifyPassword(dto.Password, userUser.Password) {
		message.Status = false
		message.Error = &common.ErrorResponse{
			Code:    "invalid_credential",
			Message: "Wrong email or password!",
		}

		return message, nil
	}

	role := "user"
	token, err := common.GenerateJWT(&userUser.ID, &role)

	if err != nil {
		return nil, err
	}

	message.AccessToken = &token
	return message, nil
}
