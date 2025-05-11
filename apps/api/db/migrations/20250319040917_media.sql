-- +goose Up
-- +goose StatementBegin
CREATE TABLE "media" (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  store_provider text NOT NULL,
  store_key text NOT NULL,
  created_by bigserial,
  updated_by bigserial,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
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
DROP TABLE "media";

-- +goose StatementEn