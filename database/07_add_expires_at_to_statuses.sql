ALTER TABLE public.statuses
ADD COLUMN expires_at TIMESTAMPTZ;

ALTER TABLE public.statuses
ADD CONSTRAINT statuses_user_id_unique UNIQUE (user_id);

ALTER TABLE public.statuses
ADD COLUMN note TEXT;