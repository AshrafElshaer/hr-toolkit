
-- Avatar bucket
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true);


create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Users can delete their own avatar." on storage.objects
  for delete using (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Users can update their own avatar." on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid() = owner);

-- Logo bucket
insert into storage.buckets (id, name, public)
  values ('logos', 'logos', true);


create policy "Logo images are publicly accessible." on storage.objects
  for select using (bucket_id = 'logos');

create policy "Anyone can upload a logo." on storage.objects
  for insert with check (bucket_id = 'logos');

create policy "Users can delete their own logo." on storage.objects
  for delete using (bucket_id = 'logos' and auth.uid() = owner);

create policy "Users can update their own logo." on storage.objects
  for update using (bucket_id = 'logos' and auth.uid() = owner);


-- Profile Document bucket
insert into storage.buckets (id, name, public)
  values ('profile-documents', 'profile-documents', true);

create policy "Profile document images are publicly accessible." on storage.objects
  for select using (bucket_id = 'profile-documents');

create policy "Anyone can upload a profile document." on storage.objects
  for insert with check (bucket_id = 'profile-documents');

create policy "Users can delete their own profile document." on storage.objects
  for delete using (bucket_id = 'profile-documents' and auth.uid() = owner);

create policy "Users can update their own profile document." on storage.objects
  for update using (bucket_id = 'profile-documents' and auth.uid() = owner);
