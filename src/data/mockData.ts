import { Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    genre: 'Classic Literature',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    coverUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1925,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.2
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780446310789',
    genre: 'Classic Literature',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1960,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.8
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    genre: 'Science Fiction',
    description: 'Epic space opera set on the desert planet Arrakis, featuring political intrigue and mystical powers.',
    coverUrl: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1965,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.6
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    genre: 'Fantasy',
    description: 'The enchanting prelude to The Lord of the Rings, following Bilbo Baggins on his unexpected journey.',
    coverUrl: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1937,
    totalCopies: 8,
    availableCopies: 5,
    rating: 4.7
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    genre: 'Romance',
    description: 'A witty commentary on 19th-century British society and the complex relationship between Elizabeth and Darcy.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1813,
    totalCopies: 3,
    availableCopies: 1,
    rating: 4.5
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    genre: 'Dystopian Fiction',
    description: 'A chilling dystopian masterpiece about totalitarian control and the power of independent thought.',
    coverUrl: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1949,
    totalCopies: 7,
    availableCopies: 6,
    rating: 4.4
  },
  {
    id: '7',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '9780316769174',
    genre: 'Coming of Age',
    description: 'A controversial and influential novel about teenage rebellion and alienation in post-war America.',
    coverUrl: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1951,
    totalCopies: 4,
    availableCopies: 3,
    rating: 3.8
  },
  {
    id: '8',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '9780439708180',
    genre: 'Fantasy',
    description: 'The magical beginning of Harry Potter\'s journey at Hogwarts School of Witchcraft and Wizardry.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    publishYear: 1997,
    totalCopies: 10,
    availableCopies: 7,
    rating: 4.9
  }
];

export const genres = [
  'All Genres',
  'Classic Literature',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Dystopian Fiction',
  'Coming of Age',
  'Mystery',
  'Historical Fiction',
  'Biography'
];