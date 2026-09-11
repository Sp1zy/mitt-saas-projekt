create table public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null,
    full_name text not null default '',
    company_name text not null default '',
    website_url text not null default '',
    company_size text not null default '',
    primary_need text not null default '',
    plan_interest text not null default '',
    project_summary text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Copies the onboarding answers the app sends as signUp metadata into real columns.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id, email, full_name, company_name, website_url,
        company_size, primary_need, plan_interest, project_summary
    )
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        coalesce(new.raw_user_meta_data ->> 'company_name', ''),
        coalesce(new.raw_user_meta_data ->> 'website_url', ''),
        coalesce(new.raw_user_meta_data ->> 'company_size', ''),
        coalesce(new.raw_user_meta_data ->> 'primary_need', ''),
        coalesce(new.raw_user_meta_data ->> 'plan_interest', ''),
        coalesce(new.raw_user_meta_data ->> 'project_summary', '')
    );
    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Backfill for accounts that existed before this trigger.
insert into public.profiles (
    id, email, full_name, company_name, website_url,
    company_size, primary_need, plan_interest, project_summary
)
select
    id,
    email,
    coalesce(raw_user_meta_data ->> 'full_name', ''),
    coalesce(raw_user_meta_data ->> 'company_name', ''),
    coalesce(raw_user_meta_data ->> 'website_url', ''),
    coalesce(raw_user_meta_data ->> 'company_size', ''),
    coalesce(raw_user_meta_data ->> 'primary_need', ''),
    coalesce(raw_user_meta_data ->> 'plan_interest', ''),
    coalesce(raw_user_meta_data ->> 'project_summary', '')
from auth.users
on conflict (id) do nothing;

alter table public.profiles enable row level security;

create policy "Clients read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Clients update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
