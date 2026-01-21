import { supabase } from '@/lib/supabase'
import { ArtistCard } from '@/components/ArtistCard'
import { ArtistSearch } from '@/components/ArtistSearch'
import type { Artist } from '@/types'
import { Navigation } from '@/components/Navigation'
import { ArtistsList } from '@/components/ArtistsList'

async function getArtists(): Promise<Artist[]> {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching artists:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching artists:', error)
    return []
  }
}

export default async function Home() {
  const artists = await getArtists()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Find Your Perfect Tattoo Artist
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover talented artists and book your next tattoo session
          </p>
        </div>

        {artists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-muted-foreground">
              No artists found. Please seed the database.
            </p>
          </div>
        ) : (
          <ArtistsList artists={artists} />
        )}
      </main>
    </div>
  )
}
