import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  AlertCircle,
  Stethoscope,
  Activity,
  Send,
  X,
  CheckCircle2,
  Bookmark,
  ExternalLink
} from 'lucide-react';

export const HealthcareFacilities = () => {
  const { facilities, savedFacilityIds, toggleSaveFacility } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  // Inquiry modal state
  const [inquiryFacility, setInquiryFacility] = useState(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryService, setInquiryService] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const filteredFacilities = useMemo(() => {
    return facilities.filter(f => {
      const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchType = typeFilter === 'all' || f.type.toLowerCase() === typeFilter.toLowerCase();
      const matchEmergency = emergencyOnly ? f.emergency : true;
      return matchSearch && matchType && matchEmergency;
    });
  }, [facilities, searchQuery, typeFilter, emergencyOnly]);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryFacility(null);
      setInquirySuccess(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>Healthcare Provider Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Facility Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Find verified hospitals, community clinics, imaging facilities, and diagnostic laboratories.
          </p>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by facility name, service (e.g. MRI, Ultrasound, Emergency), or district..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Facility Types</option>
            <option value="Hospital">Hospitals</option>
            <option value="Clinic">Outpatient Clinics</option>
            <option value="Diagnostic Centre">Diagnostic Centres</option>
            <option value="Urgent Care">Urgent Care</option>
          </select>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer px-2">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>24/7 Emergency Services Only</span>
          </label>
        </div>
      </div>

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredFacilities.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
            <Building2 className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
            <p className="text-xs font-bold text-slate-700">No healthcare facilities match your criteria</p>
            <p className="text-[11px] text-slate-400">Try broadening your search term or facility filters.</p>
          </div>
        ) : (
          filteredFacilities.map((fac) => {
            const isSaved = savedFacilityIds.includes(fac.id);

            return (
              <div
                key={fac.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Title, Badge, Bookmark */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900">{fac.name}</h3>
                        {fac.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" title="Verified Facility" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{fac.address}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        {fac.type}
                      </span>
                      <button
                        onClick={() => toggleSaveFacility(fac.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        title="Save Facility"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Operational & Contact info */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{fac.operatingHours}</span>
                      </div>
                      {fac.emergency && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{fac.phone}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{fac.contactEmail}</span>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Offered Clinical Services
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.services?.map((svc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={`https://www.openstreetmap.org/directions?to=${fac.lat}%2C${fac.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>View Map Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => {
                      setInquiryFacility(fac);
                      setInquiryService(fac.services[0] || '');
                      setInquirySuccess(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Service Inquiry</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Inquiry Modal */}
      {inquiryFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Send Healthcare Inquiry</h3>
                <p className="text-xs text-slate-500">Contact {inquiryFacility.name}</p>
              </div>
              <button onClick={() => setInquiryFacility(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Inquiry submitted! The facility administration will reach out via phone.</span>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Callback Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Requested Service</label>
                  <select
                    value={inquiryService}
                    onChange={(e) => setInquiryService(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    {inquiryFacility.services?.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Inquiry Question / Timing</label>
                  <textarea
                    rows="3"
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="e.g. Looking to inquire about scheduling an appointment or checking specialist availability."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryFacility(null)}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
