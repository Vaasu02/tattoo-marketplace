'use client'

import { useState, useEffect } from 'react'
import { ArtistCard } from '@/components/ArtistCard'
import { ArtistSearch } from '@/components/ArtistSearch'
import type { Artist } from '@/types'

interface ArtistsListProps {
  artists: Artist[]
}

export function ArtistsList({ artists }: ArtistsListProps) {
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists)

  useEffect(() => {
    setFilteredArtists(artists)
  }, [artists])

  return (
    <>
      <ArtistSearch artists={artists} onFilterChange={setFilteredArtists} />

      {filteredArtists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-muted-foreground">
            No artists match your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </>
  )
}

