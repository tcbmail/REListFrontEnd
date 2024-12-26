import React from 'react';
import { Coins } from 'lucide-react';

interface TokenDisplayProps {
  tokens: number;
}

export default function TokenDisplay({ tokens }: TokenDisplayProps) {
  return (
    <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
      <Coins className="w-5 h-5 text-blue-500 mr-2" />
      <span className="text-blue-700 font-semibold">{tokens} tokens remaining</span>
    </div>
  );
}