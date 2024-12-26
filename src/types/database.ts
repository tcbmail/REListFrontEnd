export interface Listing {
  id: string;
  user_id: string;
  address: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface UserTokens {
  user_id: string;
  tokens_remaining: number;
  last_updated: string;
}