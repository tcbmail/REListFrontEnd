import React from 'react';
import { Plus } from 'lucide-react';

interface NewListingButtonProps {
  onClick: () => void;
}

export default function NewListingButton({ onClick }: NewListingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Plus className="w-5 h-5" />
      New Listing
    </button>
  );
}