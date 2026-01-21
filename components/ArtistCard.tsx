import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Artist } from '@/types'

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const firstImage = artist.portfolio && artist.portfolio.length > 0 
    ? artist.portfolio[0] 
    : 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80'

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={firstImage}
            alt={`${artist.name} portfolio`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{artist.name}</h3>
        {artist.location && (
          <p className="mb-3 text-sm text-muted-foreground">{artist.location}</p>
        )}
        {artist.bio && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {artist.bio}
          </p>
        )}
        {artist.specialties && artist.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {artist.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/artist/${artist.id}`} className="w-full">
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

