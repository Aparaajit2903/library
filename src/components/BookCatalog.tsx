import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Book, User } from '../types';
import { BookCard } from './BookCard';
import { getAllBooks, updateBookAvailability, getAllRentals, saveAllRentals } from '../utils/storage';
import { genres } from '../data/mockData';

interface BookCatalogProps {
  user: User;
  onRentBook: (book: Book) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({ user, onRentBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [books] = useState(getAllBooks());

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All Genres' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  const handleRentBook = (book: Book) => {
    if (book.availableCopies > 0) {
      // Create rental record
      const rental = {
        id: Date.now().toString(),
        userId: user.id,
        bookId: book.id,
        rentedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
        status: 'active' as const
      };

      const rentals = getAllRentals();
      rentals.push(rental);
      saveAllRentals(rentals);

      // Update book availability
      updateBookAvailability(book.id, -1);
      
      onRentBook(book);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse Our Collection</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onRent={handleRentBook}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};