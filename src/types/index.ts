export interface User {
  id: string;
  email: string;
  name: string;
  memberSince: string;
  preferences: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  description: string;
  coverUrl: string;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  rating: number;
}

export interface Rental {
  id: string;
  userId: string;
  bookId: string;
  rentedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: 'active' | 'returned' | 'overdue';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}