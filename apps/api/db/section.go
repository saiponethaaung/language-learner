package db

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Section struct {
	ID        int       `db:"id"`
	Order     int       `db:"order"`
	Name      string    `db:"name"`
	Status    int       `db:"status"`
	CourseID  int       `db:"course_id"`
	CreatedBy int       `db:"created_by"`
	UpdatedBy int       `db:"updated_by"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type SectionRepository interface {
	CreateSection(ctx context.Context, section Section) (int, error)
	GetSection(ctx context.Context, id int) (Section, error)
	GetSectionByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (Section, error)
	GetAllSection(ctx context.Context, limit int, page int) ([]Section, error)
	CountSection(ctx context.Context) (int, error)
}

type SectionRepo struct {
	Pool *pgxpool.Pool
}

func NewSectionRepo(dbPool *pgxpool.Pool) *SectionRepo {
	return &SectionRepo{dbPool}
}

// CreateSection inserts a new section into the database
func (sectionRepo *SectionRepo) CreateSection(ctx context.Context, section Section) (int, error) {
	query := `INSERT INTO "section" ("order", name, status, course_id, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

	var id int
	err := sectionRepo.Pool.QueryRow(ctx, query, section.Order, section.Name, section.Status, section.CourseID, section.CreatedBy, section.UpdatedBy).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetSection retrieves an Section by ID from the database
func (sectionRepo *SectionRepo) GetSection(ctx context.Context, id int) (Section, error) {
	query := `SELECT id, "order", name, status, course_id, created_by, updated_by, created_at, updated_at FROM "section" WHERE id = $1`

	rows, err := sectionRepo.Pool.Query(ctx, query, id)

	if err != nil {
		return Section{}, err
	}

	section, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Section])

	return section, nil
}

// GetSection retrieves an Section by ID from the database
func (sectionRepo *SectionRepo) GetSectionByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (Section, error) {
	query := `SELECT id, "order", name, status, course_id, created_by, updated_by, created_at, updated_at FROM "section" WHERE section_language_id = $1 AND language_id = $2`

	rows, err := sectionRepo.Pool.Query(ctx, query, sourceLanguage, targetLanguage)

	if err != nil {
		return Section{}, err
	}

	section, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Section])

	return section, nil
}

// GetSection retrieves all Section from the database
func (sectionRepo *SectionRepo) GetAllSection(ctx context.Context, limit int, page int) ([]Section, error) {
	query := `SELECT id, "order", name, status, course_id, created_by, updated_by, created_at, updated_at FROM "section" where 1=1 OFFSET $1 LIMIT $2`

	rows, err := sectionRepo.Pool.Query(ctx, query, (page-1)*limit, limit)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return []Section{}, nil
		}
		return []Section{}, err
	}

	sections, _ := pgx.CollectRows(rows, pgx.RowToStructByName[Section])

	if err != nil {
		return []Section{}, err
	}

	return sections, nil
}

// CountSection retrieves all Section from the database
func (sectionRepo *SectionRepo) CountSection(ctx context.Context) (int, error) {
	query := `SELECT count(*) FROM "section" where 1=1`

	var count int
	err := sectionRepo.Pool.QueryRow(ctx, query).Scan(&count)

	if err != nil {
		return 0, err
	}

	return count, nil
}
