
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { rooms } from '@/lib/data';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/BookingForm';

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const room = rooms.find(r => r.id.toString() === id);
  
  if (!room) {
    return (
      <div>
        <Navbar />
        <div className="hotel-container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Room not found</h2>
          <p className="mb-6">The room you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/rooms')} className="bg-hotel-primary hover:bg-hotel-secondary">
            View All Rooms
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="bg-hotel-primary/10 py-8">
        <div className="hotel-container">
          <Button 
            variant="outline" 
            onClick={() => navigate('/rooms')}
            className="mb-4 border-hotel-primary text-hotel-primary hover:bg-hotel-primary hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Rooms
          </Button>
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <p className="text-gray-700">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
        </div>
      </div>
      
      <section className="py-12">
        <div className="hotel-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <img src={room.image} alt={room.name} className="w-full h-auto rounded-lg shadow-md" />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Room Details</h2>
                <p className="text-gray-700 mb-6">{room.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-hotel-light p-3 rounded text-center">
                    <p className="text-sm text-gray-600">Room Size</p>
                    <p className="font-semibold">{room.size} m²</p>
                  </div>
                  <div className="bg-hotel-light p-3 rounded text-center">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold">{room.capacity} Persons</p>
                  </div>
                  <div className="bg-hotel-light p-3 rounded text-center">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">${room.price}/night</p>
                  </div>
                  <div className="bg-hotel-light p-3 rounded text-center">
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className={`font-semibold ${room.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {room.availability ? 'Available' : 'Booked'}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check size={16} className="text-hotel-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Policies</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Check-in/Check-out</h3>
                    <p className="text-gray-700">Check-in time: 2:00 PM</p>
                    <p className="text-gray-700">Check-out time: 12:00 PM</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Cancellation Policy</h3>
                    <p className="text-gray-700">
                      Free cancellation up to 48 hours before check-in. Cancellations made less than 48 hours 
                      before check-in are subject to a charge equal to one night's stay.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Additional Information</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Extra bed available upon request (additional charges may apply)</li>
                      <li>Children under 12 stay free when using existing bedding</li>
                      <li>Pets are not allowed</li>
                      <li>Smoking is not permitted</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <BookingForm room={room} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RoomDetail;
