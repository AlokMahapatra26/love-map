-- Create the couples table
create table couples (
  id text primary key,
  partner1 jsonb,
  partner2 jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table couples enable row level security;

-- Create policies to allow public access (since we are not using authentication)
-- Security relies on the obscurity of the UUIDs.
create policy "Enable read access for all users" on couples for select using (true);
create policy "Enable insert access for all users" on couples for insert with check (true);
create policy "Enable update access for all users" on couples for update using (true);
