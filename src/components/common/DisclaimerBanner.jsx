import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner = ({ compact = false, className = "" }) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Important Healthcare Notice:</strong> MediTrack is an availability discovery platform, not a medical diagnosis tool. Do not substitute medicines without consulting a doctor or pharmacist.
        </span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm text-amber-950 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-700 flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-amber-900">Healthcare Access & Safety Advisory</h4>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-200/70 text-amber-800">Safety Protocol</span>
          </div>
          <p className="text-amber-800/90 leading-relaxed">
            MediTrack helps patients locate medicines and verify stock with licensed pharmacies. <strong>MediTrack never prescribes medications, recommends changing dosages, or claims clinical equivalence.</strong> All medicine substitutions and prescriptions must be confirmed by a licensed medical practitioner or pharmacist.
          </p>
        </div>
      </div>
    </div>
  );
};
