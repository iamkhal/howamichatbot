import React from 'react';
import { UserRole } from '../types';
import { Baby, User2 } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#CCFF00]/10 to-[#FFA500]/10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome to Howami Companion
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Choose your interface to get personalized menstrual health information and support
      </p>
      
      <div className="flex gap-6">
        <button
          onClick={() => onRoleSelect('teen')}
          className="flex flex-col items-center p-6 bg-[#CCFF00] rounded-lg hover:bg-[#CCFF00]/90 transition-colors"
        >
          <User2 className="w-12 h-12 mb-2 text-gray-800" />
          <span className="text-lg font-semibold text-gray-800">Teen</span>
        </button>

        <button
          onClick={() => onRoleSelect('parent')}
          className="flex flex-col items-center p-6 bg-[#FFA500] rounded-lg hover:bg-[#FFA500]/90 transition-colors"
        >
          <Baby className="w-12 h-12 mb-2 text-gray-800" />
          <span className="text-lg font-semibold text-gray-800">Parent</span>
        </button>
      </div>
    </div>
  );
}