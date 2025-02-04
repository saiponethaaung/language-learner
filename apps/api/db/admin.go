package db

type Admin struct {
	ID        int    `db:"id"`
	Name      string `db:"name"`
	Email     string `db:"email"`
	Status    int    `db:"status"`
	Password  string `db:"password"`
	CreatedAt string `db:"created_at"`
	UpdatedAt string `db:"updated_at"`
}
