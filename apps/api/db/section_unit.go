package db

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SectionUnit struct {
	ID        int       `db:"id"`
	Order     int       `db:"order"`
	Name      string    `db:"name"`
	Status    int       `db:"status"`
	SectionID int       `db:"section_id"`
	CreatedBy int       `db:"created_by"`
	UpdatedBy int       `db:"updated_by"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type SectionUnitRepository interface {
	CreateSectionUnit(ctx context.Context, section SectionUnit) (int, error)
	GetSectionUnit(ctx context.Context, id int) (SectionUnit, error)
	GetSectionUnitByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (SectionUnit, error)
	GetAllSectionUnit(ctx context.Context, limit int, page int) ([]SectionUnit, error)
	CountSectionUnit(ctx context.Context) (int, error)
}

type SectionUnitRepo struct {
	Pool *pgxpool.Pool
}

func NewSectionUnitRepo(dbPool *pgxpool.Pool) *SectionUnitRepo {
	return &SectionUnitRepo{dbPool}
}

// CreateSectionUnit inserts a new section into the database
func (sectionRepo *SectionUnitRepo) CreateSectionUnit(ctx context.Context, section SectionUnit) (int, error) {
	query := `INSERT INTO "section_unit" ("order", name, status, section_id, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

	var id int
	err := sectionRepo.Pool.QueryRow(ctx, query, section.Order, section.Name, section.Status, section.SectionID, section.CreatedBy, section.UpdatedBy).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetSectionUnit retrieves an SectionUnit by ID from the database
func (sectionRepo *SectionUnitRepo) GetSectionUnit(ctx context.Context, id int) (SectionUnit, error) {
	query := `SELECT id, "order", name, status, section_id, created_by, updated_by, created_at, updated_at FROM "section_unit" WHERE id = $1`

	rows, err := sectionRepo.Pool.Query(ctx, query, id)

	if err != nil {
		return SectionUnit{}, err
	}

	section, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[SectionUnit])

	return section, nil
}

// GetSectionUnit retrieves an SectionUnit by ID from the database
func (sectionRepo *SectionUnitRepo) GetSectionUnitByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (SectionUnit, error) {
	query := `SELECT id, "order", name, status, section_id, created_by, updated_by, created_at, updated_at FROM "section_unit" WHERE section_language_id = $1 AND language_id = $2`

	rows, err := sectionRepo.Pool.Query(ctx, query, sourceLanguage, targetLanguage)

	if err != nil {
		return SectionUnit{}, err
	}

	section, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[SectionUnit])

	return section, nil
}

// GetSectionUnit retrieves all SectionUnit from the database
func (sectionRepo *SectionUnitRepo) GetAllSectionUnit(ctx context.Context, limit int, page int) ([]SectionUnit, error) {
	query := `SELECT id, "order", name, status, section_id, created_by, updated_by, created_at, updated_at FROM "section_unit" where 1=1 OFFSET $1 LIMIT $2`

	rows, err := sectionRepo.Pool.Query(ctx, query, (page-1)*limit, limit)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return []SectionUnit{}, nil
		}
		return []SectionUnit{}, err
	}

	sections, _ := pgx.CollectRows(rows, pgx.RowToStructByName[SectionUnit])

	if err != nil {
		return []SectionUnit{}, err
	}

	return sections, nil
}

// CountSectionUnit retrieves all SectionUnit from the database
func (sectionRepo *SectionUnitRepo) CountSectionUnit(ctx context.Context) (int, error) {
	query := `SELECT count(*) FROM "section_unit" where 1=1`

	var count int
	err := sectionRepo.Pool.QueryRow(ctx, query).Scan(&count)

	if err != nil {
		return 0, err
	}

	return count, nil
}
