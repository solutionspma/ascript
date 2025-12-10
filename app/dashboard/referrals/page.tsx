import { Users, Search, Filter, Plus, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ReferralsPage() {
  // Demo data
  const referrals = [
    {
      id: '1',
      patientName: 'John Smith',
      age: 45,
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      location: 'Los Angeles, CA',
      status: 'pending',
      date: '2025-12-08',
      provider: 'Dr. Sarah Johnson',
      specialty: 'Cardiology'
    },
    {
      id: '2',
      patientName: 'Mary Williams',
      age: 62,
      phone: '(555) 234-5678',
      email: 'mary.w@email.com',
      location: 'San Diego, CA',
      status: 'contacted',
      date: '2025-12-07',
      provider: 'Dr. Michael Chen',
      specialty: 'Orthopedics'
    },
    {
      id: '3',
      patientName: 'Robert Davis',
      age: 38,
      phone: '(555) 345-6789',
      email: 'r.davis@email.com',
      location: 'Orange County, CA',
      status: 'completed',
      date: '2025-12-05',
      provider: 'Dr. Emily Rodriguez',
      specialty: 'Primary Care'
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Referrals</h1>
            <p className="text-slate-600">Manage and track your patient referrals</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
            <Plus size={20} />
            New Referral
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by patient name, email, or phone..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="px-6 py-3 border-2 border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-2 font-medium">
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm mb-1">Total Referrals</div>
              <div className="text-3xl font-bold text-slate-900">{referrals.length}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm mb-1">Pending</div>
              <div className="text-3xl font-bold text-yellow-600">1</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-600 text-sm mb-1">Completed</div>
              <div className="text-3xl font-bold text-green-600">1</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Patient</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Provider</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {referrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{referral.patientName}</div>
                    <div className="text-sm text-slate-600">Age {referral.age}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} />
                        {referral.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} />
                        {referral.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} />
                        {referral.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{referral.provider}</div>
                    <div className="text-sm text-slate-600">{referral.specialty}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{referral.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(referral.status)}`}>
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
