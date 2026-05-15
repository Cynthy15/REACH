"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, FileText, Activity, PhoneCall, Mail } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RealTimeTracker() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  const steps = [
    { title: "Application Submitted", description: "Your data securely reached BRD.", completed: true, date: "Oct 24, 10:00 AM" },
    { title: "RRA & RDB Verification", description: "Automated check of tax and registration history.", completed: true, date: "Oct 24, 10:05 AM" },
    { title: "Algorithmic Assessment", description: "Credit engine calculating eligibility score. You are here.", active: true, date: "In Progress" },
    { title: "Human Review", description: "BRD Analyst final confirmation.", completed: false, date: "Pending" },
    { title: "Final Decision", description: "Receive official outcome and next steps.", completed: false, date: "Pending" },
  ]

  return (
    <div className="flex-1 w-full p-4 md:p-8 lg:p-12 mb-20 max-w-7xl mx-auto space-y-8">
      
      {/* Header Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl tracking-tight font-bold text-slate-900 mb-2">Application Tracker</h1>
          <p className="text-slate-500">Track your REACH application progress in real time.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 font-medium">Application ID</p>
          <p className="text-xl font-mono font-bold text-brand-blue tracking-wider">APP-8842-KT</p>
        </div>
      </div>

      {/* 4 Key Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Activity, title: "Current Status", value: "Under Assessment", color: "text-brand-warning", bg: "bg-brand-warning/10" },
          { icon: Clock, title: "Time Elapsed", value: "2h 15m", color: "text-brand-blue", bg: "bg-brand-lightblue" },
          { icon: FileText, title: "Documentation", value: "Zero Paperwork", color: "text-brand-success", bg: "bg-brand-success/10" },
          { icon: CheckCircle2, title: "Est. Decision", value: "Today, 4 PM", color: "text-brand-blue", bg: "bg-brand-lightblue" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-slate-200 rounded-2xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue to-emerald-400" />
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Progress Timeline</CardTitle>
              <CardDescription>Live updates synchronized with BRD assessment team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 pb-4">
                {steps.map((step, index) => (
                  <div key={index} className="mb-10 ml-8 relative">
                    <span className="absolute -left-10 md:-left-12 flex h-5 w-5 items-center justify-center">
                      {step.completed ? (
                        <span className="h-8 w-8 rounded-full bg-brand-success/20 flex items-center justify-center ring-8 ring-white z-10">
                          <CheckCircle2 className="h-5 w-5 text-brand-success" />
                        </span>
                      ) : step.active ? (
                        <span className="relative flex h-6 w-6 ring-8 ring-white z-10">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-6 w-6 bg-brand-blue border-[4px] border-white shadow-sm"></span>
                        </span>
                      ) : (
                        <span className="h-4 w-4 rounded-full bg-slate-200 ring-8 ring-white z-10" />
                      )}
                    </span>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-4 -mt-1.5">
                      <div className="flex-1">
                        <h3 className={`text-base font-semibold ${step.active ? 'text-brand-blue' : step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </h3>
                        <p className="text-slate-500 mt-1 max-w-md">{step.description}</p>
                      </div>
                      <time className={`text-xs font-medium px-2 py-1 rounded bg-slate-50 text-slate-500 whitespace-nowrap mt-2 md:mt-0 ${step.active && 'bg-brand-lightblue text-brand-blue'}`}>
                        {step.date}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-brand-blue text-white shadow-xl rounded-2xl border-0 overflow-hidden relative">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <CardHeader>
              <CardTitle className="text-white text-lg">What&#39;s happening now?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-lightblue/90 leading-relaxed text-sm">
                Our Credit Engine is currently analyzing your tax records and generating a preliminary Eligibility Score based on revenue consistency and operational history.
              </p>
              <div className="mt-6 flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium">System fully operational</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Need Assistance?</CardTitle>
              <CardDescription>Our BRD support team is here to help.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="bg-brand-lightblue dark p-2 rounded-lg text-brand-blue">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Call Toll-Free</p>
                  <p className="text-sm text-slate-500">3230</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="bg-brand-lightblue dark p-2 rounded-lg text-brand-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email Support</p>
                  <p className="text-sm text-slate-500">reach@brd.rw</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
