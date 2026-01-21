import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Inksesh
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Artists</Button>
          </Link>
          <Link href="/booking">
            <Button>Book Appointment</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

