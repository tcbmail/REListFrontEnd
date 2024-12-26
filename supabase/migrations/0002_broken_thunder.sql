/*
  # Update user_tokens policies

  1. Changes
    - Add INSERT policy for user_tokens table to allow users to create their initial token record
    
  2. Security
    - Users can only insert their own token record
    - Insert is restricted to one record per user (via PRIMARY KEY constraint)
*/

-- Add insert policy for user_tokens
CREATE POLICY "Users can insert own token record"
  ON user_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);