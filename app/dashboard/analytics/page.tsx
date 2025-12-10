import { TrendingUp, Users, DollarSign, Calendar, ArrowUp, ArrowDown } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Referrals', value: '127', change: '+12%', trend: 'up', icon: Users },
    { label: 'Conversion Rate', value: '68%', change: '+5%', trend: 'up', icon: TrendingUp },
    { label: 'Revenue Generated', value: '$45,280', change: '+18%', trend: 'up', icon: DollarSign },
    { label: 'Avg. Response Time', value: '2.4 hrs', change: '-15%', trend: 'up', icon: Calendar },
  ]

  const monthlyData = [
    { month: 'Jan', referrals: 15, conversions: 10 },
    { month: 'Feb', referrals: 22, conversions: 14 },
    { month: 'Mar', referrals: 18, conversions: 12 },
    { month: 'Apr', referrals: 28, conversions: 19 },
    { month: 'May', referrals: 35, conversions: 24 },
    { month: 'Jun', referrals: 42, conversions: 29 },
  ]

  const topProviders = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', referrals: 45, conversion: '72%' },
    { name: 'Dr. Michael Chen', specialty: 'Orthopedics', referrals: 38, conversion: '68%' },
    { name: 'Dr. Emily Rodriguez', specialty: 'Primary Care', referrals: 33, conversion: '65%' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-600">Track your referral network performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <metric.icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {metric.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
            <div className="text-sm text-slate-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Monthly Trend</h2>
          <div className="space-y-4">
            {monthlyData.map((data, idx) => (
              <div key={data.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{data.month}</span>
                  <div className="flex gap-4">
                    <span className="text-sm text-blue-600 font-semibold">{data.referrals} referrals</span>
                    <span className="text-sm text-green-600 font-semibold">{data.conversions} converted</span>
                  </div>
                </div>
                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${(data.referrals / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Providers */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Providers</h2>
          <div className="space-y-6">
            {topProviders.map((provider, idx) => (
              <div key={provider.name} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{provider.name}</div>
                  <div className="text-sm text-slate-600">{provider.specialty}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{provider.referrals}</div>
                  <div className="text-sm text-green-600">{provider.conversion}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Conversion Funnel</h2>
        <div className="space-y-4">
          {[
            { stage: 'Referrals Submitted', count: 127, percentage: 100, color: 'from-blue-500 to-cyan-500' },
            { stage: 'Patients Contacted', count: 104, percentage: 82, color: 'from-indigo-500 to-blue-500' },
            { stage: 'Appointments Scheduled', count: 89, percentage: 70, color: 'from-purple-500 to-indigo-500' },
            { stage: 'Appointments Completed', count: 86, percentage: 68, color: 'from-green-500 to-emerald-500' },
          ].map((stage) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900">{stage.stage}</span>
                <span className="text-sm text-slate-600">{stage.count} ({stage.percentage}%)</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div 
                  className={`absolute h-full bg-gradient-to-r ${stage.color} rounded-lg flex items-center justify-center text-white font-semibold text-sm`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  {stage.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
