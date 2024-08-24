create type attendance_status_enum as enum(
    'clocked_in',
    'pending',
    'clocked_out',
    'approved',
    'rejected'
);

CREATE TABLE public.attendances (
    id UUID NOT NULL DEFAULT extensions.uuid_generate_v4 (),
    user_id UUID NOT NULL,
    organization_id UUID NOT NULL,
    department_id UUID NOT NULL,
    clock_in TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    clock_out TIMESTAMP WITH TIME ZONE NULL,
    break_start TIMESTAMP WITH TIME ZONE NULL,
    break_end TIMESTAMP WITH TIME ZONE NULL,
    date date NOT NULL,
    status public.attendance_status_enum NULL DEFAULT 'clocked_in' :: attendance_status_enum,
    payroll_id UUID NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT attendances_pkey PRIMARY KEY (id),
    CONSTRAINT attendances_department_id_fkey FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE,
    CONSTRAINT attendances_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations (id) ON DELETE CASCADE,
    CONSTRAINT attendances_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE UNIQUE INDEX IF NOT EXISTS attendances_id_index ON public.attendances USING btree (user_id, organization_id, date, department_id) TABLESPACE pg_default;