import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Skeleton className="mb-2 h-8 w-72" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border bg-card">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


