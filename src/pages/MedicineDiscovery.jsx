import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { matchMedicines } from '../utils/matching';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { AccessScoreModal } from '../components/common/AccessScoreModal';
import {
  Search,
  Filter,
  Pill,
  Store,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronDown,
  ArrowUpDown,
  Send,
  X,
  Sparkles
} from 'lucide-react';

export const MedicineDiscovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { medicines, inventory, pharmacies, submitAvailabilityRequest } = useData();
  const { currentUser, isPatient } = useAuth();
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(100);
  const [maxDistance, setMaxDistance] = useState(15);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('access_score'); // 'access_score', 'price_low', 'distance', 'freshness'

  // Modal states
  const [selectedScoreItem, setSelectedScoreItem] = useState(null);
  const [requestModalItem, setRequestModalItem] = useState(null);
  const [requestQty, setRequestQty] = useState(1);
  const [requestNotes, setRequestNotes] = useState('');
  const [requestSuccessMsg, setRequestSuccessMsg] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(medicines.map(m => m.category));
    return Array.from(set);
  }, [medicines]);

  // Execute Smart Availability Matching
  const matchedResults = useMemo(() => {
    return matchMedicines({
      medicines,
      inventory,
      pharmacies,
      query: searchQuery,
      filters: {
        status: statusFilter,
        category: categoryFilter,
        maxPrice,
        maxDistance,
        verifiedOnly,
        sortBy
      }
    });
  }, [medicines, inventory, pharmacies, searchQuery, statusFilter, categoryFilter, maxPrice, maxDistance, verifiedOnly, sortBy]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const handleOpenRequest = (item) => {
    setRequestModalItem(item);
    setRequestQty(1);
    setRequestNotes('');
    setRequestSuccessMsg('');
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!requestModalItem) return;

    submitAvailabilityRequest({
      patientId: currentUser?.id || 'usr_pat_1',
      patientName: currentUser?.name || 'Sarah Jenkins',
      patientPhone: currentUser?.phone || '+1 (555) 234-5678',
      pharmacyId: requestModalItem.pharmacy.id,
      medicineId: requestModalItem.medicine.id,
      requestedQuantity: requestQty,
      patientNotes: requestNotes,
      urgency: 'standard'
    });

    setRequestSuccessMsg(`Stock confirmation request dispatched to ${requestModalItem.pharmacy.name}!`);
    setTimeout(() => {
      setRequestModalItem(null);
      setRequestSuccessMsg('');
      navigate('/requests');
    }, 1500);
  };

  // Status badge styling
  const renderStatusBadge = (status, lastConfirmedAt) => {
    const hoursElapsed = (Date.now() - new Date(lastConfirmedAt).getTime()) / (1000 * 60 * 60);

    if (status === 'out_of_stock') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          <span>Out of Stock</span>
        </span>
      );
    }

    if (status === 'available') {
      if (hoursElapsed <= 12) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Available (Recently Confirmed)</span>
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>Availability Reported</span>
          </span>
        );
      }
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" />
        <span>Confirmation Requested</span>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Advisory */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Availability Search</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medicine Discovery & Price Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search verified formulations, check confirmation freshness, and assess transparent Medicine Access Scores.
            </p>
          </div>
        </div>

        <DisclaimerBanner compact={true} />
      </div>

      {/* Main Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by medicine name, brand (e.g. Amoxil, Glucophage), or active generic ingredient..."
            className="w-full pl-11 pr-24 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid: Filter Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Col: Filters Sidebar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-900 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
                setMaxPrice(100);
                setMaxDistance(15);
                setVerifiedOnly(false);
                setSortBy('access_score');
              }}
              className="text-[11px] text-brand-600 font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Rank & Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="access_score">Highest Medicine Access Score</option>
              <option value="price_low">Lowest Listed Price</option>
              <option value="distance">Nearest Distance</option>
              <option value="freshness">Freshest Inventory Confirmation</option>
            </select>
          </div>

          {/* Availability Status Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Stock Availability</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Availability Statuses</option>
              <option value="available">Recently Confirmed Available</option>
              <option value="reported">Reported Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Therapeutic Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Max Listed Price</span>
              <span className="font-bold text-brand-600">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-brand-600"
            />
          </div>

          {/* Max Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Distance Radius</span>
              <span className="font-bold text-blue-600">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Only Verified Pharmacies */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Only Verified Licensed Pharmacies</span>
            </label>
          </div>

        </div>

        {/* Right 3 Cols: Search Results */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Found <strong className="text-slate-900">{matchedResults.length}</strong> matching pharmacy listings
              {searchQuery && <> for "<strong>{searchQuery}</strong>"</>}
            </span>
            <span className="text-[11px] text-slate-400">
              Ranked with transparent Access Scoring
            </span>
          </div>

          {matchedResults.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <Pill className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <h3 className="font-bold text-slate-800 text-sm">No exact pharmacy inventory found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No pharmacy in your current filter range has this exact formulation listed. Try widening your price/distance filters or check generic active ingredients.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchedResults.map((item) => {
                const { medicine, pharmacy, inventoryItem, distanceKm, accessScore, matchReasons, matchType } = item;
                const hoursAgo = Math.round((Date.now() - new Date(inventoryItem.lastConfirmedAt).getTime()) / (1000 * 60 * 60));

                return (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                  >
                    {/* Top Row: Medicine Info & Price */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{medicine.name}</h3>
                          {medicine.brandNames && medicine.brandNames.length > 0 && (
                            <span className="text-xs text-slate-500">
                              (Brand: {medicine.brandNames.join(', ')})
                            </span>
                          )}
                          {renderStatusBadge(inventoryItem.status, inventoryItem.lastConfirmedAt)}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          <strong>Generic:</strong> {medicine.genericName} • <strong>Formulation:</strong> {medicine.strength} {medicine.formulation}
                        </p>
                        <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">
                          Therapeutic: {medicine.category}
                        </span>
                      </div>

                      <div className="sm:text-right flex-shrink-0">
                        <div className="text-xl font-extrabold text-slate-900">
                          ${inventoryItem.listedPrice.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-slate-400">Listed unit price</span>
                      </div>
                    </div>

                    {/* Middle: Pharmacy & Proximity Details */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <strong className="text-slate-800">{pharmacy.name}</strong>
                          {pharmacy.isVerified && (
                            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{pharmacy.address}</span>
                          <span>•</span>
                          <strong className="text-slate-700">{distanceKm.toFixed(1)} km away</strong>
                        </div>
                      </div>

                      {/* Medicine Access Score Pill (Clickable for transparent breakdown!) */}
                      <button
                        onClick={() => setSelectedScoreItem(item)}
                        className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-400 shadow-2xs text-left transition-all group"
                        title="Click to view transparent score formula"
                      >
                        <div className="p-1 rounded-lg bg-brand-50 text-brand-600 group-hover:scale-110 transition-transform">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Access Score</div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-extrabold text-slate-900">{accessScore.score}</span>
                            <span className="text-[10px] text-slate-400">/100</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${accessScore.badgeColor}`}>
                              {accessScore.tier.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 ml-1 group-hover:text-brand-600" />
                      </button>
                    </div>

                    {/* Smart Match Explanation Box */}
                    <div className="p-2.5 rounded-xl bg-brand-50/50 border border-brand-100/70 text-[11px] text-brand-950 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Match Reasoning:</strong> {matchReasons.join(' • ')}
                      </div>
                    </div>

                    {/* Card Actions & Freshness Timestamp */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          Last inventory update: <strong>{hoursAgo < 1 ? 'Just now' : `${hoursAgo} hour(s) ago`}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedScoreItem(item)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          View Score Breakdown
                        </button>
                        <button
                          onClick={() => handleOpenRequest(item)}
                          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Stock Confirmation</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Transparent Access Score Breakdown Modal */}
      {selectedScoreItem && (
        <AccessScoreModal
          isOpen={Boolean(selectedScoreItem)}
          onClose={() => setSelectedScoreItem(null)}
          accessScore={selectedScoreItem.accessScore}
          pharmacyName={selectedScoreItem.pharmacy.name}
          medicineName={selectedScoreItem.medicine.name}
        />
      )}

      {/* Stock Availability Request Modal */}
      {requestModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Send Availability Confirmation Request</h3>
                  <p className="text-[11px] text-slate-500">Route directly to the licensed pharmacy</p>
                </div>
              </div>
              <button
                onClick={() => setRequestModalItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">{requestSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{requestModalItem.medicine.name}</span>
                    <span className="text-brand-600">${requestModalItem.inventoryItem.listedPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {requestModalItem.medicine.formulation} • {requestModalItem.medicine.strength}
                  </p>
                  <p className="text-[11px] text-blue-700 font-semibold pt-1">
                    Destination: {requestModalItem.pharmacy.name} ({requestModalItem.distanceKm.toFixed(1)} km)
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Requested Quantity / Units</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={requestQty}
                    onChange={(e) => setRequestQty(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Prescription Notes / Timing Requirements</label>
                  <textarea
                    rows="3"
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    placeholder="e.g. Doctor prescribed 1 tablet bid. Can pick up today at 4 PM."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Availability requests confirm physical inventory. Prescription medications must still be presented with a valid doctor's prescription upon collection.
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestModalItem(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
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
