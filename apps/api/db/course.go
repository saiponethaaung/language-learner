package db

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Course struct {
	ID               int       `db:"id"`
	Order            int       `db:"order"`
	Name             string    `db:"name"`
	Status           int       `db:"status"`
	CourseLanguageID int       `db:"course_language_id"`
	LanguageID       int       `db:"language_id"`
	CreatedBy        int       `db:"created_by"`
	UpdatedBy        int       `db:"updated_by"`
	CreatedAt        time.Time `db:"created_at"`
	UpdatedAt        time.Time `db:"updated_at"`
}

type CourseRepository interface {
	CreateCourse(ctx context.Context, course Course) (int, error)
	GetCourse(ctx context.Context, id int) (Course, error)
	GetCourseByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (Course, error)
	GetAllCourse(ctx context.Context, limit int, page int) ([]Course, error)
	CountCourse(ctx context.Context) (int, error)
}

type CourseRepo struct {
	Pool *pgxpool.Pool
}

func NewCourseRepo(dbPool *pgxpool.Pool) *CourseRepo {
	return &CourseRepo{dbPool}
}

// CreateCourse inserts a new course into the database
func (courseRepo *CourseRepo) CreateCourse(ctx context.Context, course Course) (int, error) {
	query := `INSERT INTO "course" ("order", name, status, course_language_id, language_id, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

	var id int
	err := courseRepo.Pool.QueryRow(ctx, query, course.Order, course.Name, course.Status, course.CourseLanguageID, course.LanguageID, course.CreatedBy, course.UpdatedBy).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// GetCourse retrieves an Course by ID from the database
func (courseRepo *CourseRepo) GetCourse(ctx context.Context, id int) (Course, error) {
	query := `SELECT id, "order", name, status, course_language_id, language_id, created_by, updated_by, created_at, updated_at FROM "course" WHERE id = $1`

	rows, err := courseRepo.Pool.Query(ctx, query, id)

	if err != nil {
		return Course{}, err
	}

	course, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Course])

	return course, nil
}

// GetCourse retrieves an Course by ID from the database
func (courseRepo *CourseRepo) GetCourseByLanguage(ctx context.Context, sourceLanguage int, targetLanguage int) (Course, error) {
	query := `SELECT id, "order", name, status, course_language_id, language_id, created_by, updated_by, created_at, updated_at FROM "course" WHERE course_language_id = $1 AND language_id = $2`

	rows, err := courseRepo.Pool.Query(ctx, query, sourceLanguage, targetLanguage)

	if err != nil {
		return Course{}, err
	}

	course, _ := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[Course])

	return course, nil
}

// GetCourse retrieves all Course from the database
func (courseRepo *CourseRepo) GetAllCourse(ctx context.Context, limit int, page int) ([]Course, error) {
	query := `SELECT id, "order", name, status, course_language_id, language_id, created_by, updated_by, created_at, updated_at FROM "course" where 1=1 OFFSET $1 LIMIT $2`

	rows, err := courseRepo.Pool.Query(ctx, query, (page-1)*limit, limit)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return []Course{}, nil
		}
		return []Course{}, err
	}

	courses, _ := pgx.CollectRows(rows, pgx.RowToStructByName[Course])

	if err != nil {
		return []Course{}, err
	}

	return courses, nil
}

// CountCourse retrieves all Course from the database
func (courseRepo *CourseRepo) CountCourse(ctx context.Context) (int, error) {
	query := `SELECT count(*) FROM "course" where 1=1`

	var count int
	err := courseRepo.Pool.QueryRow(ctx, query).Scan(&count)

	if err != nil {
		return 0, err
	}

	return count, nil
}
