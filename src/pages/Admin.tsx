
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookings, useUpdateBookingStatus, useRooms } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'rooms'>('dashboard');

  const { data: bookings = [], isLoading: isLoadingBookings, error: bookingsError } = useBookings();
  const { data: rooms = [], isLoading: isLoadingRooms } = useRooms();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();

  const handleStatusUpdate = (id: number, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    updateStatus({ id, status: newStatus });
  };

  // Calculate dashboard stats
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const availableRooms = rooms.filter(r => r.availability).length;
  const totalRevenue = bookings.reduce((sum, booking) => booking.status === 'confirmed' ? sum + Number(booking.total_price) : sum, 0);

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
          
          {/* Loading state */}
          {(isLoadingBookings || isLoadingRooms) && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-hotel-primary" />
            </div>
          )}
          
          {/* Error state */}
          {bookingsError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-red-700">Error loading data: {bookingsError.toString()}</p>
            </div>
          )}
          
          {/* Dashboard */}
          {!isLoadingBookings && !isLoadingRooms && activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Bookings</h3>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                  <div className="mt-2 text-xs text-green-600">
                    <span>Live data from database</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Available Rooms</h3>
                  <p className="text-3xl font-bold">{availableRooms}</p>
                  <div className="mt-2 text-xs text-gray-600">
                    <span>Out of {rooms.length} total rooms</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Bookings</h3>
                  <p className="text-3xl font-bold">{pendingBookings}</p>
                  <div className="mt-2 text-xs text-yellow-600">
                    <span>Requires attention</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                  <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                  <div className="mt-2 text-xs text-green-600">
                    <span>From confirmed bookings</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.slice(0, 5).map((booking) => {
                        const room = booking.rooms;
                        return (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div className="font-medium text-gray-900">{booking.first_name} {booking.last_name}</div>
                              <div className="text-sm text-gray-500">{booking.email}</div>
                            </TableCell>
                            <TableCell>
                              {room ? room.name : "Unknown Room"}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-900">{booking.check_in} to {booking.check_out}</div>
                              <div className="text-sm text-gray-500">{booking.guests} guests</div>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}`}>
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              ${Number(booking.total_price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          
          {/* Bookings */}
          {!isLoadingBookings && activeTab === 'bookings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">All Bookings</h2>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check In/Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const room = booking.rooms;
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="text-sm text-gray-500">
                            #{booking.id}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">{booking.first_name} {booking.last_name}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </TableCell>
                          <TableCell>
                            {room ? room.name : "Unknown Room"}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">{booking.check_in}</div>
                            <div className="text-sm text-gray-900">{booking.check_out}</div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            ${Number(booking.total_price).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                disabled={booking.status === 'confirmed' || isUpdating}
                              >
                                <Check size={16} />
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                disabled={booking.status === 'cancelled' || isUpdating}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {/* Rooms */}
          {!isLoadingRooms && activeTab === 'rooms' && (
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
