import React from 'react';
import { BookOpen, User, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onAuthClick, 
  onLogout, 
  currentView, 
  onViewChange 
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <BookOpen className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">LibraryFlow</h1>
            </div>
            
            {user && (
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => onViewChange('catalog')}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                    currentView === 'catalog'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Browse Books
                </button>
                <button
                  onClick={() => onViewChange('dashboard')}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                    currentView === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  My Dashboard
                </button>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};