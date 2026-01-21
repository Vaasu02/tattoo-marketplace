export interface Artist {
  id: string
  name: string
  bio: string | null
  portfolio: string[]
  location: string | null
  specialties: string[] | null
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  artist_id: string
  name: string
  contact: string
  preferred_date: string 
  preferred_time: string 
  message: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface BookingFormData {
  artistId: string
  name: string
  contact: string
  preferredDate: string
  preferredTime: string
  message?: string
}

