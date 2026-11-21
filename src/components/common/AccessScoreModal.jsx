import React from 'react';
import { X, Award, ShieldCheck, Clock, MapPin, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AccessScoreModal = ({ isOpen, onClose, accessScore, pharmacyName, medicineName }) => {
  if (!isOpen || !accessScore) return null;

  const { score, tier, breakdown } = accessScore;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-mediblue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Medicine Access Score</h3>
                  <p className="text-sm text-white/80">Transparent algorithmic evaluation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-white/80">Overall Rating</span>
                <div className="text-3xl font-extrabold flex items-baseline gap-2">
                  <span>{score}</span>
                  <span className="text-sm font-normal text-white/70">/ 100</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/25 border border-white/30 backdrop-blur-md">
                {tier}
              </span>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-5">
            <div className="text-xs text-slate-500 pb-2 border-b border-slate-100">
              Assessing <strong className="text-slate-800">{medicineName || 'Medicine'}</strong> at <strong className="text-slate-800">{pharmacyName || 'Pharmacy'}</strong>
            </div>

            {/* Pillar 1: Confirmation Freshness */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Availability Confirmation Freshness</span>
                </div>
                <span className="font-bold text-slate-900">{breakdown.freshness.points} / {breakdown.freshness.max} pts</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(breakdown.freshness.points / breakdown.freshness.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{breakdown.freshness.detail}</p>
            </div>

            {/* Pillar 2: Distance Proximity */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Geographic Proximity & Distance</span>
                </div>
                <span className="font-bold text-slate-900">{breakdown.distance.points} / {breakdown.distance.max} pts</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(breakdown.distance.points / breakdown.distance.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{breakdown.distance.detail}</p>
            </div>

            {/* Pillar 3: Listing Completeness */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Listing Completeness & Transparency</span>
                </div>
                <span className="font-bold text-slate-900">{breakdown.completeness.points} / {breakdown.completeness.max} pts</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(breakdown.completeness.points / breakdown.completeness.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{breakdown.completeness.detail}</p>
            </div>

            {/* Pillar 4: Pharmacy Verification */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Licensed Pharmacy Verification</span>
                </div>
                <span className="font-bold text-slate-900">{breakdown.verification.points} / {breakdown.verification.max} pts</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(breakdown.verification.points / breakdown.verification.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{breakdown.verification.detail}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                The <strong>Medicine Access Score</strong> provides transparent discovery signals so you can choose the most reliable pharmacy option without surprise shortages or stale information.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              Close Explanation
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
