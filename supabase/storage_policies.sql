-- Create the 'avatars' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.

-- Allow public read access to the 'avatars' bucket
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

-- Allow authenticated users to upload files to the 'avatars' bucket
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Allow users to update their own avatars
create policy "Users can update their own avatars." on storage.objects
  for update using (auth.uid() = owner) with check (bucket_id = 'avatars');

-- Allow users to delete their own avatars
create policy "Users can delete their own avatars." on storage.objects
  for delete using (auth.uid() = owner and bucket_id = 'avatars');
