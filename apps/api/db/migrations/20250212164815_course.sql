-- +goose Up
-- +goose StatementBegin
CREATE TABLE course (
    id bigserial PRIMARY KEY,
    "order" serial not null,
    name varchar(255) not null,
    status smallInt not null default(1),
    course_language_id bigserial not null,
    language_id bigserial not null,
    created_by bigserial,
    updated_by bigserial,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_course_course_language_id foreign key(course_language_id) references language(id) on delete restrict,
    constraint fk_course_language_id foreign key(language_id) references language(id) on delete restrict,
    constraint fk_course_created_by foreign key(created_by) references admin(id) on delete
    set
        null,
        constraint fk_course_updated_by foreign key(updated_by) references admin(id) on delete
    set
        null,
        unique(course_language_id, language_id)
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE course;

-- +goose StatementEnd