import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { rdbData, rraData, crbData, BusinessField } from '../../lib/mockData';

export const ApproverDashboard: React.FC<{ theme: 'light' | 'dark' | 'system' }> = ({ theme }) => {
  const totalApplications = rdbData.length;
  const approvedLoans = crbData.filter(c => c.Loan_Status === 'Paid').length;
  const rejectedLoans = crbData.filter(c => c.Loan_Status === 'Defaulted').length;
  const pendingReview = crbData.filter(c => c.Loan_Status === 'Ongoing').length;
  const averageCreditScore = Math.round(crbData.reduce((sum, record) => sum + record.Credit_Score, 0) / crbData.length);
  const totalAnnualIncome = rraData.reduce((sum, record) => sum + record.Annual_Income, 0);
  const complianceSummary = {
    compliant: rraData.filter((record) => record.Tax_Compliance_Status === 'Compliant').length,
    partial: rraData.filter((record) => record.Tax_Compliance_Status === 'Partial').length,
    nonCompliant: rraData.filter((record) => record.Tax_Compliance_Status === 'Non-compliant').length,
  };

  const stats = [
    { label: 'Total Applications', value: totalApplications.toString(), icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+12% from last month' },
    { label: 'Approved Loans', value: approvedLoans.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+5% from last month' },
    { label: 'Rejected Loans', value: rejectedLoans.toString(), icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', change: '-2% from last month' },
    { label: 'Pending Review', value: pendingReview.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', change: '8 high priority' },
  ];

  const fieldCounts: Record<BusinessField, number> = rdbData.reduce((acc, record) => {
    acc[record.Business_Field] = (acc[record.Business_Field] || 0) + 1;
    return acc;
  }, {} as Record<BusinessField, number>);

  const totalFields = Object.values(fieldCounts).reduce((sum, count) => sum + count, 0);
  const categoryData = Object.entries(fieldCounts).map(([field, count]) => ({
    name: field,
    total: Math.round((count / totalFields) * 100)
  }));

  const trendData = rdbData.slice(0, 7).map((record, index) => {
    const income = rraData.find((item) => item.Business_ID === record.Business_ID)?.Monthly_Income ?? 0;
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return {
      name: labels[index],
      value: Math.max(25, Math.round(income / 100000))
    };
  });

  const getCardClass = () => {
    if (theme === 'dark') return 'bg-zinc-900 border-zinc-800 text-white';
    if (theme === 'system') return 'bg-white border-zinc-300 text-zinc-950';
    return 'bg-white border-zinc-200 text-zinc-950';
  };

  const getTextColor = (level: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
    if (theme === 'dark') {
      return level === 'primary' ? 'text-white' : level === 'secondary' ? 'text-zinc-400' : 'text-zinc-500';
    }

    return level === 'primary' ? 'text-zinc-950' : level === 'secondary' ? 'text-zinc-600' : 'text-zinc-500';
  };

  const getChartColors = () => {
    if (theme === 'dark') {
      return {
        grid: '#374151',
        text: '#9ca3af',
        bar: '#10b981',
        area: '#10b981'
      };
    }

    if (theme === 'system') {
      return {
        grid: '#d1d5db',
        text: '#6b7280',
        bar: '#059669',
        area: '#059669'
      };
    }

    return {
      grid: '#e5e7eb',
      text: '#6b7280',
      bar: '#059669',
      area: '#059669'
    };
  };

  const chartColors = getChartColors();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">Welcome back, Alex</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here's what's happening with your loan applications today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-emerald-100 dark:border-zinc-700 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none transition-colors">
            Manage Reviews
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 ${getCardClass()} rounded-3xl shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-zinc-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center text-emerald-600 text-xs font-bold">
                <ArrowUpRight size={14} className="mr-0.5" /> 4%
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-sm ${getTextColor('secondary')} font-medium`}>{stat.label}</p>
              <h3 className={`text-3xl font-bold mt-1 ${getTextColor('primary')}`}>{stat.value}</h3>
              <p className={`text-[10px] ${getTextColor('tertiary')} mt-2`}>{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 ${getCardClass()} rounded-3xl shadow-sm`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className={`font-bold text-xl ${getTextColor('primary')}`}>Application Volume</h3>
              <p className={`text-sm ${getTextColor('secondary')}`}>Weekly trend based on recent business income data</p>
            </div>
            <div className={`flex items-center gap-2 p-1 ${theme === 'dark' ? 'bg-zinc-800' : theme === 'system' ? 'bg-zinc-200' : 'bg-emerald-50'} rounded-lg`}>
              <button className={`px-3 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-zinc-700' : 'bg-white'} shadow-sm rounded-md`}>Weekly</button>
              <button className={`px-3 py-1 text-xs font-semibold ${getTextColor('secondary')}`}>Monthly</button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.area} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColors.area} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 12 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#18181b' : '#fff',
                    borderRadius: '16px',
                    border: `1px solid ${chartColors.area}`,
                    boxShadow: `0 10px 15px -3px rgba(16, 185, 129, 0.1)`,
                    color: theme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <Area type="monotone" dataKey="value" stroke={chartColors.area} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 ${getCardClass()} rounded-3xl shadow-sm`}>
          <h3 className={`font-bold text-xl mb-6 ${getTextColor('primary')}`}>Loan Categories</h3>
          <div className="space-y-6">
            {categoryData.map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className={`font-medium ${getTextColor('secondary')}`}>{cat.name}</span>
                  <span className="font-bold text-emerald-600">{cat.total}%</span>
                </div>
                <div className={`h-2 ${theme === 'dark' ? 'bg-zinc-800' : theme === 'system' ? 'bg-zinc-200' : 'bg-emerald-50'} rounded-full overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.total}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-emerald-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-emerald-600 rounded-2xl relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 text-emerald-500 opacity-20 w-32 h-32 transform group-hover:scale-110 transition-transform" />
            <h4 className="text-white font-bold mb-1 relative z-10">Optimization Tip</h4>
            <p className="text-emerald-100 text-xs relative z-10">Average business income this week is RWF {Math.round(totalAnnualIncome / 12).toLocaleString()} per month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
