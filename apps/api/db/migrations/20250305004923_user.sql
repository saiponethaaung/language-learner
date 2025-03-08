-- +goose Up
-- +goose StatementBegin
CREATE TABLE "user" (
    id bigserial PRIMARY KEY,
    name varchar(255) not null,
    email varchar(255) unique not null,
    status smallInt not null default(1),
    password text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE "user";

-- +goose StatementEnd