
import React from 'react';
import RoomCard from './RoomCard';
import { rooms } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedRooms = () => {
  const featuredRooms = rooms.filter(room => room.featured).slice(0, 3);

  return (
    <section id="featured-rooms" className="py-16 bg-hotel-light">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and exclusive rooms, designed to provide you with an exceptional stay experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map(room => (
            <RoomCard key={room.id} room={room} featured={true} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-hotel-primary text-hotel-primary hover:bg-hotel-primary hover:text-white">
            <Link to="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
