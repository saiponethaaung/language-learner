package db

type Language struct {
	ID        int    `db:"id"`
	Name      string `db:"name"`
	Code      string `db:"code"`
	Status    int    `db:"status"`
	CreatedBy int    `db:"created_by"`
	UpdatedBy int    `db:"updated_by"`
	CreatedAt string `db:"created_at"`
	UpdatedAt string `db:"updated_at"`
}
