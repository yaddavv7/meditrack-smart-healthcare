import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  Building,
  Plus,
  X,
  Lock,
  ArrowRight
} from 'lucide-react';

export const MedicineAssistance = () => {
  const { assistanceData, submitAssistanceApplication, updateAssistanceStatus } = useData();
  const { currentUser, role, isAdmin, isProvider } = useAuth();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Application form fields
  const [medNeeded, setMedNeeded] = useState('');
  const [costEst, setCostEst] = useState('65');
  const [incomeTier, setIncomeTier] = useState('Below 150% Federal Poverty Level');
  const [urgency, setUrgency] = useState('standard');
  const [orgId, setOrgId] = useState('org_1');
  const [appNotes, setAppNotes] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Review fields for org/admin
  const [reviewGrantAmount, setReviewGrantAmount] = useState('65');
  const [reviewNotes, setReviewNotes] = useState('');

  const { organizations, requests } = assistanceData;

  // Patient's own requests vs all requests for admin
  const visibleRequests = isAdmin || isProvider
    ? requests
    : requests.filter(r => r.applicantId === currentUser?.id || r.applicantName === currentUser?.name);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!consentChecked) return;

    const targetOrg = organizations.find(o => o.id === orgId);

    submitAssistanceApplication({
      applicantId: currentUser?.id || 'usr_pat_1',
      applicantName: currentUser?.name || 'Sarah Jenkins',
      incomeTier,
      medicineName: medNeeded,
      estimatedCost: costEst,
      urgency,
      organizationId: orgId,
      organizationName: targetOrg?.name || 'Global Rx Relief Foundation',
      notes: appNotes
    });

    setApplySuccess(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplySuccess(false);
      setMedNeeded('');
      setAppNotes('');
      setConsentChecked(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Grant Approved</span>;
      case 'disbursed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Voucher Disbursed</span>;
      case 'info_requested':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">More Info Needed</span>;
      case 'rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">Not Approved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Under Review</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Social Impact Initiative</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Medicine Assistance Programme
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connecting eligible low-income patients and uninsured individuals with non-profit prescription grants.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Assistance</span>
        </button>
      </div>

      <DisclaimerBanner compact={true} />

      {/* Participating Organizations Shelf */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-purple-600" />
          <span>Verified Partner Non-Profit Charities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-slate-900">{org.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                    Verified NGO
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{org.mission}</p>
                <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                  <div><strong>Focus:</strong> {org.supportedCategories?.join(', ')}</div>
                  <div><strong>Contact:</strong> {org.contact}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Disbursed: <strong className="text-slate-900">{org.totalGrantsDisbursed}</strong></span>
                <span>{org.beneficiariesSupported} helped</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Applications Portal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Assistance Applications & Vouchers</span>
          </h2>
          <span className="text-xs text-slate-400">
            {visibleRequests.length} record(s) on file
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Applications list */}
          <div className="lg:col-span-2 space-y-3">
            {visibleRequests.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
                <HeartHandshake className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
                <p className="text-xs font-semibold text-slate-700">No active assistance applications</p>
                <p className="text-[11px] text-slate-400 mt-1">If you are facing financial hardship, submit an application above.</p>
              </div>
            ) : (
              visibleRequests.map((app) => {
                const isSelected = selectedApp?.id === app.id;

                return (
                  <div
                    key={app.id}
                    onClick={() => { setSelectedApp(app); setReviewGrantAmount(app.estimatedCost.toString()); }}
                    className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all space-y-3 ${
                      isSelected
                        ? 'border-purple-500 ring-2 ring-purple-100 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">{app.medicineName}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Applicant: <strong>{app.applicantName}</strong> • Tier: {app.incomeTier}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-purple-700">${app.estimatedCost.toFixed(2)}</span>
                        <div className="text-[10px] text-slate-400">Estimated Cost</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-purple-950">
                      <div>
                        Assigned Fund: <strong>{app.organizationName}</strong>
                      </div>
                      {app.voucherCode && (
                        <div className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          Voucher: {app.voucherCode}
                        </div>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {app.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-400">
                      <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                      <span className="text-purple-600 font-semibold flex items-center gap-1">
                        <span>Details & Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Details / Review Panel */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            {selectedApp ? (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application File</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{selectedApp.medicineName}</h3>
                  <div className="mt-1">{getStatusBadge(selectedApp.status)}</div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div><strong>Applicant:</strong> {selectedApp.applicantName}</div>
                  <div><strong>Hardship Bracket:</strong> {selectedApp.incomeTier}</div>
                  <div><strong>Assigned NGO:</strong> {selectedApp.organizationName}</div>
                  <div><strong>Requested Subsidy:</strong> ${selectedApp.estimatedCost.toFixed(2)}</div>
                  {selectedApp.voucherCode && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-mono">
                      <strong>Redemption Voucher:</strong><br />{selectedApp.voucherCode}
                    </div>
                  )}
                </div>

                {/* Review Control for Admin or Partner NGO */}
                {(isAdmin || isProvider) && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 pt-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Authorizing Officer Actions
                    </h4>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-700 font-semibold">Approved Grant ($)</label>
                      <input
                        type="number"
                        value={reviewGrantAmount}
                        onChange={(e) => setReviewGrantAmount(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-700 font-semibold">Decision Feedback Note</label>
                      <textarea
                        rows="2"
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add decision or additional requirement notes..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="flex gap-2 pt-1 text-xs">
                      <button
                        onClick={() => updateAssistanceStatus(selectedApp.id, 'approved', reviewGrantAmount, reviewNotes)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                      >
                        Approve Grant
                      </button>
                      <button
                        onClick={() => updateAssistanceStatus(selectedApp.id, 'info_requested', null, reviewNotes)}
                        className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl"
                      >
                        Request Info
                      </button>
                      <button
                        onClick={() => updateAssistanceStatus(selectedApp.id, 'rejected', null, reviewNotes)}
                        className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto stroke-1 opacity-50" />
                <p className="text-xs font-semibold text-slate-700">Select an application</p>
                <p className="text-[11px] text-slate-400">Click on any request to view details or manage disbursement.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Application Submission Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Medicine Assistance Application</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Application submitted securely! Partner committee will review within 48 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Prescribed Medicine Needed</label>
                  <input
                    type="text"
                    required
                    value={medNeeded}
                    onChange={(e) => setMedNeeded(e.target.value)}
                    placeholder="e.g., Insulin Glargine Pen (3-Month Supply)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Estimated Cost ($)</label>
                    <input
                      type="number"
                      required
                      value={costEst}
                      onChange={(e) => setCostEst(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Urgency</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    >
                      <option value="standard">Standard Review</option>
                      <option value="urgent">Urgent Need (&lt; 48h)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Household Income / Hardship Tier</label>
                  <select
                    value={incomeTier}
                    onChange={(e) => setIncomeTier(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    <option value="Below 150% Federal Poverty Level">Below 150% Federal Poverty Level</option>
                    <option value="Uninsured / No Rx Benefit">Uninsured / No Rx Drug Benefit</option>
                    <option value="Temporary Medical Hardship">Temporary Medical Hardship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Partner Non-Profit Charity</label>
                  <select
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    {organizations.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Personal Statement / Needs Context</label>
                  <textarea
                    rows="2"
                    value={appNotes}
                    onChange={(e) => setAppNotes(e.target.value)}
                    placeholder="Briefly state why assistance is requested..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                {/* Consent & Privacy Checkbox */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500 mt-0.5"
                    />
                    <label htmlFor="consent" className="cursor-pointer">
                      I consent to sharing this application details strictly with the selected non-profit intake committee for grant evaluation. I confirm that a licensed physician prescribed this medication.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!consentChecked}
                    className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl shadow-xs"
                  >
                    Submit Application
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
