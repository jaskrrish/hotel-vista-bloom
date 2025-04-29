
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] bg-cover bg-center flex items-center" 
         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=1074&auto=format&fit=crop')` }}>
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="hotel-container relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Luxury Stays for Unforgettable Experiences
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Experience premium comfort and unparalleled service at Hotel Holiday. 
            Your perfect getaway awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-hotel-accent hover:bg-hotel-accent/90 text-white">
              <Link to="/rooms">Explore Rooms</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <a href="#featured-rooms">View Offers</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
