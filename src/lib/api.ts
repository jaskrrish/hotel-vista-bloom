
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// QueryClient for cache invalidation
export const queryClient = new QueryClient();

// Fetch all rooms
export const fetchRooms = async () => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*');
  
  if (error) throw new Error(error.message);
  return data;
};

// Fetch a single room by id
export const fetchRoomById = async (id: string) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error('Invalid room ID');
  }
  
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', numericId)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

// Fetch all bookings 
export const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms:room_id (
        name, 
        type
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data;
};

// Create a new booking
export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();
  
  if (error) throw new Error(error.message);
  return data;
};

// Update booking status
export const updateBookingStatus = async ({ id, status }: { id: number, status: string }) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select();
  
  if (error) throw new Error(error.message);
  return data;
};

// Custom hooks
export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => fetchRoomById(id),
    enabled: !!id,
  });
};

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('Booking successful! You will receive a confirmation email shortly.');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: Error) => {
      toast.error(`Booking failed: ${error.message}`);
    },
  });
};

export const useUpdateBookingStatus = () => {
  return useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      toast.success('Booking status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error: Error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });
};
