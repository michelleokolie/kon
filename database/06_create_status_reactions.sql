CREATE TABLE IF NOT EXISTS public.status_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status_id UUID REFERENCES public.statuses(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reaction_type TEXT NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(status_id, user_id)
);