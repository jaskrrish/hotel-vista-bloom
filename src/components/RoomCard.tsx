
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Check } from 'lucide-react';
import { Room } from '@/lib/data';

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

const RoomCard = ({ room, featured = false }: RoomCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 ${featured ? 'border border-hotel-accent/20' : ''}`}>
      <div className="relative">
        <img src={room.image} alt={room.name} className="w-full h-64 object-cover" />
        {featured && (
          <div className="absolute top-4 right-4 bg-hotel-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24"></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-hotel-dark">{room.name}</h3>
          <p className="text-hotel-accent font-semibold">${room.price}<span className="text-sm text-gray-500">/night</span></p>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-gray-700">
            <User size={16} />
            <span>{room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}</span>
          </div>
          <div className="text-gray-700">
            <span>{room.size} m²</span>
          </div>
        </div>
        
        {featured && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {room.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                <Check size={14} className="text-hotel-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        )}
        
        <Button asChild className="w-full bg-hotel-primary hover:bg-hotel-secondary text-white mt-2">
          <Link to={`/room/${room.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
