/*
  # Real Estate Listings and User Management Schema

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `address` (text)
      - `property_type` (text)
      - `bedrooms` (integer)
      - `bathrooms` (numeric)
      - `square_feet` (numeric)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_tokens`
      - `user_id` (uuid, references auth.users)
      - `tokens_remaining` (integer)
      - `last_updated` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own data
*/

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  address text NOT NULL,
  property_type text NOT NULL,
  bedrooms integer,
  bathrooms numeric,
  square_feet numeric,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_tokens table
CREATE TABLE IF NOT EXISTS user_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users,
  tokens_remaining integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;

-- Policies for listings
CREATE POLICY "Users can view own listings"
  ON listings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_tokens
CREATE POLICY "Users can view own tokens"
  ON user_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON user_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);