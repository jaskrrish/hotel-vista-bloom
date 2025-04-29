
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/data';
import { toast } from 'sonner';
import { format, addDays, differenceInDays } from 'date-fns';
import { useCreateBooking } from '@/lib/api';
import { Input } from '@/components/ui/input';

interface BookingFormProps {
  room: Room;
}

const BookingForm = ({ room }: BookingFormProps) => {
  const { mutate: createBooking, isPending } = useCreateBooking();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    guests: 1,
    specialRequests: ''
  });
  
  const [totalPrice, setTotalPrice] = useState(room.price);

  // Calculate total price when dates change
  useEffect(() => {
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.max(1, differenceInDays(checkOutDate, checkInDate));
    setTotalPrice(room.price * nights);
  }, [formData.checkIn, formData.checkOut, room.price]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      room_id: room.id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: Number(formData.guests),
      special_requests: formData.specialRequests || null,
      total_price: totalPrice
    };
    
    createBooking(bookingData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">Book This Room</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="checkIn" className="text-sm font-medium text-gray-700">Check In</label>
            <Input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              min={format(new Date(), 'yyyy-MM-dd')}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="checkOut" className="text-sm font-medium text-gray-700">Check Out</label>
            <Input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              min={format(addDays(new Date(formData.checkIn), 1), 'yyyy-MM-dd')}
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="guests" className="text-sm font-medium text-gray-700">Number of Guests</label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
          >
            {Array.from({ length: room.capacity }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
          ></textarea>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Total price</p>
              <p className="text-hotel-primary font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-hotel-accent hover:bg-hotel-accent/90 text-white"
            >
              {isPending ? 'Processing...' : 'Book Now'}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            By clicking "Book Now", you agree to our terms and conditions and cancellation policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
