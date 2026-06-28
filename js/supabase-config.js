/*
  Amal — Supabase Configuration

  SETUP STEPS:
  ────────────
  1. Paste your credentials from:
     Supabase Dashboard → Project Settings → API

  2. Enable Google Auth:
     Supabase Dashboard → Auth → Providers → Google
     (You'll need a Google Cloud OAuth 2.0 client — the Supabase docs walk through it)

  3. Allow your domain as a redirect URL:
     Supabase Dashboard → Auth → URL Configuration
     Site URL: https://amal.amanahdigital.co.uk
     Redirect URLs: https://amal.amanahdigital.co.uk/*

  4. Create the database tables — run this in Supabase → SQL Editor:

  ──────────────────────────────────────────────────────────────────
  -- User library
  create table if not exists user_library (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid references auth.users(id) on delete cascade not null,
    dua_id      text not null,
    dua_data    jsonb not null default '{}',
    saved_at    timestamptz default now(),
    answered    boolean default false,
    answered_at timestamptz,
    constraint user_library_unique unique (user_id, dua_id)
  );

  alter table user_library enable row level security;

  create policy "Users manage own library"
    on user_library for all
    using  (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Umrah sharing lists
  create table if not exists sharing_lists (
    id         uuid primary key default gen_random_uuid(),
    user_id    uuid references auth.users(id) on delete cascade not null,
    label      text not null default 'My Umrah Duas',
    status     text not null default 'open',
    created_at timestamptz default now()
  );
  alter table sharing_lists enable row level security;
  create policy "Anyone reads sharing lists"  on sharing_lists for select using (true);
  create policy "Users create sharing lists"  on sharing_lists for insert with check (auth.uid() = user_id);
  create policy "Users update sharing lists"  on sharing_lists for update using (auth.uid() = user_id);
  create policy "Users delete sharing lists"  on sharing_lists for delete using (auth.uid() = user_id);

  -- Dua requests sent to a sharing list
  create table if not exists sharing_requests (
    id         uuid primary key default gen_random_uuid(),
    list_id    uuid references sharing_lists(id) on delete cascade not null,
    name       text not null default 'Anonymous',
    dua        text not null,
    dismissed  boolean default false,
    saved      boolean default false,
    created_at timestamptz default now()
  );
  alter table sharing_requests enable row level security;
  create policy "Anyone reads sharing requests"  on sharing_requests for select using (true);
  create policy "Anyone submits to open lists"   on sharing_requests for insert
    with check (exists (select 1 from sharing_lists where id = list_id and status = 'open'));
  create policy "List owner updates requests"    on sharing_requests for update
    using (exists (select 1 from sharing_lists where id = list_id and user_id = auth.uid()));
  create policy "List owner deletes requests"    on sharing_requests for delete
    using (exists (select 1 from sharing_lists where id = list_id and user_id = auth.uid()));
  ──────────────────────────────────────────────────────────────────
*/

const SUPABASE_URL      = 'https://qsvzhstdkumfokrmqqrs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnpoc3Rka3VtZm9rcm1xcXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTIwNjIsImV4cCI6MjA4ODY2ODA2Mn0.GwT4jGkowVacjpVT80KpkQrRMxwRQa-NqEbQpXD4NDY';

window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
