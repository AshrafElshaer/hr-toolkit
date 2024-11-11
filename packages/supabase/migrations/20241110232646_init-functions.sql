create or replace function get_user_organization_id() returns uuid
    security invoker
    set search_path = public
as $$
    select organization_id from organization_members where user_id = auth.uid();
$$ language sql stable;


create or replace function get_user_role() returns user_role_enum 
    security invoker
    set search_path = public
as $$
    select user_role from users where id = auth.uid();
$$ language sql stable;

create or replace function is_user_admin() returns boolean 
    security invoker
    set search_path = public
as $$
    select user_role = 'admin' from users where id = auth.uid();
$$ language sql stable;

create or replace function is_user_member() returns boolean  
    security invoker
    set search_path = public 
as $$
    select user_role = 'member' from users where id = auth.uid(); 
$$ language sql stable;

create or replace function is_user_organization_admin(organization_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select admin_id = auth.uid() from organizations where id = organization_id;
$$ language sql stable;

create or replace function is_user_organization_member(organization_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select exists (select 1 from organization_members where user_id = auth.uid() and organization_id = organization_id);
$$ language sql stable;


create or replace function match_job_post_embeddings (
  query_embedding vector (384),
  match_threshold float,
  match_count int
) returns table (id uuid, title text, similarity float) language sql stable as $$
    select
        id,
        title,
        1 - (job_posts.embedding <=> query_embedding) as similarity
    from job_posts
    where job_posts.embedding is not null
    and 1 - (job_posts.embedding <=> query_embedding) > match_threshold 
    order by similarity desc
    limit match_count;
$$;

create or replace function match_interview_embeddings(
    query_embedding vector(384),
    match_threshold float,
    match_count int
) returns table (
    id uuid,
    feedback text,
    similarity float
) language sql stable as $$
    select
        id,
        feedback,
        1 - (interviews.embedding <=> query_embedding) as similarity
    from interviews
    where interviews.embedding is not null
    and 1 - (interviews.embedding <=> query_embedding) > match_threshold 
    order by similarity desc
    limit match_count;
$$;

create
or replace function match_candidate_embeddings (
  query_embedding vector (384),
  match_threshold float,
  match_count int
) returns table (id uuid, name text, similarity float) language sql stable as $$
    select
        id,
        name,
        1 - (candidates.embedding <=> query_embedding) as similarity
    from candidates
    where candidates.embedding is not null
    and 1 - (candidates.embedding <=> query_embedding) > match_threshold 
    order by similarity desc
    limit match_count;
$$;



