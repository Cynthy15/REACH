"use client"

import { useState } from "react"
import { ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify-tin")
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-emerald-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-5xl rounded-[2rem] bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-emerald-600 p-10 text-white sm:p-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Secure sign in
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">Continue your loan application</h1>
            <p className="mt-4 text-base leading-7 text-emerald-100/90">
              Sign in with your business details to access your dashboard, view your eligibility, and complete your application with confidence.
            </p>
            <div className="mt-10 space-y-6">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm font-semibold text-white">Fast access</p>
                <p className="mt-2 text-sm text-emerald-100/80">One place for all your loan status updates and documents.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm font-semibold text-white">Verified data</p>
                <p className="mt-2 text-sm text-emerald-100/80">Your account connects your RDB and RRA information securely.</p>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700 font-semibold">Welcome back</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Sign in to your REACH account</h2>
              <p className="mt-3 text-sm text-slate-500">Use the information below to continue to your dashboard and application tools.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                <Input id="email" type="email" placeholder="hello@business.rw" className="h-12 border-slate-200 focus-visible:ring-emerald-500" required />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" className="h-12 border-slate-200 focus-visible:ring-emerald-500" required />
              </div>
              <Button type="submit" className="w-full h-14 bg-brand-blue text-white hover:bg-brand-darkblue shadow-lg shadow-brand-blue/20">
                {isLoading ? "Signing in..." : "Continue to Dashboard"}
              </Button>
            </form>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-emerald-50 p-5 text-sm text-slate-600">
              Your loan progress and all dashboard tools will be available after signing in.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
