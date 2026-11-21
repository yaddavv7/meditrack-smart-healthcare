import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  Search,
  Clock,
  Pill,
  Store,
  Building2,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bookmark,
  Calendar,
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    requests, 
    reminders, 
    pharmacies, 
    facilities, 
    savedPharmacyIds, 
    recordReminderAction 
  } = useData();

  const [dashboardSearch, setDashboardSearch] = useState('');

  // Patient's requests
  const userRequests = requests.filter(r => r.patientId === currentUser?.id || r.patientName === currentUser?.name);
  const activeRequests = userRequests.filter(r => r.status === 'pending' || r.status === 'confirmed' || r.status === 'ready_for_collection');

  // Today's active reminders
  const activeReminders = reminders.filter(r => r.isActive && (r.userId === currentUser?.id || !r.userId));

  // Saved pharmacies
  const savedPharmacies = pharmacies.filter(p => savedPharmacyIds.includes(p.id));

  // Status badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Confirmed Available</span>;
      case 'ready_for_collection':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Ready for Collection</span>;
      case 'unavailable':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Out of Stock</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">Fulfilled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Pending Pharmacy</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-emerald-700 to-mediblue-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patient Health Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name || 'Sarah Jenkins'}!
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Track your medicine requests, view real-time pharmacy confirmations, and manage your daily dosage schedules.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              to="/medicines"
              className="px-4 py-2 rounded-xl bg-white text-brand-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs"
            >
              Search New Medicine
            </Link>
            <Link
              to="/reminders"
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-sm border border-white/25 transition-colors"
            >
              Manage Reminders
            </Link>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <DisclaimerBanner compact={true} />

      {/* Quick Action Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/medicines"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-brand-600">Find Medicines</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Check verified stock & prices</p>
        </Link>

        <Link
          to="/requests"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600">Request Tracker</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{activeRequests.length} active confirmation(s)</p>
        </Link>

        <Link
          to="/reminders"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Pill className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-teal-600">Smart Reminders</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{activeReminders.length} scheduled medicine(s)</p>
        </Link>

        <Link
          to="/assistance"
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-sm transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-purple-600">Assistance Aid</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Non-profit grant subsidies</p>
        </Link>
      </div>

      {/* Main Grid: Active Requests & Upcoming Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Availability Requests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">Active Medicine Stock Requests</h2>
            </div>
            <Link to="/requests" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeRequests.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              <Clock className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="text-xs font-medium text-slate-600">No pending availability requests</p>
              <p className="text-[11px] text-slate-400 mt-1">Search for a medicine and submit a request to reserve stock.</p>
              <Link
                to="/medicines"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
              >
                <span>Find medicine now</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{req.medicineName}</h3>
                        {getStatusBadge(req.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {req.formulation} • Qty: {req.requestedQuantity}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Req #{req.id}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Store className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">{req.pharmacyName}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Updated: {new Date(req.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {req.pharmacistNotes && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
                      <strong>Pharmacist Note:</strong> {req.pharmacistNotes}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-slate-400">
                      Submitted on {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to="/requests"
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <span>Track Timeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved Pharmacies Quick Access */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-800">Saved Pharmacies</h3>
              </div>
              <Link to="/pharmacies" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                Explore on Map
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedPharmacies.slice(0, 2).map((phm) => (
                <div key={phm.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{phm.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{phm.address}</p>
                    </div>
                    {phm.isVerified && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span>{phm.phone}</span>
                    <Link to="/pharmacies" className="text-brand-600 font-semibold hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Today's Upcoming Reminders & Facilities */}
        <div className="space-y-6">
          
          {/* Reminders Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900">Today's Reminders</h3>
              </div>
              <Link to="/reminders" className="text-xs font-semibold text-brand-600 hover:underline">
                View All
              </Link>
            </div>

            {activeReminders.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No active reminders configured.</p>
            ) : (
              <div className="space-y-3">
                {activeReminders.slice(0, 3).map((rem) => (
                  <div key={rem.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{rem.medicineName}</div>
                        <div className="text-[11px] text-slate-500">{rem.dosage} • {rem.frequency}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-700">
                        {rem.timesOfDay[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        Streak: <strong className="text-brand-600">{rem.streakDays} days</strong>
                      </span>
                      <button
                        onClick={() => recordReminderAction(rem.id, 'taken')}
                        className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Take Dose</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-1">
              <Link
                to="/reminders"
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Schedule</span>
              </Link>
            </div>
          </div>

          {/* Nearby Healthcare Facilities Widget */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">Nearby Facilities</h3>
              </div>
              <Link to="/facilities" className="text-xs font-semibold text-brand-600 hover:underline">
                Explore
              </Link>
            </div>

            <div className="space-y-2.5">
              {facilities.slice(0, 2).map((fac) => (
                <div key={fac.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900 truncate">{fac.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-medium">
                      {fac.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{fac.address}</p>
                  <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                    <span>{fac.operatingHours}</span>
                    <span className="font-bold text-slate-700">{fac.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
