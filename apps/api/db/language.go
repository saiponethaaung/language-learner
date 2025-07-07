package db

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
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

type LanguageRepository interface {
	CreateLanguage(ctx context.Context, language Language) (int, error)
	GetLanguage(ctx context.Context, id int) (Language, error)
	GetLanguageByCode(ctx context.Context, code string) (Language, error)
	GetLanguages(ctx context.Context, limit int, page int) ([]Language, error)
	UpdateLanguage(ctx context.Context, language *Language) (Language, error)
	CountLanguage(ctx context.Context) (int, error)
	GetLanguagesByIds(ctx context.Context, ids []int) ([]Language, error)
}

type LanguageRepo struct {
	Pool *pgxpool.Pool
}

func NewLanguageRepo(dbPool *pgxpool.Pool) *LanguageRepo {
	return &LanguageRepo{dbPool}
}

func (languageRepo *LanguageRepo) CreateLanguage(ctx context.Context, language Language) (int, error) {
	query := `INSERT INTO language (name, code, status, created_by, updated_by) 
	VALUES ($1, $2, $3, $4, $5) RETURNING id`

	var id int
	err := languageRepo.Pool.QueryRow(ctx, query, language.Name, language.Code, 1, language.CreatedBy, language.CreatedBy).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetLanguage retrieves an Language by ID from the database
func (languageRepo *LanguageRepo) GetLanguage(ctx context.Context, id int) (Language, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language WHERE id = $1`

	rows, err := languageRepo.Pool.Query(ctx, query, id)

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
func (languageRepo *LanguageRepo) GetLanguageByCode(ctx context.Context, code string) (Language, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language WHERE code = $1`

	rows, err := languageRepo.Pool.Query(ctx, query, code)

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
func (languageRepo *LanguageRepo) GetLanguages(ctx context.Context, limit int, page int) ([]Language, error) {
	// args := []interface{}{}
	// args = append(args, id)

	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language where 1=1 OFFSET $1 LIMIT $2`

	rows, err := languageRepo.Pool.Query(ctx, query, (page-1)*limit, limit)

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

	return languages, nil
}

func (languageRepo *LanguageRepo) UpdateLanguage(ctx context.Context, language *Language) (Language, error) {
	query := `UPDATE language SET name = $1, code = $2, updated_by = $3, updated_at = $4, status = $5 WHERE id = $6`

	_, err := languageRepo.Pool.Exec(ctx, query, language.Name, language.Code, language.UpdatedBy, language.UpdatedAt, language.Status, language.ID)

	if err != nil {
		return Language{}, err
	}

	return *language, nil
}

func (languageRepo *LanguageRepo) CountLanguage(ctx context.Context) (int, error) {
	query := `SELECT COUNT(id) as count FROM language`

	rows, err := languageRepo.Pool.Query(ctx, query)

	if err != nil {
		return 0, err
	}

	var count int

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return 0, err
		}
	}

	return count, nil
}

func (languageRepo *LanguageRepo) GetLanguagesByIds(ctx context.Context, ids []int) ([]Language, error) {
	query := `SELECT id, name, code, status, created_at, updated_at, created_by, updated_by FROM language WHERE id = ANY($1)`

	rows, err := languageRepo.Pool.Query(ctx, query, ids)

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

	return languages, nil
}
