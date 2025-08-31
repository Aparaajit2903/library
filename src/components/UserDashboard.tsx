import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, TrendingUp, X } from 'lucide-react';
import { User, Book, Rental } from '../types';
import { BookCard } from './BookCard';
import { getUserRentals, getAllBooks, updateBookAvailability, getAllRentals, saveAllRentals } from '../utils/storage';
import { getRecommendations } from '../utils/recommendations';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [showReturnConfirm, setShowReturnConfirm] = useState(false);
  const [bookToReturn, setBookToReturn] = useState<Book | null>(null);
  const [showReturnSuccess, setShowReturnSuccess] = useState(false);
  const [returnedBook, setReturnedBook] = useState<Book | null>(null);

  useEffect(() => {
    const userRentals = getUserRentals(user.id);
    const allBooks = getAllBooks();
    const userRecommendations = getRecommendations(user);
    
    setRentals(userRentals.filter(r => r.status === 'active'));
    setBooks(allBooks);
    setRecommendations(userRecommendations);
  }, [user.id]);

  const handleReturnClick = (book: Book) => {
    setBookToReturn(book);
    setShowReturnConfirm(true);
  };

  const confirmReturnBook = () => {
    if (!bookToReturn) return;

    const allRentals = getAllRentals();
    const rentalIndex = allRentals.findIndex(r => 
      r.userId === user.id && r.bookId === bookToReturn.id && r.status === 'active'
    );
    
    if (rentalIndex !== -1) {
      allRentals[rentalIndex].status = 'returned';
      allRentals[rentalIndex].returnedAt = new Date().toISOString();
      saveAllRentals(allRentals);
      
      // Update book availability
      updateBookAvailability(bookToReturn.id, 1);
      
      // Refresh rentals
      setRentals(getUserRentals(user.id).filter(r => r.status === 'active'));
      
      // Show success message
      setReturnedBook(bookToReturn);
      setShowReturnSuccess(true);
      setShowReturnConfirm(false);
      setBookToReturn(null);
    }
  };

  const activeRentals = rentals.filter(r => r.status === 'active');
  const rentedBooks = activeRentals.map(rental => {
    const book = books.find(b => b.id === rental.bookId);
    return book ? { book, rental } : null;
  }).filter(Boolean);

  const stats = [
    {
      label: 'Books Currently Rented',
      value: activeRentals.length,
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Total Books Read',
      value: getUserRentals(user.id).filter(r => r.status === 'returned').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Member Since',
      value: new Date(user.memberSince).getFullYear(),
      icon: Clock,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">Manage your library activity and discover new books</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Currently Rented Books */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BookOpen className="mr-2 text-blue-600" size={24} />
          Currently Rented ({activeRentals.length})
        </h3>
        
        {rentedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rentedBooks.map(({ book, rental }) => (
              <BookCard
                key={rental.id}
                book={book!}
                onReturn={handleReturnClick}
                isRented={true}
                dueDate={rental.dueDate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg">You haven't rented any books yet.</p>
            <p className="text-gray-500">Browse our catalog to find your next great read!</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="mr-2 text-amber-600" size={24} />
          Recommended for You
        </h3>
        
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map(book => (
              <BookCard
                key={book.id}
                book={book}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <TrendingUp className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg">No recommendations available yet.</p>
            <p className="text-gray-500">Rent some books to get personalized recommendations!</p>
          </div>
        )}
      </div>

      {/* Return Confirmation Modal */}
      {showReturnConfirm && bookToReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Return</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to return "<strong>{bookToReturn.title}</strong>" by {bookToReturn.author}?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowReturnConfirm(false);
                    setBookToReturn(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReturnBook}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Yes, Return Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Success Modal */}
      {showReturnSuccess && returnedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Book Returned Successfully!</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <img
                  src={returnedBook.coverUrl}
                  alt={returnedBook.title}
                  className="w-16 h-20 object-cover rounded mx-auto mb-3"
                />
                <p className="font-semibold text-gray-800">{returnedBook.title}</p>
                <p className="text-gray-600 text-sm">by {returnedBook.author}</p>
              </div>
              <p className="text-gray-600 mb-6">
                Thank you for returning the book on time. It's now available for other members to enjoy!
              </p>
              <button
                onClick={() => {
                  setShowReturnSuccess(false);
                  setReturnedBook(null);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};