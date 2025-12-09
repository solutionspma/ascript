-- AScript.Healthcare Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create referrals table
create table if not exists referrals (
  referral_id text primary key,
  patient_id text not null,
  patient_name text not null,
  patient_email text,
  patient_phone text,
  provider_id text,
  referrer_id text,
  referrer_name text,
  service_type text,
  insurance_type text,
  notes text,
  status text default 'pending' check (status in ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  ehr_type text,
  ehr_source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  contacted_at timestamp with time zone,
  scheduled_at timestamp with time zone,
  completed_at timestamp with time zone
);

-- Create referral logs table
create table if not exists referral_logs (
  id uuid primary key default gen_random_uuid(),
  referral_id text references referrals(referral_id) on delete cascade,
  action text not null,
  user_id text,
  notes text,
  metadata jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bonuses table
create table if not exists bonuses (
  id uuid primary key default gen_random_uuid(),
  referral_id text references referrals(referral_id) on delete cascade,
  amount numeric(10, 2) not null,
  type text default 'referral' check (type in ('referral', 'milestone', 'custom')),
  status text default 'pending' check (status in ('pending', 'approved', 'paid', 'cancelled')),
  paid_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create tenants table (for multi-tenant support)
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  domain text unique,
  logo text,
  primary_color text default '#0ea5e9',
  settings jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create user_roles table (maps auth.users to roles)
create table if not exists user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete cascade,
  role text not null check (role in ('genesis', 'admin', 'provider', 'referrer')),
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for better performance
create index if not exists referrals_patient_id_idx on referrals(patient_id);
create index if not exists referrals_provider_id_idx on referrals(provider_id);
create index if not exists referrals_referrer_id_idx on referrals(referrer_id);
create index if not exists referrals_status_idx on referrals(status);
create index if not exists referrals_created_at_idx on referrals(created_at);
create index if not exists referral_logs_referral_id_idx on referral_logs(referral_id);
create index if not exists referral_logs_timestamp_idx on referral_logs(timestamp);
create index if not exists bonuses_referral_id_idx on bonuses(referral_id);
create index if not exists bonuses_status_idx on bonuses(status);
create index if not exists user_roles_tenant_id_idx on user_roles(tenant_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_referrals_updated_at before update on referrals
  for each row execute function update_updated_at_column();

create trigger update_bonuses_updated_at before update on bonuses
  for each row execute function update_updated_at_column();

create trigger update_tenants_updated_at before update on tenants
  for each row execute function update_updated_at_column();

create trigger update_user_roles_updated_at before update on user_roles
  for each row execute function update_updated_at_column();

-- Enable Row Level Security (RLS)
alter table referrals enable row level security;
alter table referral_logs enable row level security;
alter table bonuses enable row level security;
alter table tenants enable row level security;
alter table user_roles enable row level security;

-- RLS Policies (basic - can be expanded)
create policy "Users can view their own tenant's referrals"
  on referrals for select
  using (
    provider_id = auth.uid()::text or
    referrer_id = auth.uid()::text or
    exists (
      select 1 from user_roles
      where user_id = auth.uid()
      and role in ('genesis', 'admin')
    )
  );

create policy "Users can insert referrals"
  on referrals for insert
  with check (true);

create policy "Users can update their tenant's referrals"
  on referrals for update
  using (
    provider_id = auth.uid()::text or
    exists (
      select 1 from user_roles
      where user_id = auth.uid()
      and role in ('genesis', 'admin')
    )
  );

-- Grant access to authenticated users
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;

-- Success message
do $$
begin
  raise notice 'AScript.Healthcare database schema created successfully!';
end $$;
