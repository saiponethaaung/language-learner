-- +goose Up
-- +goose StatementBegin
CREATE TYPE lesson_type as ENUM ('read', 'listen', 'speak', 'translate_to_course_language', 'translate', 'options');

CREATE TABLE "section_unit_lesson" (
    id bigserial PRIMARY KEY,
    "order" serial not null,
    "type" lesson_type not null,
    name varchar(255) not null,
    description text,
    status smallInt not null default(1),
    section_unit_id bigserial,
    created_by bigserial,
    updated_by bigserial,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_section_section_unit_id foreign key(section_unit_id) references section_unit(id) on delete restrict,
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
DROP TABLE "section_unit_lesson";
DROP TYPE lesson_type;
-- +goose StatementEnd
