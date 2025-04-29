
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="hotel-container flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-hotel-primary">Hotel Holiday</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-hotel-dark hover:text-hotel-primary transition-colors">Home</Link>
          <Link to="/rooms" className="text-hotel-dark hover:text-hotel-primary transition-colors">Rooms</Link>
          <Link to="/admin" className="text-hotel-dark hover:text-hotel-primary transition-colors">Admin</Link>
          <Button className="bg-hotel-accent hover:bg-hotel-accent/90 text-white">
            Book Now
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-hotel-dark hover:text-hotel-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="hotel-container py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-hotel-dark hover:text-hotel-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className="block text-hotel-dark hover:text-hotel-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link 
              to="/admin" 
              className="block text-hotel-dark hover:text-hotel-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <Button className="w-full bg-hotel-accent hover:bg-hotel-accent/90 text-white">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
