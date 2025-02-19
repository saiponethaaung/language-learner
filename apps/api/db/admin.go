package db

import (
	"context"
	"errors"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
)

type Admin struct {
	ID        int       `db:"id"`
	Name      string    `db:"name"`
	Email     string    `db:"email"`
	Status    int       `db:"status"`
	Password  string    `db:"password"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type AdminRepo struct{}

// CreateAdmin inserts a new admin into the database
func (a *AdminRepo) CreateAdmin(ctx context.Context, admin Admin) (int, error) {
	query := `INSERT INTO admin (name, email, status, password) 
	          VALUES ($1, $2, $3, $4) RETURNING id`

	var id int
	err := Pool.QueryRow(ctx, query, admin.Name, admin.Email, admin.Status, admin.Password).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetAdmin retrieves an admin by ID from the database
func (a *AdminRepo) GetAdmin(ctx context.Context, id int) (Admin, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, email, status, password, created_at, updated_at FROM admin WHERE id = $1`

	rows, err := Pool.Query(ctx, query, id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Admin{}, nil
		}
		return Admin{}, err
	}

	admin, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Admin])

	return admin, nil
}

// UpdateAdmin updates an existing admin in the database
func (a *AdminRepo) UpdateAdmin(ctx context.Context, admin Admin) error {
	query := `UPDATE admin SET `
	args := []interface{}{}
	argID := 1

	if admin.Name != "" {
		query += `name = $` + strconv.Itoa(argID) + `, `
		args = append(args, admin.Name)
		argID++
	}
	if admin.Email != "" {
		query += `email = $` + strconv.Itoa(argID) + `, `
		args = append(args, admin.Email)
		argID++
	}
	if admin.Status != 0 {
		query += `status = $` + strconv.Itoa(argID) + `, `
		args = append(args, admin.Status)
		argID++
	}
	if admin.Password != "" {
		query += `password = $` + strconv.Itoa(argID) + `, `
		args = append(args, admin.Password)
		argID++
	}

	query += `updated_at = $` + strconv.Itoa(argID) + ` WHERE id = $` + strconv.Itoa(argID+1)
	args = append(args, time.Now(), admin.ID)

	_, err := Pool.Exec(ctx, query, args...)
	return err
}

// DeleteAdmin deletes an admin by ID from the database
func (a *AdminRepo) DeleteAdmin(ctx context.Context, id int) error {
	query := `DELETE FROM admin WHERE id = $1`
	_, err := Pool.Exec(ctx, query, id)
	return err
}
