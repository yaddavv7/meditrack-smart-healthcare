import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  ShieldAlert,
  Users,
  Store,
  Stethoscope,
  Pill,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Search,
  Activity,
  FileCheck,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export const AdminDashboard = () => {
  const { 
    pharmacies, 
    medicines, 
    requests, 
    facilities, 
    usersList, 
    systemLogs, 
    updatePharmacyVerification, 
    toggleUserStatus 
  } = useData();

  const { currentUser, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications', 'users', 'logs'
  const [userSearch, setUserSearch] = useState('');

  // Unverified pharmacies queue
  const pendingPharmacies = pharmacies.filter(p => !p.isVerified);
  const verifiedPharmacies = pharmacies.filter(p => p.isVerified);

  // Platform Growth Chart Data
  const platformGrowthData = [
    { month: 'Jun', users: 120, requests: 45 },
    { month: 'Jul', users: 240, requests: 98 },
    { month: 'Aug', users: 380, requests: 160 },
    { month: 'Sep', users: 510, requests: 220 },
    { month: 'Oct', users: 690, requests: 310 },
    { month: 'Nov', users: 840, requests: 420 },
  ];

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-widest">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Governance & Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Supervise pharmacy license verifications, user moderation, system logs, and network integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            Protected Admin Route
          </span>
        </div>
      </div>

      <DisclaimerBanner compact={true} />

      {/* High-level Platform Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Total Users</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{usersList.length + 840}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">+18% this month</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Pharmacies</span>
            <Store className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{pharmacies.length}</div>
          <div className="text-[10px] text-slate-500">{verifiedPharmacies.length} Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Healthcare Facilities</span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{facilities.length}</div>
          <div className="text-[10px] text-slate-500">Clinics & Hospitals</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Pending Verifications</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{pendingPharmacies.length}</div>
          <div className="text-[10px] text-amber-700 font-semibold">Requires license review</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Stock Requests</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-600">{requests.length + 80}</div>
          <div className="text-[10px] text-slate-500">Lifetime volume</div>
        </div>

      </div>

      {/* Platform Analytics Chart */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Platform Growth & Request Volume</h3>
            <p className="text-xs text-slate-500">Month-over-month active users and availability inquiries</p>
          </div>
          <TrendingUp className="w-4 h-4 text-brand-600" />
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={platformGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip contentStyle={{ borderRadius: '0.75rem', fontSize: '12px', border: '1px solid #E2E8F0' }} />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2.5} name="Active Users" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="requests" stroke="#10B981" strokeWidth={2.5} name="Requests Completed" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-semibold max-w-md">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`flex-1 py-2 text-center rounded-xl transition-all ${
            activeTab === 'verifications' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          License Verifications ({pendingPharmacies.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2 text-center rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User Moderation
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex-1 py-2 text-center rounded-xl transition-all ${
            activeTab === 'logs' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          System Audit Logs
        </button>
      </div>

      {/* Tab 1: License Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Pharmacy & Provider Verification Queue</h3>
              <p className="text-xs text-slate-500">
                Review state licensing records before approving pharmacies for verified status badges.
              </p>
            </div>

            <div className="space-y-3">
              {pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-slate-900">{pharmacy.name}</strong>
                      {pharmacy.isVerified ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Approved Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pending License Review
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">
                      Address: {pharmacy.address} • Phone: {pharmacy.phone}
                    </p>
                    <p className="font-mono text-slate-500 text-[11px]">
                      Submitted License: <strong>{pharmacy.licenseNumber || 'RPH-PENDING-REV'}</strong>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!pharmacy.isVerified ? (
                      <button
                        onClick={() => updatePharmacyVerification(pharmacy.id, true)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Approve License</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updatePharmacyVerification(pharmacy.id, false)}
                        className="px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Revoke Verification</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Moderation */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">User Accounts & Access Control</h3>
              <p className="text-xs text-slate-500">Manage user statuses and prevent unauthorized privilege escalation</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user accounts..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.status === 'active' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Suspended
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(u.joinedAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                            u.status === 'active'
                              ? 'text-rose-600 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Audit Logs */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">System Activity Audit Trail</h3>
            <p className="text-xs text-slate-500">Immutable record of security verifications, grants, and stock updates</p>
          </div>

          <div className="space-y-2">
            {systemLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono text-[11px]">{log.action}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-200 text-slate-700">
                      by {log.user}
                    </span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
