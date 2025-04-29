
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  room: Room;
}

const BookingForm = ({ room }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Booking Successful!",
        description: `Thank you for booking the ${room.name}. You will receive a confirmation email shortly.`,
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">Book This Room</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="checkIn" className="text-sm font-medium text-gray-700">Check In</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="checkOut" className="text-sm font-medium text-gray-700">Check Out</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hotel-primary"
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
              <p className="text-sm text-gray-600">Price per night</p>
              <p className="text-hotel-primary font-semibold">${room.price}</p>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-hotel-accent hover:bg-hotel-accent/90 text-white"
            >
              {isSubmitting ? 'Processing...' : 'Book Now'}
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
