package admin

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

type Server struct{}

func (s *Server) Login(ctx context.Context, login *LoginRequest) (*LoginResponse, error) {
	message := &LoginResponse{
		Status: true,
	}

	if err := common.ValidateEmail(&login.Email); err != nil {
		message.Status = false
		message.Error = err

		return message, nil
	}

	rows, _ := db.Pool.Query(ctx, "SELECT * FROM admin where email=$1", login.Email)
	adminUser, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[db.Admin])

	if adminUser.ID == 0 {
		message.Status = false
		message.Error = &common.ErrorResponse{
			Code:    "invalid_credential",
			Message: "Wrong email or password!",
		}

		return message, nil
	}

	fmt.Printf("%v\n", adminUser.ID)
	fmt.Printf("%v\n", adminUser)

	fmt.Printf("Login email:%s, password %s\n", login.Email, login.Password)

	token := "acces token 123"

	message.AccessToken = &token
	return message, nil
}
