import React from 'react';
import { BookOpen, Users, Star, ArrowRight } from 'lucide-react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { getPopularBooks } from '../utils/recommendations';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const popularBooks = getPopularBooks();

  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access thousands of books across all genres and categories'
    },
    {
      icon: Users,
      title: 'Easy Management',
      description: 'Simple rental and return process with automated tracking'
    },
    {
      icon: Star,
      title: 'Smart Recommendations',
      description: 'Discover new books based on your reading preferences'
    }
  ];

  const stats = [
    { label: 'Total Books', value: '10,000+' },
    { label: 'Active Members', value: '5,000+' },
    { label: 'Books Rented', value: '50,000+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Digital
              <span className="text-blue-600 block">Library Experience</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover, rent, and enjoy thousands of books from our extensive collection. 
              Get personalized recommendations and manage your reading journey effortlessly.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              Get Started Today
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose LIBMINE?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of library management with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular This Month</h2>
            <p className="text-gray-600">Discover what other readers are enjoying</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                showActions={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Reading?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of readers who have discovered their next favorite book with us
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
          >
            Create Your Account
          </button>
        </div>
      </section>
    </div>
  );
};
