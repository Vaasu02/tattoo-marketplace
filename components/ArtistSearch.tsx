'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import type { Artist } from '@/types'

interface ArtistSearchProps {
  artists: Artist[]
  onFilterChange: (filtered: Artist[]) => void
}

export function ArtistSearch({ artists, onFilterChange }: ArtistSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  // Get all unique specialties
  const specialties = Array.from(
    new Set(artists.flatMap((artist) => artist.specialties || []))
  )

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      searchQuery === '' ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      artist.specialties?.includes(selectedSpecialty)

    return matchesSearch && matchesSpecialty
  })

  useEffect(() => {
    onFilterChange(filteredArtists)
  }, [searchQuery, selectedSpecialty, artists, onFilterChange])

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Artists</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name, location, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Specialty Filter */}
        <div className="space-y-2">
          <Label htmlFor="specialty">Filter by Specialty</Label>
          <select
            id="specialty"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="all">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredArtists.length} of {artists.length} artists
      </p>
    </div>
  )
}

