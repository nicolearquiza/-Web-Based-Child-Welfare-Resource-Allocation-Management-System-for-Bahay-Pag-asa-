  create extension if not exists pgcrypto;

  create table if not exists public.user_profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text not null default '',
    username text unique,
    role text not null default 'staff' check (role in ('admin', 'staff')),
    status text not null default 'active' check (status in ('active', 'inactive')),
    created_at timestamptz not null default now()
  );

  create table if not exists public.children (
    id uuid primary key default gen_random_uuid(),
    first_name text not null,
    last_name text not null,
    age smallint not null check (age >= 0),
    gender text not null,
    case_status text not null default 'open',
    is_archived boolean not null default false,
    created_at timestamptz not null default now()
  );

  create table if not exists public.case_status_history (
    id uuid primary key default gen_random_uuid(),
    child_id uuid not null references public.children (id) on delete cascade,
    old_status text,
    new_status text not null,
    changed_by uuid references public.user_profiles (id) on delete set null,
    changed_at timestamptz not null default now()
  );

  create table if not exists public.partners (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    contact_person text,
    phone text,
    email text,
    address text,
    created_at timestamptz not null default now()
  );

  create table if not exists public.resources (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    category text not null,
    quantity integer not null default 0 check (quantity >= 0),
    is_archived boolean not null default false,
    created_at timestamptz not null default now()
  );

  create table if not exists public.resource_allocations (
    id uuid primary key default gen_random_uuid(),
    child_id uuid not null references public.children (id) on delete restrict,
    resource_id uuid not null references public.resources (id) on delete restrict,
    quantity integer not null default 1 check (quantity > 0),
    allocated_by uuid references public.user_profiles (id) on delete set null,
    allocated_at timestamptz not null default now()
  );

  create table if not exists public.donations (
    id uuid primary key default gen_random_uuid(),
    donor_name text not null,
    donation_type text not null,
    amount numeric(12, 2) not null default 0 check (amount >= 0),
    date_received date not null default current_date,
    status text not null default 'received',
    created_by uuid references public.user_profiles (id) on delete set null,
    created_at timestamptz not null default now()
  );

  create table if not exists public.donation_monitoring (
    id uuid primary key default gen_random_uuid(),
    donation_id uuid not null references public.donations (id) on delete restrict,
    child_id uuid references public.children (id) on delete set null,
    quantity integer not null default 1 check (quantity > 0),
    distributed_by uuid references public.user_profiles (id) on delete set null,
    distribution_date timestamptz not null default now(),
    is_archived boolean not null default false
  );

  create table if not exists public.activity_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.user_profiles (id) on delete set null,
    action text not null,
    module text not null,
    created_at timestamptz not null default now()
  );

  create index if not exists case_status_history_changed_by_idx
    on public.case_status_history (changed_by);
  create index if not exists donations_created_by_idx
    on public.donations (created_by);
  create index if not exists donations_date_received_idx
    on public.donations (date_received);
  create index if not exists activity_logs_user_id_idx
    on public.activity_logs (user_id);

  create or replace function public.current_user_role()
  returns text
  language sql
  stable
  security definer
  set search_path = public
  as $$
    select role
    from public.user_profiles
    where id = (select auth.uid())
      and status = 'active'
  $$;

  create or replace function public.handle_new_auth_user()
  returns trigger
  language plpgsql
  security definer
  set search_path = ''
  as $$
  begin
    insert into public.user_profiles (id, full_name, username)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'username', '')
    )
    on conflict (id) do nothing;
    return new;
  end;
  $$;

  drop trigger if exists on_auth_user_created on auth.users;
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_auth_user();

  alter table public.user_profiles enable row level security;
  alter table public.children enable row level security;
  alter table public.case_status_history enable row level security;
  alter table public.partners enable row level security;
  alter table public.resources enable row level security;
  alter table public.resource_allocations enable row level security;
  alter table public.donations enable row level security;
  alter table public.donation_monitoring enable row level security;
  alter table public.activity_logs enable row level security;

  grant usage on schema public to authenticated;
  grant select on public.user_profiles to authenticated;
  grant select, insert, update, delete on public.children to authenticated;
  grant select, insert on public.case_status_history to authenticated;
  grant select, insert, update, delete on public.partners to authenticated;
  grant select, insert, update, delete on public.resources to authenticated;
  grant select, insert, update, delete on public.resource_allocations to authenticated;
  grant select, insert, update, delete on public.donations to authenticated;
  grant select, insert, update, delete on public.donation_monitoring to authenticated;
  grant select, insert on public.activity_logs to authenticated;
  grant execute on function public.current_user_role() to authenticated;

  create policy "Users can view their own profile or admins can view all"
    on public.user_profiles for select to authenticated
    using (id = (select auth.uid()) or (select public.current_user_role()) = 'admin');

  create policy "Active users can view children"
    on public.children for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Admins can insert children"
    on public.children for insert to authenticated
    with check ((select public.current_user_role()) = 'admin');
  create policy "Admins can update children"
    on public.children for update to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');
  create policy "Admins can delete children"
    on public.children for delete to authenticated
    using ((select public.current_user_role()) = 'admin');

  create policy "Active users can view case history"
    on public.case_status_history for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Active staff can add case history"
    on public.case_status_history for insert to authenticated
    with check (
      (select public.current_user_role()) in ('admin', 'staff')
      and changed_by = (select auth.uid())
    );

  create policy "Active users can view partners"
    on public.partners for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Admins can manage partners"
    on public.partners for all to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');

  create policy "Active users can view resources"
    on public.resources for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Admins can manage resources"
    on public.resources for all to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');

  create policy "Active users can view allocations"
    on public.resource_allocations for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Admins can manage allocations"
    on public.resource_allocations for all to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');

  create policy "Admins and owners can view donations"
    on public.donations for select to authenticated
    using (
      (select public.current_user_role()) = 'admin'
      or created_by = (select auth.uid())
    );
  create policy "Active users can record their own donations"
    on public.donations for insert to authenticated
    with check (
      (select public.current_user_role()) in ('admin', 'staff')
      and created_by = (select auth.uid())
    );
  create policy "Admins can update donations"
    on public.donations for update to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');
  create policy "Admins can delete donations"
    on public.donations for delete to authenticated
    using ((select public.current_user_role()) = 'admin');

  create policy "Active users can view donation distributions"
    on public.donation_monitoring for select to authenticated
    using ((select public.current_user_role()) in ('admin', 'staff'));
  create policy "Admins can manage donation distributions"
    on public.donation_monitoring for all to authenticated
    using ((select public.current_user_role()) = 'admin')
    with check ((select public.current_user_role()) = 'admin');

  create policy "Admins can view activity logs"
    on public.activity_logs for select to authenticated
    using ((select public.current_user_role()) = 'admin');
  create policy "Active users can add their own activity logs"
    on public.activity_logs for insert to authenticated
    with check (
      (select public.current_user_role()) in ('admin', 'staff')
      and user_id = (select auth.uid())
    );

  update public.user_profiles as profile
  set role = 'admin'
  from auth.users as auth_user
  where profile.id = auth_user.id
    and auth_user.email = 'nicolearquiza@example.com'
  returning profile.id, profile.role;
