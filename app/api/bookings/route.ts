import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { bookingSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validationResult = bookingSchema.safeParse({
      artistId: body.artist_id,
      name: body.name,
      contact: body.contact,
      preferredDate: body.preferred_date,
      preferredTime: body.preferred_time,
      message: body.message,
    })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    // Additional server-side validation
    const selectedDate = new Date(body.preferred_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Please select a future date' },
        { status: 400 }
      )
    }

    // Check if artist exists
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .select('id')
      .eq('id', body.artist_id)
      .single()

    if (artistError || !artist) {
      return NextResponse.json(
        { error: 'Invalid artist selected' },
        { status: 400 }
      )
    }

    // Insert booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        artist_id: body.artist_id,
        name: body.name.trim(),
        contact: body.contact.trim(),
        preferred_date: body.preferred_date,
        preferred_time: body.preferred_time,
        message: body.message?.trim() || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create booking. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        booking: data,
        message: 'Booking request submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET handler for fetching bookings (can be restricted later)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, artists(name)')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings: data }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

