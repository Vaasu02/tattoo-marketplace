import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/Navigation'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
        <h1 className="mb-4 text-4xl font-bold">Artist Not Found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The artist you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/">
          <Button>Back to Artists</Button>
        </Link>
      </main>
    </div>
  )
}

