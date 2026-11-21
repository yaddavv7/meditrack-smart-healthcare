import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, ShieldCheck, Heart, AlertTriangle, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Important Healthcare Safety Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-inner">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 flex-shrink-0 mt-0.5 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  Clinical & Legal Disclaimer
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-700 text-slate-300 font-semibold">
                  Not a Diagnostic Service
                </span>
              </div>
              <p className="leading-relaxed text-slate-400">
                MediTrack is a healthcare coordination and availability discovery platform. MediTrack does not diagnose conditions, prescribe medications, or recommend altering dosages. Medicine substitutions or alternatives must always be confirmed by a licensed physician or registered pharmacist. Never disregard professional medical advice based on digital information.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-mediblue-500 flex items-center justify-center text-white shadow-md">
                <Pill className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Medi<span className="text-brand-400">Track</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering patients with transparent pharmacy stock discovery, smart availability confirmation requests, medicine reminders, and social assistance grants.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Data Standards</span>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform Discovery</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/medicines" className="text-slate-400 hover:text-white transition-colors">
                  Medicine Catalogue Search
                </Link>
              </li>
              <li>
                <Link to="/pharmacies" className="text-slate-400 hover:text-white transition-colors">
                  Pharmacies & Live Map
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-slate-400 hover:text-white transition-colors">
                  Stock Confirmation Requests
                </Link>
              </li>
              <li>
                <Link to="/reminders" className="text-slate-400 hover:text-white transition-colors">
                  Smart Dosage Reminders
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-slate-400 hover:text-white transition-colors">
                  Hospitals & Diagnostic Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* Healthcare & Community */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Health & Impact</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/info" className="text-slate-400 hover:text-white transition-colors">
                  Verified Drug Information Centre
                </Link>
              </li>
              <li>
                <Link to="/assistance" className="text-slate-400 hover:text-white transition-colors">
                  Medicine Assistance Programme
                </Link>
              </li>
              <li>
                <Link to="/pharmacy-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Pharmacist Inventory Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                  Platform Moderation & Security
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup" className="text-slate-400 hover:text-white transition-colors">
                  Register Facility / Pharmacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Helplines</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Immediate Medical Emergency</span>
                </div>
                <p className="text-[11px] text-slate-300 font-semibold">Call 911 or visit the nearest ER</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Poison Help Line</span>
                </div>
                <p className="text-[11px] text-slate-300 font-semibold">1-800-222-1222 (24/7 Free & Confidential)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediTrack Platform. Developed for transparent healthcare accessibility.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Smart Health Infrastructure</span>
            </span>
            <span>•</span>
            <span>OpenStreetMap & Leaflet Enabled</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
