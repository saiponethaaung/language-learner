-- +goose Up
-- +goose StatementBegin
CREATE TABLE language (
    id bigserial PRIMARY KEY,
    "order" serial not null,
    name varchar(255) not null,
    code varchar(255) not null unique,
    status smallInt not null default(1),
    created_by bigserial,
    updated_by bigserial,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_language_created_by foreign key(created_by) references admin(id) on delete
    set
        null,
        constraint fk_language_updated_by foreign key(updated_by) references admin(id) on delete
    set
        null
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP table language;

-- +goose StatementEnd