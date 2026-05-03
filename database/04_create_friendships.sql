CREATE TABLE IF NOT EXISTS public.friendships (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(user_id, friend_id),
    CONSTRAINT different_users CHECK (user_id <> friend_id),
    -- Need a way to not double probe later on, so user_id is less than friend id to avoid duplicate rows
    CONSTRAINT id_order CHECK (user_id < friend_id)
);