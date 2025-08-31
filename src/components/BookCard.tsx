import React from 'react';
import { Star, Calendar, User } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onRent?: (book: Book) => void;
  onReturn?: (book: Book) => void;
  isRented?: boolean;
  dueDate?: string;
  showActions?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onRent, 
  onReturn, 
  isRented = false, 
  dueDate,
  showActions = true 
}) => {
  const isAvailable = book.availableCopies > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? `${book.availableCopies} available` : 'Out of stock'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <User size={14} className="mr-1" />
          <span className="text-sm">{book.author}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={14} className="mr-1" />
          <span className="text-sm">{book.publishYear}</span>
          <div className="ml-auto flex items-center">
            <Star size={14} className="text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{book.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>

        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>

        {showActions && (
          <div className="space-y-2">
            {isRented ? (
              <>
                {dueDate && (
                  <p className="text-sm text-amber-600 mb-2">
                    Due: {new Date(dueDate).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={() => onReturn?.(book)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Return Book
                </button>
              </>
            ) : (
              <button
                onClick={() => onRent?.(book)}
                disabled={!isAvailable}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  isAvailable
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Rent Book' : 'Unavailable'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};