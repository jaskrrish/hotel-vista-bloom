
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number
          room_id: number
          first_name: string
          last_name: string
          email: string
          check_in: string
          check_out: string
          guests: number
          special_requests: string | null
          total_price: number
          status: string
          created_at: string | null
        }
        Insert: {
          id?: number
          room_id: number
          first_name: string
          last_name: string
          email: string
          check_in: string
          check_out: string
          guests: number
          special_requests?: string | null
          total_price: number
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: number
          room_id?: number
          first_name?: string
          last_name?: string
          email?: string
          check_in?: string
          check_out?: string
          guests?: number
          special_requests?: string | null
          total_price?: number
          status?: string
          created_at?: string | null
        }
      }
      rooms: {
        Row: {
          id: number
          name: string
          type: string
          description: string
          price: number
          capacity: number
          size: number
          image: string
          availability: boolean
          amenities: string[]
        }
        Insert: {
          id?: number
          name: string
          type: string
          description: string
          price: number
          capacity: number
          size: number
          image: string
          availability?: boolean
          amenities?: string[]
        }
        Update: {
          id?: number
          name?: string
          type?: string
          description?: string
          price?: number
          capacity?: number
          size?: number
          image?: string
          availability?: boolean
          amenities?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
