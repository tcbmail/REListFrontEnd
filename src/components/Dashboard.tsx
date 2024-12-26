import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ensureUserTokens } from '../lib/tokenManagement';
import type { Listing } from '../types/database';
import { useAuth } from './AuthProvider';
import NewListingButton from './NewListingButton';
import TokenDisplay from './TokenDisplay';
import ListingsTable from './ListingsTable';

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [tokens, setTokens] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  async function fetchUserData() {
    try {
      const [listingsResponse, userTokens] = await Promise.all([
        supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false }),
        ensureUserTokens(supabase, user!.id)
      ]);

      if (listingsResponse.data) {
        setListings(listingsResponse.data);
      }

      setTokens(userTokens);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleNewListing = () => {
    // TODO: Implement new listing creation
    console.log('Create new listing');
  };

  const handleEditListing = (listing: Listing) => {
    // TODO: Implement listing editing
    console.log('Edit listing:', listing);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
        <div className="flex items-center gap-4">
          <TokenDisplay tokens={tokens} />
          <NewListingButton onClick={handleNewListing} />
        </div>
      </div>

      <ListingsTable 
        listings={listings}
        onEdit={handleEditListing}
      />
    </div>
  );
}