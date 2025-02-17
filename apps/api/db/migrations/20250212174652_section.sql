-- +goose Up
-- +goose StatementBegin
CREATE TABLE section (
    id bigserial PRIMARY KEY,
    "order" serial not null,
    name varchar(255) not null,
    status smallInt not null default(1),
    course_id bigserial,
    created_by bigserial,
    updated_by bigserial,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_section_course_id foreign key(course_id) references course(id) on delete restrict,
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
DROP TABLE section;

-- +goose StatementEnd