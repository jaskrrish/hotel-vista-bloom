
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hotel-dark text-white pt-16 pb-8">
      <div className="hotel-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Vista Bloom Hotel</h3>
            <p className="text-gray-300 mb-4">
              Experience luxury and comfort in our premium hotel located in the heart of the city.
            </p>
            <p className="text-gray-300">
              123 Ocean Drive, Coastal City<br />
              Phone: +1 234 567 890<br />
              Email: info@vistabloom.com
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-hotel-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-hotel-accent transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-hotel-accent transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">24/7 Room Service</li>
              <li className="text-gray-300">Spa & Wellness</li>
              <li className="text-gray-300">Airport Transfer</li>
              <li className="text-gray-300">Fine Dining</li>
              <li className="text-gray-300">Conference Rooms</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-hotel-accent"
              />
              <button 
                type="submit" 
                className="w-full bg-hotel-accent hover:bg-hotel-accent/90 text-white py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Vista Bloom Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
