import { z } from 'zod'

export const bookingSchema = z.object({
  artistId: z.string().min(1, 'Please select an artist'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().min(10, 'Please enter a valid phone number'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  message: z.string().optional(),
}).refine(
  (data) => {
    const selectedDate = new Date(data.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  },
  {
    message: 'Please select a future date',
    path: ['preferredDate'],
  }
)

export type BookingFormInput = z.infer<typeof bookingSchema>

