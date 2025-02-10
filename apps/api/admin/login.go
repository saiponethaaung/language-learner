package admin

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
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

	rows, _ := db.Pool.Query(ctx, "SELECT * FROM admin where email=$1", dto.Email)
	adminUser, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[db.Admin])

	if adminUser.ID == 0 || !common.VerifyPassword(dto.Password, adminUser.Password) {
		message.Status = false
		message.Error = &common.ErrorResponse{
			Code:    "invalid_credential",
			Message: "Wrong email or password!",
		}

		return message, nil
	}

	token, err := common.GenerateJWT(&dto.Email)

	if err != nil {
		return nil, err
	}

	message.AccessToken = &token
	return message, nil
}
