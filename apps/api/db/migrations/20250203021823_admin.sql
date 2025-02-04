-- +goose Up
CREATE TABLE admin (
    id bigserial PRIMARY KEY,
    name varchar(255) not null,
    email varchar(255) unique not null,
    status smallInt not null default(1),
    password text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- +goose Down
-- +goose StatementBegin
DROP TABLE admin;

-- +goose StatementEnd