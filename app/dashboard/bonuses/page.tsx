import { DollarSign, TrendingUp, Calendar, CheckCircle, Clock, Download } from 'lucide-react'

export default function BonusesPage() {
  const bonusStats = [
    { label: 'Total Earned', value: '$12,450', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Pending Payout', value: '$2,180', icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'This Month', value: '$3,420', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Paid Out', value: '$10,270', icon: CheckCircle, color: 'from-purple-500 to-indigo-500' },
  ]

  const transactions = [
    {
      id: '1',
      date: '2025-12-01',
      description: 'Bonus payout - November 2025',
      amount: '$1,850',
      status: 'completed',
      referrals: 12,
    },
    {
      id: '2',
      date: '2025-12-08',
      description: 'Weekly bonus - Week 49',
      amount: '$420',
      status: 'pending',
      referrals: 3,
    },
    {
      id: '3',
      date: '2025-11-15',
      description: 'Bonus payout - October 2025',
      amount: '$2,340',
      status: 'completed',
      referrals: 18,
    },
    {
      id: '4',
      date: '2025-11-01',
      description: 'Special referral bonus',
      amount: '$500',
      status: 'completed',
      referrals: 1,
    },
  ]

  const bonusBreakdown = [
    { type: 'Successful Referrals', count: 45, rate: '$150', total: '$6,750' },
    { type: 'Premium Conversions', count: 12, rate: '$300', total: '$3,600' },
    { type: 'Specialty Referrals', count: 8, rate: '$250', total: '$2,000' },
    { type: 'Performance Bonus', count: 1, rate: '$100', total: '$100' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Bonuses & Payouts</h1>
            <p className="text-slate-600">Track your earnings and manage payouts</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {bonusStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon size={28} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-slate-900">{transaction.description}</div>
                    <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                      <Calendar size={14} />
                      {transaction.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{transaction.amount}</div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {transaction.referrals} referral{transaction.referrals !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Earnings Breakdown</h2>
          <div className="space-y-4">
            {bonusBreakdown.map((item, idx) => (
              <div key={item.type} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-slate-900">{item.type}</div>
                  <div className="text-lg font-bold text-slate-900">{item.total}</div>
                </div>
                <div className="text-sm text-slate-600">
                  {item.count} × {item.rate} per referral
                </div>
                <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${(item.count / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Total Earnings</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                $12,450
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Information */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Next Payout</h3>
            <p className="text-blue-100 mb-4">Your pending bonuses will be processed on December 15, 2025</p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-blue-100">Pending Amount</div>
                <div className="text-3xl font-bold">$2,180</div>
              </div>
              <div>
                <div className="text-sm text-blue-100">Days Until Payout</div>
                <div className="text-3xl font-bold">6</div>
              </div>
            </div>
          </div>
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <DollarSign size={48} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
