import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  BookOpen,
  Search,
  ShieldCheck,
  AlertTriangle,
  Info,
  Calendar,
  Thermometer,
  Layers,
  FileText,
  ExternalLink,
  Tag
} from 'lucide-react';

export const MedicineInfoCentre = () => {
  const { medicines } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDrug, setActiveDrug] = useState(medicines[0] || null);

  const categories = useMemo(() => {
    const list = Array.from(new Set(medicines.map(m => m.category)));
    return list;
  }, [medicines]);

  const filteredDrugs = useMemo(() => {
    return medicines.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.brandNames?.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [medicines, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Verified Drug Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Medicine Information Centre
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Access verified pharmaceutical reference monographs, storage instructions, and documented safety precautions.
        </p>

        <DisclaimerBanner compact={true} />
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by drug name, brand, or active substance..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 2-Column Split: Drug Directory List + Full Monograph Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Drug List */}
        <div className="lg:col-span-5 space-y-3 max-h-[650px] overflow-y-auto pr-1">
          {filteredDrugs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="text-xs font-bold text-slate-700">No matching medicine found</p>
              <p className="text-[11px] text-slate-400">Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredDrugs.map((med) => {
              const isSelected = activeDrug?.id === med.id;
              return (
                <div
                  key={med.id}
                  onClick={() => setActiveDrug(med)}
                  className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? 'border-brand-500 ring-2 ring-brand-100 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{med.name}</h3>
                    {med.isVerified ? (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 flex-shrink-0">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 flex-shrink-0">
                        Information not yet verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {med.genericName} • {med.strength} {med.formulation}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {med.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Monograph Detail Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {activeDrug ? (
            <div className="space-y-6">
              
              {/* Monograph Header */}
              <div className="pb-4 border-b border-slate-100 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    {activeDrug.category}
                  </span>
                  {activeDrug.isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Reference Monograph</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                      Information not yet verified
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">{activeDrug.name}</h2>
                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Active Substance (Generic):</strong> {activeDrug.genericName}</div>
                  <div><strong>Registered Brand Names:</strong> {activeDrug.brandNames?.join(', ') || 'N/A'}</div>
                  <div><strong>Standard Form & Strength:</strong> {activeDrug.strength} {activeDrug.formulation}</div>
                </div>
              </div>

              {/* Indications */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>General Clinical Indications</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {activeDrug.indications}
                </p>
              </div>

              {/* Common Usage & Administration */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Standard Administration Practices</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {activeDrug.commonUsage}
                </p>
              </div>

              {/* Storage Conditions */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-teal-600" />
                  <span>Storage & Temperature Requirements</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {activeDrug.storage}
                </p>
              </div>

              {/* Safety Warnings & Contraindications */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Critical Safety Warnings & Contraindications</span>
                </h4>
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs leading-relaxed">
                  {activeDrug.safetyWarnings}
                </div>
              </div>

              {/* Reference Source & Date */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Source: <strong>{activeDrug.source}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last Clinically Reviewed: {activeDrug.lastReviewed}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto stroke-1 opacity-50" />
              <p className="text-sm font-semibold text-slate-700">Select a medicine to view full monograph</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
