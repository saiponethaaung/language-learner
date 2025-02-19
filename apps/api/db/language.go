package db

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
)

type Language struct {
	ID        int       `db:"id"`
	Name      string    `db:"name"`
	Code      string    `db:"code"`
	Status    int       `db:"status"`
	CreatedBy int       `db:"created_by"`
	UpdatedBy int       `db:"updated_by"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type LanguageRepo struct{}

func (l *LanguageRepo) CreateLanguage(ctx context.Context, language Language) (int, error) {
	query := `INSERT INTO language (name, code, status, created_by, updated_by) 
	VALUES ($1, $2, $3, $4, $5) RETURNING id`

	var id int
	err := Pool.QueryRow(ctx, query, language.Name, language.Code, 1, language.CreatedBy, language.CreatedBy).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetLanguage retrieves an Language by ID from the database
func (a *LanguageRepo) GetLanguage(ctx context.Context, id int) (Language, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language WHERE id = $1`

	rows, err := Pool.Query(ctx, query, id)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Language{}, nil
		}
		return Language{}, err
	}

	language, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Language])

	return language, nil
}

// GetLanguage retrieves an Language by ID from the database
func (a *LanguageRepo) GetLanguages(ctx context.Context) ([]Language, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language where 1=1`

	rows, err := Pool.Query(ctx, query)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return []Language{}, nil
		}
		return []Language{}, err
	}
	languages, err := pgx.CollectRows(rows, pgx.RowToStructByName[Language])

	if err != nil {
		return []Language{}, err
	}

	fmt.Println("Rows")
	fmt.Println(rows)

	return languages, nil
}
