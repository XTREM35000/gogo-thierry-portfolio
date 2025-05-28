-- Add image_url column to experiences table
ALTER TABLE experiences ADD COLUMN image_url TEXT;

-- Update RLS policies to allow access to the new column
ALTER POLICY "Enable read access for all users" ON experiences
    USING (true);

ALTER POLICY "Enable insert for authenticated users only" ON experiences
    USING (auth.role() = 'authenticated');

ALTER POLICY "Enable update for authenticated users only" ON experiences
    USING (auth.role() = 'authenticated');

ALTER POLICY "Enable delete for authenticated users only" ON experiences
    USING (auth.role() = 'authenticated');
