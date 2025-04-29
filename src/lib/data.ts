
export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: number;
  featured: boolean;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  amenities: string[];
  availability: boolean;
}

export interface Booking {
  id: number;
  roomId: number;
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    description: "Spacious room with a stunning view of the ocean. Features a king-size bed, luxury bathroom with walk-in shower, and a private balcony.",
    price: 250,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop",
    capacity: 2,
    size: 45,
    featured: true,
    type: "deluxe",
    amenities: ["Free Wi-Fi", "Mini Bar", "TV", "Air Conditioning", "Room Service", "Ocean View"],
    availability: true
  },
  {
    id: 2,
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with panoramic views, separate living area, dining room, and premium amenities. Butler service included.",
    price: 650,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1170&auto=format&fit=crop",
    capacity: 4,
    size: 120,
    featured: true,
    type: "presidential",
    amenities: ["Free Wi-Fi", "Mini Bar", "TV", "Air Conditioning", "Room Service", "Ocean View", "Butler Service", "Jacuzzi", "Dining Area"],
    availability: true
  },
  {
    id: 3,
    name: "Standard Garden Room",
    description: "Comfortable room with garden views, ideal for short stays. Features a queen-size bed and modern amenities.",
    price: 150,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop",
    capacity: 2,
    size: 30,
    featured: false,
    type: "standard",
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Garden View"],
    availability: true
  },
  {
    id: 4,
    name: "Family Suite",
    description: "Perfect for families, this spacious suite offers two separate bedrooms, a living area, and child-friendly amenities.",
    price: 350,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop",
    capacity: 5,
    size: 75,
    featured: true,
    type: "suite",
    amenities: ["Free Wi-Fi", "Mini Bar", "TV", "Air Conditioning", "Room Service", "Kitchenette"],
    availability: true
  },
  {
    id: 5,
    name: "Executive Room",
    description: "Designed for business travelers with a work desk, high-speed internet, and complimentary access to the Executive Lounge.",
    price: 280,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1074&auto=format&fit=crop",
    capacity: 2,
    size: 40,
    featured: false,
    type: "deluxe",
    amenities: ["Free Wi-Fi", "Mini Bar", "TV", "Air Conditioning", "Executive Lounge Access", "Work Desk"],
    availability: true
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    description: "Romantic suite with a four-poster king bed, champagne on arrival, and a deep soaking tub with spectacular views.",
    price: 400,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1170&auto=format&fit=crop",
    capacity: 2,
    size: 60,
    featured: true,
    type: "suite",
    amenities: ["Free Wi-Fi", "Mini Bar", "TV", "Air Conditioning", "Room Service", "Ocean View", "Jacuzzi", "Complimentary Champagne"],
    availability: true
  }
];

export const bookings: Booking[] = [
  {
    id: 1,
    roomId: 1,
    guestName: "John Smith",
    email: "john.smith@example.com",
    checkIn: "2023-06-15",
    checkOut: "2023-06-20",
    guests: 2,
    status: "confirmed",
    totalPrice: 1250
  },
  {
    id: 2,
    roomId: 3,
    guestName: "Emily Johnson",
    email: "emily.j@example.com",
    checkIn: "2023-07-01",
    checkOut: "2023-07-03",
    guests: 1,
    status: "confirmed",
    totalPrice: 300
  },
  {
    id: 3,
    roomId: 2,
    guestName: "Michael Brown",
    email: "m.brown@example.com",
    checkIn: "2023-06-25",
    checkOut: "2023-07-02",
    guests: 3,
    status: "pending",
    totalPrice: 4550
  }
];
