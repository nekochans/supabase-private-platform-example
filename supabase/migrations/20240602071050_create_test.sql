CREATE TABLE tests(
    id UUID DEFAULT gen_random_uuid(),
    supabase_user_id NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ids),
    UNIQUE (user_id)
);
