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

  4. Create the database table — run this in Supabase → SQL Editor:

  ──────────────────────────────────────────────────────────────────
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
  ──────────────────────────────────────────────────────────────────
*/

const SUPABASE_URL      = 'https://qsvzhstdkumfokrmqqrs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdnpoc3Rka3VtZm9rcm1xcXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTIwNjIsImV4cCI6MjA4ODY2ODA2Mn0.GwT4jGkowVacjpVT80KpkQrRMxwRQa-NqEbQpXD4NDY';

window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
