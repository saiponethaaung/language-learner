package user

import (
	"context"
	"fmt"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

func (s *Server) Register(ctx context.Context, dto *RegisterRequest) (*RegisterResponse, error) {
	message := &RegisterResponse{
		Status: true,
	}

	if err := common.ValidateEmail(&dto.Email); err != nil {
		message.Status = false
		message.Error = err

		return message, nil
	}

	userUser, _ := s.userRepo.GetUserByEmail(ctx, dto.Email)

	if userUser.ID != 0 {
		message.Status = false
		message.Error = &common.ErrorResponse{
			Code:    "email_taken",
			Message: "Email is already taken!",
		}

		return message, nil
	}

	password, err := common.HashPassword(dto.Password)

	if err != nil {
		return nil, err
	}

	userID, err := s.userRepo.CreateUser(ctx, db.User{
		Name:     dto.Name,
		Email:    dto.Email,
		Password: password,
	})

	if err != nil {
		return nil, err
	}

	fmt.Printf("Inserted %v", userID)

	successMessage := "User created successfully!"
	message.Message = &successMessage

	return message, nil
}
