create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  message text not null,
  gdpr boolean not null check (gdpr = true),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

revoke all privileges
on table public.contact_messages
from anon, authenticated;

revoke insert (
  name,
  company,
  email,
  phone,
  message,
  gdpr
)
on table public.contact_messages
from anon;

drop policy if exists
  "Anonymous visitors can submit contact messages"
on public.contact_messages;

grant usage on schema public to service_role;

grant insert
on table public.contact_messages
to service_role;
