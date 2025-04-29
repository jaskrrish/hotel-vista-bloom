
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { bookings, rooms } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const { toast } = useToast();
  const [activeBookings, setActiveBookings] = useState(bookings);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'rooms'>('dashboard');

  const handleStatusUpdate = (id: number, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    setActiveBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Booking #${id} status changed to ${newStatus}.`,
    });
  };

  return (
    <div>
      <Navbar />
      
      <div className="bg-hotel-primary py-8">
        <div className="hotel-container">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </div>
      
      <section className="py-8">
        <div className="hotel-container">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'dashboard' ? 'text-hotel-primary border-b-2 border-hotel-primary' : 'text-gray-600 hover:text-hotel-primary'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'bookings' ? 'text-hotel-primary border-b-2 border-hotel-primary' : 'text-gray-600 hover:text-hotel-primary'}`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'rooms' ? 'text-hotel-primary border-b-2 border-hotel-primary' : 'text-gray-600 hover:text-hotel-primary'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
          </div>
          
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Bookings</h3>
                  <p className="text-3xl font-bold">{activeBookings.length}</p>
                  <div className="mt-2 text-xs text-green-600">
                    <span>+5% from last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Available Rooms</h3>
                  <p className="text-3xl font-bold">{rooms.filter(r => r.availability).length}</p>
                  <div className="mt-2 text-xs text-gray-600">
                    <span>Out of {rooms.length} total rooms</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Bookings</h3>
                  <p className="text-3xl font-bold">{activeBookings.filter(b => b.status === 'pending').length}</p>
                  <div className="mt-2 text-xs text-yellow-600">
                    <span>Requires attention</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                  <p className="text-3xl font-bold">${activeBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}</p>
                  <div className="mt-2 text-xs text-green-600">
                    <span>+12% from last month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeBookings.slice(0, 5).map((booking) => {
                        const room = rooms.find(r => r.id === booking.roomId);
                        return (
                          <tr key={booking.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{booking.guestName}</div>
                              <div className="text-sm text-gray-500">{booking.email}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {room ? room.name : "Unknown Room"}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.checkIn} to {booking.checkOut}</div>
                              <div className="text-sm text-gray-500">{booking.guests} guests</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${booking.totalPrice}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Bookings */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">All Bookings</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In/Out</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeBookings.map((booking) => {
                      const room = rooms.find(r => r.id === booking.roomId);
                      return (
                        <tr key={booking.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{booking.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{booking.guestName}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {room ? room.name : "Unknown Room"}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.checkIn}</div>
                            <div className="text-sm text-gray-900">{booking.checkOut}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${booking.totalPrice}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                disabled={booking.status === 'confirmed'}
                              >
                                <Check size={16} />
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                disabled={booking.status === 'cancelled'}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Rooms */}
          {activeTab === 'rooms' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Room Management</h2>
                <Button className="bg-hotel-primary hover:bg-hotel-secondary text-white">
                  Add New Room
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map(room => (
                  <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex">
                    <div className="w-1/3">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{room.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${room.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {room.availability ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Type: {room.type}</p>
                      <p className="text-sm text-gray-600 mb-4">Price: ${room.price}/night</p>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline" className="text-hotel-primary border-hotel-primary hover:bg-hotel-primary hover:text-white">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Admin;
