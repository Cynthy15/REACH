'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import {
  Shield,
  Users,
  AlertTriangle,
  Database,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { rdbData, rraData, crbData } from '../../../lib/mockData';

const formatCurrency = (value: number) => `RWF ${value.toLocaleString()}`;

const totalBusinesses = rdbData.length;
const totalAnnualIncome = rraData.reduce((sum, record) => sum + record.Annual_Income, 0);
const compliantTaxCount = rraData.filter((record) => record.Tax_Compliance_Status === 'Compliant').length;
const activeLoans = crbData.filter((record) => record.Has_Loan === 'Yes').length;
const paidLoans = crbData.filter((record) => record.Loan_Status === 'Paid').length;
const ongoingLoans = crbData.filter((record) => record.Loan_Status === 'Ongoing').length;
const defaultedLoans = crbData.filter((record) => record.Loan_Status === 'Defaulted').length;

const systemStats = [
  { label: 'Registered Businesses', value: totalBusinesses.toString(), icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', change: '+4% since last month' },
  { label: 'Annual Revenue', value: formatCurrency(totalAnnualIncome), icon: Database, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', change: '+18% year over year' },
  { label: 'Tax Compliant', value: `${compliantTaxCount}/${rraData.length}`, icon: Shield, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', change: 'Stable compliance' },
  { label: 'Active Loans', value: activeLoans.toString(), icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', change: `${ongoingLoans} ongoing` },
];

const userActivityData = rdbData.slice(0, 7).map((record, index) => ({
  name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
  active: Math.max(850, Math.round((rraData.find((item) => item.Business_ID === record.Business_ID)?.Monthly_Income ?? 300000) / 250)),
  new: Math.max(18, Math.round((rraData.find((item) => item.Business_ID === record.Business_ID)?.Monthly_Income ?? 300000) / 2000)),
}));

const systemHealthData = [
  { name: 'Paid', value: paidLoans, color: '#10b981' },
  { name: 'Ongoing', value: ongoingLoans, color: '#f59e0b' },
  { name: 'Defaulted', value: defaultedLoans, color: '#ef4444' },
];

const recentAlerts = [
  { id: 1, type: 'warning', title: 'New business registration', description: 'Turbo Delivery App submitted its profile for review.', time: '15 minutes ago' },
  { id: 2, type: 'info', title: 'Tax compliance update', description: 'KigaliCode Solutions updated to compliant status.', time: '1 hour ago' },
  { id: 3, type: 'critical', title: 'Defaulted loan flagged', description: 'Akagera Safari Lodges missed a payment and is now defaulted.', time: '2 hours ago' },
];

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('systemAdminAuth');
    if (!authData) {
      router.push('/admin/login');
      return;
    }
  }, [router]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">Welcome back, System Admin</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors">Here's what's happening with your system today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-sm font-medium hover:bg-emerald-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition-colors">
            View Logs
          </button>
          <button className="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-none transition-colors">
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-colors`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors">
                <ArrowUpRight size={14} className="mr-0.5" /> 4%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white transition-colors">{stat.value}</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-2 transition-colors">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white transition-colors">User Activity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Weekly active users and new registrations</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderRadius: '16px', border: '1px solid #3f3f46', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', color: '#fff' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="active" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="new" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
          <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white transition-colors">System Health</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {systemHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {systemHealthData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white transition-colors">Recent Alerts</h3>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium transition-colors">View All</button>
        </div>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800 last:border-0 transition-colors">
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                alert.type === 'critical' ? 'bg-red-600 dark:bg-red-500' : alert.type === 'warning' ? 'bg-amber-600 dark:bg-amber-500' : 'bg-blue-600 dark:bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white transition-colors">{alert.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{alert.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 transition-colors">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}