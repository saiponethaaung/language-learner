package admin

import (
	"context"
	"fmt"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

func (s *Server) Login(ctx context.Context, dto *LoginRequest) (*LoginResponse, error) {
	fmt.Println("login processing")
	message := &LoginResponse{
		Status: true,
	}

	if err := common.ValidateEmail(&dto.Email); err != nil {
		message.Status = false
		message.Error = err

		return message, nil
	}

	// TODO add error handler
	adminUser, _ := s.adminRepo.GetAdminByEmail(ctx, dto.Email)

	if adminUser.ID == 0 || !common.VerifyPassword(dto.Password, adminUser.Password) {
		message.Status = false
		message.Error = &common.ErrorResponse{
			Code:    "invalid_credential",
			Message: "Wrong email or password!",
		}

		return message, nil
	}

	role := "admin"
	token, err := common.GenerateJWT(&adminUser.ID, &role)

	if err != nil {
		return nil, err
	}

	message.AccessToken = &token
	return message, nil
}
