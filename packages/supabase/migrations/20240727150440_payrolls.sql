create type payroll_status_enum as ENUM('pending', 'paid', 'failed');

create table public.payrolls (
    id uuid not null default uuid_generate_v4 () primary key,
    user_id uuid not null references users(id) on delete cascade,
    organization_id uuid not null references organizations(id) on delete cascade,
    department_id uuid not null references departments(id) on delete cascade,
    pay_period_start date not null,
    pay_period_end date not null,
    hours_worked numeric(5, 2) not null,
    gross_pay numeric(10, 2) not null,
    net_pay numeric(10, 2) not null,
    taxes numeric(10, 2) not null,
    deductions numeric(10, 2) not null,
    bonuses numeric(10, 2) not null,
    pay_date date not null,
    status public.payroll_status_enum not null default 'pending',
    created_at  time without time zone default current_timestamp,
    updated_at  time without time zone default current_timestamp
) tablespace pg_default;

create unique index payrolls_id_index on public.payrolls (user_id, organization_id, department_id);
