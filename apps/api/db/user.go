package db

import (
	"context"
	"errors"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
	ID        int       `db:"id"`
	Name      string    `db:"name"`
	Email     string    `db:"email"`
	Status    int       `db:"status"`
	Password  string    `db:"password"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type UserRepository interface {
	CreateUser(ctx context.Context, user User) (int, error)
	GetUser(ctx context.Context, id int) (User, error)
	GetUserByEmail(ctx context.Context, email string) (User, error)
	UpdateUser(ctx context.Context, user User) error
	DeleteUser(ctx context.Context, id int) error
}

type UserRepo struct {
	Pool *pgxpool.Pool
}

func NewUserRepo(dbPool *pgxpool.Pool) *UserRepo {
	return &UserRepo{dbPool}
}

// CreateUser inserts a new user into the database
func (userRepo *UserRepo) CreateUser(ctx context.Context, user User) (int, error) {
	query := `INSERT INTO "user" (name, email, status, password) 
	          VALUES ($1, $2, $3, $4) RETURNING id`

	var id int
	err := userRepo.Pool.QueryRow(ctx, query, user.Name, user.Email, user.Status, user.Password).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetUser retrieves an user by ID from the database
func (userRepo *UserRepo) GetUser(ctx context.Context, id int) (User, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, email, status, password, created_at, updated_at FROM "user" WHERE id = $1`

	rows, err := userRepo.Pool.Query(ctx, query, id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return User{}, nil
		}
		return User{}, err
	}

	user, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[User])

	return user, nil
}

// GetUser retrieves an user by email from the database
func (userRepo *UserRepo) GetUserByEmail(ctx context.Context, email string) (User, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, email, status, password, created_at, updated_at FROM "user" WHERE email = $1`

	rows, err := userRepo.Pool.Query(ctx, query, email)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return User{}, nil
		}
		return User{}, err
	}

	user, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[User])

	return user, nil
}

// UpdateUser updates an existing user in the database
func (userRepo *UserRepo) UpdateUser(ctx context.Context, user User) error {
	query := `UPDATE "user" SET `
	args := []interface{}{}
	argID := 1

	if user.Name != "" {
		query += `name = $` + strconv.Itoa(argID) + `, `
		args = append(args, user.Name)
		argID++
	}
	if user.Email != "" {
		query += `email = $` + strconv.Itoa(argID) + `, `
		args = append(args, user.Email)
		argID++
	}
	if user.Status != 0 {
		query += `status = $` + strconv.Itoa(argID) + `, `
		args = append(args, user.Status)
		argID++
	}
	if user.Password != "" {
		query += `password = $` + strconv.Itoa(argID) + `, `
		args = append(args, user.Password)
		argID++
	}

	query += `updated_at = $` + strconv.Itoa(argID) + ` WHERE id = $` + strconv.Itoa(argID+1)
	args = append(args, time.Now(), user.ID)

	_, err := userRepo.Pool.Exec(ctx, query, args...)
	return err
}

// DeleteUser deletes an user by ID from the database
func (userRepo *UserRepo) DeleteUser(ctx context.Context, id int) error {
	query := `DELETE FROM "user" WHERE id = $1`
	_, err := userRepo.Pool.Exec(ctx, query, id)
	return err
}
