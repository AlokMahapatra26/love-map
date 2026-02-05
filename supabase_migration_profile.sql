ALTER TABLE couples ADD COLUMN user_id UUID REFERENCES auth.users(id);
