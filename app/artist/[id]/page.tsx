import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/Navigation'
import type { Artist } from '@/types'

async function getArtist(id: string): Promise<Artist | null> {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching artist:', error)
    return null
  }
}

export default async function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const artist = await getArtist(id)

  if (!artist) {
    notFound()
  }

  const portfolioImages = artist.portfolio && artist.portfolio.length > 0
    ? artist.portfolio
    : ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80']

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Artist Header */}
        <div className="mb-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight">
                {artist.name}
              </h1>
              {artist.location && (
                <p className="text-lg text-muted-foreground">
                  📍 {artist.location}
                </p>
              )}
            </div>
            <Link href={`/booking?artistId=${artist.id}`}>
              <Button size="lg">Book Appointment</Button>
            </Link>
          </div>

          {artist.specialties && artist.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artist.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Bio Section */}
        {artist.bio && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">About</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {artist.bio}
            </p>
          </div>
        )}

        {/* Portfolio Gallery */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold">Portfolio</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={imageUrl}
                  alt={`${artist.name} portfolio ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex justify-center">
          <Link href={`/booking?artistId=${artist.id}`}>
            <Button size="lg" className="px-8">
              Book Appointment with {artist.name}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

