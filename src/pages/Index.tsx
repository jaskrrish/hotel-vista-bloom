
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedRooms from '@/components/FeaturedRooms';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Users, BedDouble } from 'lucide-react';

const Index = () => {
  return (
    <div>
      <Navbar />
      
      <HeroSection />
      
      <section className="py-16">
        <div className="hotel-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Experience Luxury at Hotel Holiday</h2>
              <p className="text-gray-600 mb-6">
                Located in the heart of the city, Hotel Holiday offers an unparalleled blend of comfort, 
                convenience, and luxury. Our commitment to excellence ensures that every moment of your 
                stay is memorable and enjoyable.
              </p>
              <p className="text-gray-600 mb-6">
                With spectacular views, premium amenities, and world-class service, 
                we provide an exceptional hospitality experience tailored to meet your needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-hotel-primary/10 p-2 rounded-full">
                    <Check className="text-hotel-primary" size={20} />
                  </div>
                  <p>Prime location with breathtaking views</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-hotel-primary/10 p-2 rounded-full">
                    <Check className="text-hotel-primary" size={20} />
                  </div>
                  <p>Luxurious rooms and world-class amenities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-hotel-primary/10 p-2 rounded-full">
                    <Check className="text-hotel-primary" size={20} />
                  </div>
                  <p>Exceptional dining experiences</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop" 
                alt="Hotel Interior" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-lg rounded-lg hidden md:block">
                <p className="text-sm font-medium text-gray-600">Opening Hours</p>
                <p className="font-bold">24/7 Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedRooms />
      
      <section className="py-16 bg-white">
        <div className="hotel-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services & Amenities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy a wide range of premium services designed to enhance your stay and create unforgettable moments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-hotel-light p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-hotel-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BedDouble className="text-hotel-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable Rooms</h3>
              <p className="text-gray-600">
                Spacious, well-appointed rooms with premium bedding and amenities for a restful stay.
              </p>
            </div>
            
            <div className="bg-hotel-light p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-hotel-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hotel-primary">
                  <path d="M6.01 7.9 9 9.74a2.6 2.6 0 0 0 3.8-2.32V2H6.01c-1.1 0-2 .89-2 2 0 3.91 2 5.1 2 5.9Z" />
                  <path d="M18.5 2h-4.5v5.42a2.6 2.6 0 0 0 3.8 2.32L21 7.9c0-.8 2-2 2-5.9 0-1.1-.9-2-2-2" />
                  <path d="M20.48 16.34A22 22 0 0 0 12 10a22 22 0 0 0-8.48 6.34" />
                  <path d="M13 22h-2l-1-7 3-2 3 2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
              <p className="text-gray-600">
                Exquisite culinary experiences with a variety of international and local cuisines.
              </p>
            </div>
            
            <div className="bg-hotel-light p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-hotel-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-hotel-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Concierge Service</h3>
              <p className="text-gray-600">
                Dedicated staff ready to assist with all your needs, from reservations to local recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
