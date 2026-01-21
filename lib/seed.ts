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
      'https://images.unsplash.com/photo-1485463598028-44d6c47bf23f?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1542727365-19732a80dcfd?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=747&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Bangalore',
    specialties: ['Minimalist', 'Geometric', 'Linework'],
  },
  {
    name: 'Arjun Patel',
    bio: 'Master of traditional Indian and mandala designs. Bringing ancient art forms to modern tattoo culture.',
    portfolio: [
      'https://images.unsplash.com/photo-1628802634987-56dcd0de35e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1562379825-415aea84ebcf?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1543244128-30d70d41e2a9?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1557130641-1b14718f096a?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1557130680-0f816eef4743?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Mumbai',
    specialties: ['Traditional', 'Mandala', 'Indian Art'],
  },
  {
    name: 'Maya Reddy',
    bio: 'Watercolor and abstract tattoo specialist. Known for vibrant colors and flowing designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1635425542915-6da07160887c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1614769842925-8193ebda68b5?q=80&w=827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1547754145-ef9ff306e3f3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Delhi',
    specialties: ['Watercolor', 'Abstract', 'Color Work'],
  },
  {
    name: 'Rohan Kumar',
    bio: 'Realism and portrait expert. Creating lifelike tattoos that capture every detail.',
    portfolio: [
      'https://images.unsplash.com/photo-1665085326519-e53effa90953?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1620705921541-5b276d7dcdd9?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1523264165578-20bfb5da52b5?q=80&w=658&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Pune',
    specialties: ['Realism', 'Portraits', 'Black & Gray'],
  },
  {
    name: 'Sneha Desai',
    bio: 'Fine line and delicate tattoo artist. Specializing in dainty, elegant designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1704253801965-a5dffb1879a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603566431089-7f077f615682?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1570168983832-8989dae1522e?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Hyderabad',
    specialties: ['Fine Line', 'Delicate', 'Minimalist'],
  },
  {
    name: 'Roy Sharma',
    bio: 'Specialized in minimalist and geometric tattoos. 5+ years of experience creating clean, meaningful designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1482329033286-79a3d24413b4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1482375702222-03a768d5ea3c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1454329030972-00583f5f051f?q=80&w=1161&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1514466219469-a6a5c8525beb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    location: 'Tokyo',
    specialties: ['Delicate', 'Geometric', 'Linework'],
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
