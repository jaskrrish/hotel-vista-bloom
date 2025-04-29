
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { rooms, Room } from '@/lib/data';

const Rooms = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    minPrice: 0,
    maxPrice: 1000,
  });

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter(room => {
    return (
      (filters.type === 'all' || room.type === filters.type) &&
      room.price >= filters.minPrice &&
      room.price <= filters.maxPrice
    );
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'minPrice' || name === 'maxPrice' ? parseInt(value) : value
    }));
  };

  return (
    <div>
      <Navbar />
      
      <div className="bg-hotel-primary/10 py-16">
        <div className="hotel-container">
          <h1 className="text-4xl font-bold mb-4">Our Rooms & Suites</h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Discover the perfect accommodation for your stay. From cozy standard rooms to luxurious suites, 
            we have options to suit every preference and budget.
          </p>
        </div>
      </div>
      
      <section className="py-12">
        <div className="hotel-container">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
                >
                  <option value="all">All Types</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="presidential">Presidential</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
                <input
                  type="range"
                  id="minPrice"
                  name="minPrice"
                  min="0"
                  max="500"
                  step="50"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${filters.minPrice}</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
                <input
                  type="range"
                  id="maxPrice"
                  name="maxPrice"
                  min="100"
                  max="1000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$100</span>
                  <span>${filters.maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">Found {filteredRooms.length} rooms</p>
          </div>
          
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No rooms found matching your criteria</h3>
              <p className="text-gray-600">Please try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Rooms;
