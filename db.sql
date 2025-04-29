
-- Create rooms table
CREATE TABLE public.rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  capacity INTEGER NOT NULL,
  size INTEGER NOT NULL,
  image TEXT NOT NULL,
  availability BOOLEAN DEFAULT true,
  amenities TEXT[] NOT NULL DEFAULT '{}'
);

-- Create bookings table
CREATE TABLE public.bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES public.rooms(id) NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add constraint to ensure check_out is after check_in
  CONSTRAINT check_out_after_check_in CHECK (check_out > check_in)
);

-- Insert sample rooms data
INSERT INTO public.rooms (name, type, description, price, capacity, size, image, availability, amenities) 
VALUES 
('Luxury Suite', 'suite', 'Experience the ultimate in comfort and luxury with our spacious Luxury Suite. Featuring a king-size bed, separate living area, and stunning city views.', 299.99, 2, 60, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop', true, '{"Free Wi-Fi", "Air Conditioning", "Mini Bar", "Room Service", "Flat-screen TV", "Coffee Maker", "Safe", "Bathtub"}'),
('Deluxe King', 'deluxe', 'Our Deluxe King rooms offer a perfect blend of comfort and style. Featuring a plush king-size bed and modern amenities.', 199.99, 2, 40, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop', true, '{"Free Wi-Fi", "Air Conditioning", "Mini Bar", "Flat-screen TV", "Coffee Maker", "Safe"}'),
('Family Room', 'family', 'Designed with families in mind, our spacious Family Room features two queen-size beds and plenty of space for everyone.', 249.99, 4, 55, 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=2070&auto=format&fit=crop', true, '{"Free Wi-Fi", "Air Conditioning", "Mini Bar", "Flat-screen TV", "Coffee Maker", "Safe", "Extra Beds Available"}'),
('Standard Twin', 'standard', 'Our comfortable Standard Twin rooms feature two single beds, ideal for friends or colleagues traveling together.', 159.99, 2, 30, 'https://images.unsplash.com/photo-1619292708809-bedafb8c5c83?q=80&w=1978&auto=format&fit=crop', true, '{"Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Coffee Maker"}'),
('Ocean View Suite', 'suite', 'Wake up to breathtaking ocean views in our premium Ocean View Suite. Features include a king-size bed, luxurious bathroom, and private balcony.', 349.99, 2, 65, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop', true, '{"Free Wi-Fi", "Air Conditioning", "Mini Bar", "Room Service", "Flat-screen TV", "Coffee Maker", "Safe", "Bathtub", "Private Balcony", "Ocean View"}');

-- Insert sample bookings data
INSERT INTO public.bookings (room_id, first_name, last_name, email, check_in, check_out, guests, special_requests, total_price, status) 
VALUES 
(1, 'John', 'Doe', 'john@example.com', '2025-05-10', '2025-05-15', 2, 'Late check-in around 9 PM', 1499.95, 'confirmed'),
(2, 'Jane', 'Smith', 'jane@example.com', '2025-05-12', '2025-05-14', 2, 'Allergic to feather pillows', 399.98, 'pending'),
(3, 'Michael', 'Johnson', 'michael@example.com', '2025-05-20', '2025-05-25', 3, 'Need extra bed for child', 1249.95, 'confirmed'),
(4, 'Emily', 'Williams', 'emily@example.com', '2025-06-01', '2025-06-03', 2, NULL, 319.98, 'confirmed'),
(5, 'Robert', 'Brown', 'robert@example.com', '2025-06-15', '2025-06-20', 2, 'Celebrating anniversary - any special touches appreciated', 1749.95, 'pending');

-- Add Row Level Security (RLS)
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to rooms
CREATE POLICY "Allow public read access to rooms"
  ON public.rooms
  FOR SELECT
  USING (true);

-- Create policy to allow public insert access to bookings
CREATE POLICY "Allow public insert access to bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow admins full access to bookings
CREATE POLICY "Allow admin full access to bookings"
  ON public.bookings
  USING (true);
