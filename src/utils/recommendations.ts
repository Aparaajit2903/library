import { Book, User, Rental } from '../types';
import { getAllBooks, getUserRentals } from './storage';

export const getRecommendations = (user: User): Book[] => {
  const allBooks = getAllBooks();
  const userRentals = getUserRentals(user.id);
  const rentedBookIds = new Set(userRentals.map(rental => rental.bookId));
  
  // Get books user hasn't rented
  const unrentedBooks = allBooks.filter(book => !rentedBookIds.has(book.id));
  
  // Simple recommendation algorithm based on user preferences and ratings
  const recommendations = unrentedBooks
    .filter(book => {
      // Recommend based on user's genre preferences
      return user.preferences.length === 0 || 
             user.preferences.includes(book.genre) ||
             book.rating >= 4.0; // High-rated books for everyone
    })
    .sort((a, b) => {
      // Prioritize by rating and availability
      const aScore = a.rating + (a.availableCopies > 0 ? 1 : 0);
      const bScore = b.rating + (b.availableCopies > 0 ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 6); // Return top 6 recommendations

  return recommendations;
};

export const getPopularBooks = (): Book[] => {
  const allBooks = getAllBooks();
  return allBooks
    .filter(book => book.availableCopies > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
};