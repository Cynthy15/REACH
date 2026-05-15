import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">404 - Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-brand-blue text-white hover:bg-brand-darkblue h-12 px-8 rounded-xl shadow-lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  )
}
