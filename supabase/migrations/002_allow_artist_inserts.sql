CREATE POLICY "Allow artist inserts for seeding" ON artists
  FOR INSERT 
  WITH CHECK (true);

