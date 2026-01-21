import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'
import type { Artist } from '@/types'

config({ path: resolve(process.cwd(), '.env.local') })

// Create Supabase client after loading env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const seedArtists: Omit<Artist, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Priya Sharma',
    bio: 'Specialized in minimalist and geometric tattoos. 5+ years of experience creating clean, meaningful designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
    ],
    location: 'Bangalore',
    specialties: ['Minimalist', 'Geometric', 'Linework'],
  },
  {
    name: 'Arjun Patel',
    bio: 'Master of traditional Indian and mandala designs. Bringing ancient art forms to modern tattoo culture.',
    portfolio: [
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
    ],
    location: 'Mumbai',
    specialties: ['Traditional', 'Mandala', 'Indian Art'],
  },
  {
    name: 'Maya Reddy',
    bio: 'Watercolor and abstract tattoo specialist. Known for vibrant colors and flowing designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
    ],
    location: 'Delhi',
    specialties: ['Watercolor', 'Abstract', 'Color Work'],
  },
  {
    name: 'Rohan Kumar',
    bio: 'Realism and portrait expert. Creating lifelike tattoos that capture every detail.',
    portfolio: [
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
    ],
    location: 'Pune',
    specialties: ['Realism', 'Portraits', 'Black & Gray'],
  },
  {
    name: 'Sneha Desai',
    bio: 'Fine line and delicate tattoo artist. Specializing in dainty, elegant designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&q=85',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85',
    ],
    location: 'Hyderabad',
    specialties: ['Fine Line', 'Delicate', 'Minimalist'],
  },
]

export async function seedArtistsData() {
  try {
    // Check if artists already exist
    const { data: existingArtists } = await supabase
      .from('artists')
      .select('id')
      .limit(1)

    if (existingArtists && existingArtists.length > 0) {
      console.log('Artists already seeded. Skipping...')
      return
    }

    // Insert artists
    const { data, error } = await supabase
      .from('artists')
      .insert(seedArtists)
      .select()

    if (error) {
      console.error('Error seeding artists:', error)
      throw error
    }

    console.log(`Successfully seeded ${data?.length || 0} artists`)
    return data
  } catch (error) {
    console.error('Failed to seed artists:', error)
    throw error
  }
}

if (require.main === module) {
  seedArtistsData()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
