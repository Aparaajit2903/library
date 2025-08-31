import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { User as UserType } from '../types';
import { saveUser, getAllUsers, saveAllUsers } from '../utils/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferences: [] as string[]
  });
  const [error, setError] = useState('');

  const genres = ['Classic Literature', 'Science Fiction', 'Fantasy', 'Romance', 'Mystery', 'Biography'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = getAllUsers();

    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === formData.email);
      if (!user) {
        setError('User not found. Please sign up first.');
        return;
      }
      
      const userData: UserType = {
        id: user.id,
        email: user.email,
        name: user.name,
        memberSince: user.memberSince,
        preferences: user.preferences
      };
      
      saveUser(userData);
      onAuthSuccess(userData);
      onClose();
    } else {
      // Signup logic
      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists. Please login instead.');
        return;
      }

      const newUser: UserType = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        memberSince: new Date().toISOString(),
        preferences: formData.preferences
      };

      users.push(newUser);
      saveAllUsers(users);
      saveUser(newUser);
      onAuthSuccess(newUser);
      onClose();
    }
  };

  const togglePreference = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(genre)
        ? prev.preferences.filter(p => p !== genre)
        : [...prev.preferences, genre]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Join Our Library'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock size={16} className="inline mr-2" />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Favorite Genres (optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => togglePreference(genre)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      formData.preferences.includes(genre)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', preferences: [] });
              }}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};