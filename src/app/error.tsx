'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">⚠️</span>
      </div>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Something went wrong!</h2>
      <p className="text-slate-500 mb-8 max-w-md">An unexpected error occurred. Please try again or contact support.</p>
      <Button
        onClick={() => reset()}
        className="bg-brand-blue text-white hover:bg-brand-darkblue h-12 px-8 rounded-xl shadow-lg"
      >
        Try Again
      </Button>
    </div>
  )
}
