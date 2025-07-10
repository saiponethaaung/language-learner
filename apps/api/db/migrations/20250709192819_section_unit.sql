-- +goose Up
-- +goose StatementBegin
CREATE TABLE "section_unit" (
    id bigserial PRIMARY KEY,
    "order" serial not null,
    name varchar(255) not null,
    status smallInt not null default(1),
    section_id bigserial,
    created_by bigserial,
    updated_by bigserial,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_section_section_id foreign key(section_id) references section(id) on delete restrict,
    constraint fk_section_created_by foreign key(created_by) references admin(id) on delete
    set
        null,
        constraint fk_section_updated_by foreign key(updated_by) references admin(id) on delete
    set
        null
);
-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE "section_unit";
-- +goose StatementEnd
