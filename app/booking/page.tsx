import { supabase } from '@/lib/supabase'
import { BookingForm } from '@/components/BookingForm'
import { Navigation } from '@/components/Navigation'
import type { Artist } from '@/types'

async function getArtists(): Promise<Artist[]> {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('name', { ascending: true })

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

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ artistId?: string }>
}) {
  const artists = await getArtists()
  const { artistId } = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Book an Appointment
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to request a booking with your chosen artist
            </p>
          </div>

          {artists.length === 0 ? (
            <div className="rounded-lg border p-6 text-center">
              <p className="text-muted-foreground">
                No artists available. Please seed the database first.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <BookingForm artists={artists} preselectedArtistId={artistId} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

