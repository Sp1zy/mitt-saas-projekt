create type public.request_status as enum ('queued', 'in_progress', 'in_review', 'done');

create table public.requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    title text not null check (char_length(title) between 1 and 200),
    details text not null default '',
    status public.request_status not null default 'queued',
    assigned_engineer text,
    sprint_ends_on date,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index requests_user_id_created_at_idx on public.requests (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger requests_set_updated_at
before update on public.requests
for each row execute function public.set_updated_at();

alter table public.requests enable row level security;

create policy "Clients read own requests"
on public.requests for select
to authenticated
using (auth.uid() = user_id);

-- Clients only ever create queued, unassigned requests. Status, engineer and sprint
-- are set by the agency through the service role, never through the client session.
create policy "Clients create own queued requests"
on public.requests for insert
to authenticated
with check (
    auth.uid() = user_id
    and status = 'queued'
    and assigned_engineer is null
    and sprint_ends_on is null
);

create policy "Clients edit own queued requests"
on public.requests for update
to authenticated
using (auth.uid() = user_id and status = 'queued')
with check (
    auth.uid() = user_id
    and status = 'queued'
    and assigned_engineer is null
    and sprint_ends_on is null
);

create policy "Clients delete own queued requests"
on public.requests for delete
to authenticated
using (auth.uid() = user_id and status = 'queued');
