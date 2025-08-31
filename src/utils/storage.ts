import { User, Book, Rental } from '../types';
import { mockBooks } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'library_user',
  USERS: 'library_users',
  RENTALS: 'library_rentals',
  BOOKS: 'library_books'
};

// Initialize with mock data if not exists
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(mockBooks));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RENTALS)) {
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify([]));
  }
};

// User management
export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getAllUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveAllUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// Book management
export const getAllBooks = (): Book[] => {
  const books = localStorage.getItem(STORAGE_KEYS.BOOKS);
  return books ? JSON.parse(books) : mockBooks;
};

export const saveAllBooks = (books: Book[]) => {
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
};

export const updateBookAvailability = (bookId: string, change: number) => {
  const books = getAllBooks();
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.availableCopies = Math.max(0, Math.min(book.totalCopies, book.availableCopies + change));
    saveAllBooks(books);
  }
};

// Rental management
export const getAllRentals = (): Rental[] => {
  const rentals = localStorage.getItem(STORAGE_KEYS.RENTALS);
  return rentals ? JSON.parse(rentals) : [];
};

export const saveAllRentals = (rentals: Rental[]) => {
  localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(rentals));
};

export const getUserRentals = (userId: string): Rental[] => {
  return getAllRentals().filter(rental => rental.userId === userId);
};