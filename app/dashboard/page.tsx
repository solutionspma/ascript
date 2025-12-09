import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { Users, TrendingUp, DollarSign, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const stats = [
    { label: 'Total Referrals', value: '0', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Today', value: '0', icon: Clock, color: 'bg-cyan-100 text-cyan-600' },
    { label: 'Conversion Rate', value: '0%', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Bonuses Paid', value: '$0', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your referral network today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Referrals</h2>
          <div className="text-center py-12 text-slate-500">
            No referrals yet. Start by adding your first referral!
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="font-medium text-slate-900">Add New Referral</div>
              <div className="text-sm text-slate-600">Submit a new patient referral</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="font-medium text-slate-900">View Analytics</div>
              <div className="text-sm text-slate-600">Check your performance metrics</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="font-medium text-slate-900">Manage Bonuses</div>
              <div className="text-sm text-slate-600">Review and process payouts</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
