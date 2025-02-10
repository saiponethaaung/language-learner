package admin

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

func (s *Server) Register(ctx context.Context, dto *RegisterRequest) (*RegisterResponse, error) {
	repo := &db.AdminRepo{}
	message := &RegisterResponse{
		Status: true,
	}

	if err := common.ValidateEmail(&dto.Email); err != nil {
		message.Status = false
		message.Error = err

		return message, nil
	}

	rows, _ := db.Pool.Query(ctx, "SELECT * FROM admin where email=$1", dto.Email)
	adminUser, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[db.Admin])

	if adminUser.ID != 0 {
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

	adminID, err := repo.CreateAdmin(ctx, db.Admin{
		Name:     dto.Name,
		Email:    dto.Email,
		Password: password,
	})

	if err != nil {
		return nil, err
	}

	fmt.Printf("Inserted %v", adminID)

	successMessage := "Admin created successfully!"
	message.Message = &successMessage

	return message, nil
}
