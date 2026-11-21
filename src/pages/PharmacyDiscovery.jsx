import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  Store,
  Layers,
  List,
  Navigation,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Custom Map Marker Icon for Leaflet
const createPharmacyIcon = (isVerified) => {
  return L.divIcon({
    className: 'custom-pharmacy-pin',
    html: `
      <div style="
        background: ${isVerified ? '#10B981' : '#3B82F6'};
        color: white;
        width: 34px;
        height: 34px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        border: 2px solid white;
      ">
        <div style="transform: rotate(45deg); font-size: 14px; font-weight: bold;">+</div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30]
  });
};

// Component to dynamically re-center Leaflet map
const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

export const PharmacyDiscovery = () => {
  const { pharmacies, inventory, savedPharmacyIds, toggleSavePharmacy } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'list'
  const [verifiedFilter, setVerifiedFilter] = useState(false);

  // Default Center: Metropolis Central Coordinates
  const defaultCenter = [40.730610, -73.935242];

  // Filter pharmacies
  const filteredPharmacies = useMemo(() => {
    return pharmacies.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVerified = verifiedFilter ? p.isVerified : true;
      return matchSearch && matchVerified;
    });
  }, [pharmacies, searchQuery, verifiedFilter]);

  const mapCenter = selectedPharmacy 
    ? [selectedPharmacy.lat, selectedPharmacy.lng] 
    : defaultCenter;

  const getInventoryCount = (pharmacyId) => {
    return inventory.filter(i => i.pharmacyId === pharmacyId && i.status === 'available').length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Store className="w-3.5 h-3.5" />
            <span>Interactive Network Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pharmacy Discovery & Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Locate registered neighborhood pharmacies, check verified licenses, and get direct directions.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'split' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'map' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Map Only</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Only</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pharmacies by name, district, or street..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer flex-shrink-0">
          <input
            type="checkbox"
            checked={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.checked)}
            className="rounded text-brand-600 focus:ring-brand-500"
          />
          <span>Only Verified Licenses</span>
        </label>
      </div>

      {/* Main Content Layout */}
      <div className={`grid gap-6 ${
        viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 
        viewMode === 'map' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>

        {/* Map View */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 h-[560px]' : 'h-[620px]'} w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md relative`}>
            <MapContainer
              center={defaultCenter}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <ChangeMapView center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredPharmacies.map((pharmacy) => {
                const isSaved = savedPharmacyIds.includes(pharmacy.id);
                const availableCount = getInventoryCount(pharmacy.id);

                return (
                  <Marker
                    key={pharmacy.id}
                    position={[pharmacy.lat, pharmacy.lng]}
                    icon={createPharmacyIcon(pharmacy.isVerified)}
                    eventHandlers={{
                      click: () => setSelectedPharmacy(pharmacy)
                    }}
                  >
                    <Popup>
                      <div className="p-3 space-y-2 min-w-[220px]">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{pharmacy.name}</h4>
                          {pharmacy.isVerified && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 flex-shrink-0">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{pharmacy.address}</p>
                        <div className="text-[10px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                          <div><strong>Hours:</strong> {pharmacy.operatingHours}</div>
                          <div><strong>Tel:</strong> {pharmacy.phone}</div>
                          <div className="text-emerald-600 font-semibold">{availableCount} active medicines listed</div>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <a
                            href={`https://www.openstreetmap.org/directions?to=${pharmacy.lat}%2C${pharmacy.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Directions</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <button
                            onClick={() => toggleSavePharmacy(pharmacy.id)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                            title="Save Pharmacy"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        )}

        {/* Pharmacy Cards List */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5 max-h-[560px] overflow-y-auto pr-1' : 'col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} space-y-4`}>
            {filteredPharmacies.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
                <Store className="w-10 h-10 mx-auto stroke-1 mb-2 opacity-50" />
                <p className="text-xs font-semibold text-slate-700">No pharmacies found matching filters</p>
                <p className="text-[11px] text-slate-400 mt-1">Try resetting the search terms or license filter.</p>
              </div>
            ) : (
              filteredPharmacies.map((pharmacy) => {
                const isSelected = selectedPharmacy?.id === pharmacy.id;
                const isSaved = savedPharmacyIds.includes(pharmacy.id);
                const availableCount = getInventoryCount(pharmacy.id);

                return (
                  <div
                    key={pharmacy.id}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                    className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'border-brand-500 ring-2 ring-brand-100 shadow-md'
                        : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900">{pharmacy.name}</h3>
                          {pharmacy.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" title="State license verified" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span>{pharmacy.address}</span>
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavePharmacy(pharmacy.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Bookmark pharmacy"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{pharmacy.operatingHours}</span>
                        </span>
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{pharmacy.rating} ({pharmacy.reviewCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{pharmacy.phone}</span>
                        </span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {availableCount} in stock
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">
                        License: {pharmacy.licenseNumber || 'Verified RPH'}
                      </span>

                      <a
                        href={`https://www.openstreetmap.org/directions?to=${pharmacy.lat}%2C${pharmacy.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        <span>External Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

    </div>
  );
};
