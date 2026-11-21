import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Pill,
  HeartHandshake,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  Activity,
  Users,
  Store,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { medicines, pharmacies, requests } = useData();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/medicines');
    }
  };

  const quickSearchTags = ['Amoxicillin', 'Metformin', 'Insulin', 'Salbutamol', 'Atorvastatin'];

  const stats = [
    { label: 'Verified Pharmacies', value: `${pharmacies.length}+`, icon: Store },
    { label: 'Essential Medicines Listed', value: `${medicines.length}+`, icon: Pill },
    { label: 'Availability Requests Fulfilled', value: `${requests.length + 80}+`, icon: CheckCircle2 },
    { label: 'Verified Clinical Standards', value: '100%', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Safety Advisory Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <DisclaimerBanner compact={true} />
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Smart Medicine & Healthcare Access Platform</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Healthcare Access,{' '}
              <span className="bg-gradient-to-r from-brand-600 to-mediblue-600 bg-clip-text text-transparent">
                Made Simpler.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
              Find nearby pharmacies, check real-time medicine availability, track personal dosage schedules, and connect with non-profit assistance grants — without the uncertainty.
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto pt-2"
            >
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by medicine name, generic formula (e.g., Amoxicillin 500mg)..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border border-slate-300 shadow-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Search Stock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Popular:</span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/medicines?q=${encodeURIComponent(tag)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Quick Access Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
            
            <Link
              to="/medicines"
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                Medicine Discovery
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Smart matching with transparent Medicine Access Scores & prices.
              </p>
            </Link>

            <Link
              to="/pharmacies"
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Pharmacies & Map
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore nearby verified chemists with Leaflet OpenStreetMap navigation.
              </p>
            </Link>

            <Link
              to="/requests"
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                Availability Requests
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Request stock confirmation directly from pharmacy owners.
              </p>
            </Link>

            <Link
              to="/assistance"
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                Assistance Grants
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Social-impact co-pay and emergency vouchers with verified NGOs.
              </p>
            </Link>

          </div>

        </div>
      </section>

      {/* Platform Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-brand-600">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How MediTrack Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600">Transparent Coordination</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How MediTrack Works</h2>
          <p className="text-sm text-slate-600">
            A reliable 4-step workflow designed to eliminate wasted trips and bring certainty to medicine discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Search & Formulate</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your prescribed medicine name, brand, or generic molecule with exact formulation strength.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-mediblue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Assess Access Score</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View verified confirmation freshness, proximity in kilometers, listed prices, and pharmacy licenses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Request Confirmation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Send an availability confirmation request to the pharmacy before travelling to reserve stock.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Collect & Schedule</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick up confirmed medication and set personal dosage reminders to maintain treatment adherence.
            </p>
          </div>

        </div>
      </section>

      {/* Main Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Algorithmic Transparency</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Smart Availability Matching & Transparent Access Scoring
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic directory listings that show stale data, MediTrack's matching engine differentiates exact formulation matches from generic alternatives, and scores each pharmacy result based on recent confirmation freshness, distance, and licensed verification.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong>Confirmation Freshness Tracking:</strong> Distinguishes recently confirmed stock from stale inventory reports.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong>Explicit Formulation Safeguards:</strong> Never equates different strengths without professional confirmation warnings.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong>Medicine Assistance Grants:</strong> Social-impact mechanism to support underprivileged patients with critical prescriptions.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/medicines"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <span>Try Search & Matching Demo</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Preview Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">Live Matching Simulation</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Score: 95/100 • Optimal Access
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-white">Amoxicillin (Amoxil)</h4>
                  <p className="text-xs text-slate-400">500 mg Capsule • Antibiotics</p>
                </div>
                <span className="text-sm font-extrabold text-emerald-400">$14.50</span>
              </div>

              <div className="pt-2 text-xs text-slate-300 flex items-center justify-between border-t border-slate-700/60">
                <span>Vance Central Pharmacy & Care</span>
                <span className="text-emerald-400 font-semibold">1.2 km away</span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Confirmed 2 hours ago by Dr. Marcus Vance, PharmD</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Match Reason Explanation:</div>
              <p>• Exact formulation & strength match (500mg capsule)</p>
              <p>• Fresh confirmation within 6 hours (+35 pts)</p>
              <p>• Verified pharmacy state license RPH-94821-NY (+15 pts)</p>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-100/80 border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Our Healthcare Ethics & Safety Pledge</h3>
              <p className="text-xs text-slate-500">Protecting patients through verified coordination and non-diagnostic transparency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900">No Prescribing or Diagnosis</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                MediTrack never recommends changing medications, modifying dosage amounts, or bypassing medical consultation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900">Verified Pharmacy Credentials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every participating pharmacy owner is verified with state regulatory board licenses before receiving the Verified badge.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900">Data Privacy & Consent</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patient medicine requests and assistance applications are guarded with strict role-based access and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-emerald-600 to-mediblue-700 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to find your medicines with confidence?
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Join thousands of patients, pharmacists, and clinics building a more accessible and transparent healthcare network.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/medicines"
                className="px-6 py-3 rounded-xl bg-white text-brand-700 font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm"
              >
                Search Medicine Catalogue
              </Link>
              <Link
                to="/auth?mode=signup"
                className="px-6 py-3 rounded-xl bg-brand-700/60 hover:bg-brand-700 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                Create Free Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
