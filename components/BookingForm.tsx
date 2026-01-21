'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import type { Artist } from '@/types'

interface BookingFormProps {
  artists: Artist[]
  preselectedArtistId?: string
}

export function BookingForm({ artists, preselectedArtistId }: BookingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artistId: preselectedArtistId || '',
    },
  })

  const selectedArtistId = watch('artistId')

  useEffect(() => {
    if (preselectedArtistId) {
      setValue('artistId', preselectedArtistId)
    }
  }, [preselectedArtistId, setValue])

  const onSubmit = async (data: BookingFormInput) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artist_id: data.artistId,
          name: data.name,
          contact: data.contact,
          preferred_date: data.preferredDate,
          preferred_time: data.preferredTime,
          message: data.message || null,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        router.push('/?booking=success')
      }, 2000)
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit booking. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="rounded-lg border bg-green-50 p-6 text-center dark:bg-green-950">
        <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-green-100">
          Booking Request Submitted!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          We&apos;ll contact you soon to confirm your appointment.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Artist Selection */}
      <div className="space-y-2">
        <Label htmlFor="artistId">Select Artist *</Label>
        <Select
          value={selectedArtistId}
          onValueChange={(value) => setValue('artistId', value)}
        >
          <SelectTrigger id="artistId" className="w-full">
            <SelectValue placeholder="Choose an artist" />
          </SelectTrigger>
          <SelectContent>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={artist.id}>
                {artist.name}
                {artist.location && ` - ${artist.location}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.artistId && (
          <p className="text-sm text-destructive">{errors.artistId.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Your Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="space-y-2">
        <Label htmlFor="contact">Phone Number *</Label>
        <Input
          id="contact"
          type="tel"
          {...register('contact')}
          placeholder="Enter your phone number"
        />
        {errors.contact && (
          <p className="text-sm text-destructive">{errors.contact.message}</p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Date *</Label>
          <Input
            id="preferredDate"
            type="date"
            {...register('preferredDate')}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.preferredDate && (
            <p className="text-sm text-destructive">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Time *</Label>
          <Input
            id="preferredTime"
            type="time"
            {...register('preferredTime')}
          />
          {errors.preferredTime && (
            <p className="text-sm text-destructive">
              {errors.preferredTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your tattoo idea..."
          rows={4}
        />
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
      </Button>
    </form>
  )
}

