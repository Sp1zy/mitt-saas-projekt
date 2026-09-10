alter table public.requests
    add column position integer not null default 0,
    add column is_urgent boolean not null default false;

create index requests_user_id_position_idx on public.requests (user_id, position);
