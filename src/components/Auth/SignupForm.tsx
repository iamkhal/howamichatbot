import React, { useState } from 'react';
import { account } from '../../lib/appwrite';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { ID } from 'appwrite';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.create(ID.unique(), email, password);
      await account.createEmailSession(email, password);
      window.location.href = '/chat';
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#CCFF00]/10 to-[#FFA500]/10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <UserPlus className="w-12 h-12 text-[#CCFF00]" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#CCFF00] text-gray-800 py-2 rounded-lg hover:bg-[#CCFF00]/90 transition-colors"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FFA500] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}