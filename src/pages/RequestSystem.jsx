import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Store,
  Send,
  Plus,
  X,
  FileText,
  User,
  Calendar,
  ChevronRight,
  Filter
} from 'lucide-react';

export const RequestSystem = () => {
  const { requests, pharmacies, medicines, submitAvailabilityRequest, updateRequestStatus } = useData();
  const { currentUser, role, isPharmacist, isAdmin } = useAuth();

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // New Request Form states
  const [newMedId, setNewMedId] = useState(medicines[0]?.id || '');
  const [newPhmId, setNewPhmId] = useState(pharmacies[0]?.id || '');
  const [newQty, setNewQty] = useState(1);
  const [newNotes, setNewNotes] = useState('');
  const [newUrgency, setNewUrgency] = useState('standard');

  // Status update modal for pharmacist
  const [statusUpdateNotes, setStatusUpdateNotes] = useState('');

  // Filter requests based on role
  const userRequests = requests.filter(r => {
    if (isAdmin) return true;
    if (isPharmacist) return r.pharmacyId === currentUser?.pharmacyId || r.pharmacyName.includes("Vance");
    return r.patientId === currentUser?.id || r.patientName === currentUser?.name;
  });

  const filteredRequests = userRequests.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const handleCreateRequest = (e) => {
    e.preventDefault();
    submitAvailabilityRequest({
      patientId: currentUser?.id || 'usr_pat_1',
      patientName: currentUser?.name || 'Sarah Jenkins',
      patientPhone: currentUser?.phone || '+1 (555) 234-5678',
      pharmacyId: newPhmId,
      medicineId: newMedId,
      requestedQuantity: newQty,
      patientNotes: newNotes,
      urgency: newUrgency
    });

    setShowNewModal(false);
    setNewNotes('');
    setNewQty(1);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Confirmed Available</span>;
      case 'ready_for_collection':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Ready for Collection</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Completed & Fulfilled</span>;
      case 'unavailable':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">Unavailable / Out of Stock</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Pending Review</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            <span>Direct Coordination Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Medicine Availability Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time stock reservation and pharmacy confirmation with live lifecycle timestamps.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Stock Request</span>
        </button>
      </div>

      <DisclaimerBanner compact={true} />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 text-xs font-semibold">
        {[
          { id: 'all', label: 'All Requests' },
          { id: 'pending', label: 'Pending Review' },
          { id: 'confirmed', label: 'Confirmed Available' },
          { id: 'ready_for_collection', label: 'Ready for Collection' },
          { id: 'unavailable', label: 'Unavailable' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === tab.id
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-2">
              <Clock className="w-10 h-10 mx-auto stroke-1 opacity-50" />
              <p className="text-xs font-bold text-slate-700">No requests found in this view</p>
              <p className="text-[11px] text-slate-400">Submit a request to confirm medicine availability before heading out.</p>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-brand-500 ring-2 ring-brand-100 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{req.medicineName}</h3>
                        {getStatusBadge(req.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {req.formulation} • Quantity: <strong>{req.requestedQuantity}</strong>
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      #{req.id}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Store className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold">{req.pharmacyName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <User className="w-3.5 h-3.5" />
                      <span>{req.patientName}</span>
                    </div>
                  </div>

                  {req.patientNotes && (
                    <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                      "{req.patientNotes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-400">
                    <span>Submitted: {new Date(req.createdAt).toLocaleDateString()}</span>
                    <span className="text-brand-600 font-bold flex items-center gap-1">
                      <span>View Timeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Request Timeline Details Panel */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          {selectedRequest ? (
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Request Lifecycle Details</span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{selectedRequest.medicineName}</h3>
                <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
              </div>

              {/* Pharmacy Action Box (For Pharmacist or Demo Testing) */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2.5">
                <div className="text-xs font-bold text-blue-900 flex items-center justify-between">
                  <span>Pharmacist Status Control</span>
                  <span className="text-[10px] text-blue-600 font-normal">Active Action Bar</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'confirmed', 'Stock verified on dispensary shelf.')}
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                  >
                    Confirm Available
                  </button>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'ready_for_collection', 'Packaged with prescription label.')}
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                  >
                    Ready for Pickup
                  </button>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'completed', 'Collected and signed for.')}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-semibold transition-colors"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'unavailable', 'Currently depleted at wholesale distributor.')}
                    className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
                  >
                    Report Out of Stock
                  </button>
                </div>
              </div>

              {/* Timeline Stepper */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Audit Timeline</h4>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedRequest.timeline?.map((step, idx) => (
                    <div key={idx} className="relative space-y-0.5 text-xs">
                      <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-brand-50" />
                      <div className="font-bold text-slate-900 capitalize">{step.status.replace(/_/g, ' ')}</div>
                      <p className="text-slate-600 text-[11px]">{step.message}</p>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Clock className="w-8 h-8 mx-auto stroke-1 opacity-50" />
              <p className="text-xs font-semibold text-slate-700">Select a request</p>
              <p className="text-[11px] text-slate-400">Click on any request from the list to inspect its verified timeline.</p>
            </div>
          )}
        </div>

      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">New Medicine Availability Request</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Select Medicine</label>
                <select
                  value={newMedId}
                  onChange={(e) => setNewMedId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {medicines.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.strength} {m.formulation})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Target Pharmacy</label>
                <select
                  value={newPhmId}
                  onChange={(e) => setNewPhmId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {pharmacies.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.address})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Requested Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Urgency Level</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    <option value="standard">Standard (Next 24h)</option>
                    <option value="urgent">Urgent (Immediate)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Prescription Instructions / Notes</label>
                <textarea
                  rows="2"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Need by 3 PM. Doctor prescribed 1 tablet daily."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
