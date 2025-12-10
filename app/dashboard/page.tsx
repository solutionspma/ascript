import { Users, TrendingUp, DollarSign, Clock, Plus, BarChart3, Wallet } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = { name: 'Demo User' }

  const stats = [
    { label: 'Total Referrals', value: '0', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Active Today', value: '0', icon: Clock, gradient: 'from-violet-500 to-purple-500' },
    { label: 'Conversion Rate', value: '0%', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Bonuses Paid', value: '$0', icon: DollarSign, gradient: 'from-orange-500 to-pink-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header with Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session?.name}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Your healthcare referral network is ready to grow. Let's make an impact today.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon size={28} className="text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Referrals */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Referrals</h2>
            <Link href="/dashboard/referrals" className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users size={40} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No referrals yet</h3>
            <p className="text-slate-600 mb-6">Start growing your network by adding your first referral!</p>
            <Link href="/dashboard/referrals">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                <Plus size={20} className="inline mr-2" />
                Add First Referral
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/dashboard/referrals">
              <div className="group relative overflow-hidden px-6 py-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-gradient-to-r from-white to-blue-50 hover:to-blue-100 transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
                    <Plus size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Add New Referral</div>
                    <div className="text-sm text-slate-600">Submit a new patient referral</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/analytics">
              <div className="group relative overflow-hidden px-6 py-5 rounded-xl border-2 border-slate-200 hover:border-purple-500 bg-gradient-to-r from-white to-purple-50 hover:to-purple-100 transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-4">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">View Analytics</div>
                    <div className="text-sm text-slate-600">Check your performance metrics</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/bonuses">
              <div className="group relative overflow-hidden px-6 py-5 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-gradient-to-r from-white to-emerald-50 hover:to-emerald-100 transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-4">
                    <Wallet size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Manage Bonuses</div>
                    <div className="text-sm text-slate-600">Review and process payouts</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
