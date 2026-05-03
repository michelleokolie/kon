-- This will turn RLS on for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- We need to allow global search (read)
CREATE POLICY "public profiles can be viewed by everyone" ON public.profiles 
FOR SELECT USING (true);

-- But users can only update themselves
CREATE POLICY "users can only update their own profiles" ON public.profiles
FOR UPDATE USING (auth.uid() = id);