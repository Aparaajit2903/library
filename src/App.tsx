import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { BookCatalog } from './components/BookCatalog';
import { UserDashboard } from './components/UserDashboard';
import { LandingPage } from './components/LandingPage';
import { User, Book } from './types';
import { getUser, clearUser, initializeStorage } from './utils/storage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'catalog' | 'dashboard'>('landing');
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    initializeStorage();
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      setCurrentView('catalog');
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentView('catalog');
    setNotification(`Welcome ${userData.name}! Happy reading!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setCurrentView('landing');
    setNotification('You have been logged out successfully.');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleRentBook = (book: Book) => {
    setNotification(`"${book.title}" has been added to your rentals!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const renderCurrentView = () => {
    if (!user) {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }

    switch (currentView) {
      case 'catalog':
        return <BookCatalog user={user} onRentBook={handleRentBook} />;
      case 'dashboard':
        return <UserDashboard user={user} />;
      default:
        return <BookCatalog user={user} onRentBook={handleRentBook} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-40 transform transition-all duration-300">
          {notification}
        </div>
      )}

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="text-blue-400" size={28} />
              <h3 className="text-xl font-bold">LibraryFlow</h3>
            </div>
            <p className="text-gray-400 mb-4">Connecting readers with great books since 2025</p>
            <p className="text-gray-500 text-sm">© 2025 LibraryFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;