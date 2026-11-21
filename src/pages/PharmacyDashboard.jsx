import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  Store,
  Pill,
  AlertTriangle,
  Clock,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Check,
  Send,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const PharmacyDashboard = () => {
  const { 
    inventory, 
    medicines, 
    requests, 
    addInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem, 
    updateRequestStatus 
  } = useData();

  const { currentUser } = useAuth();

  // Active Pharmacy Context (defaults to Vance Central Pharmacy if not explicitly set)
  const pharmacyId = currentUser?.pharmacyId || 'phm_1';
  const pharmacyName = currentUser?.pharmacyName || 'Vance Central Pharmacy & Care';

  const [searchInventory, setSearchInventory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || '');
  const [stockQty, setStockQty] = useState(25);
  const [price, setPrice] = useState(15.00);
  const [threshold, setThreshold] = useState(10);
  const [requiresRx, setRequiresRx] = useState(true);

  // Filter inventory for this pharmacy
  const pharmacyInventory = useMemo(() => {
    return inventory.filter(i => i.pharmacyId === pharmacyId);
  }, [inventory, pharmacyId]);

  // Incoming requests for this pharmacy
  const incomingRequests = useMemo(() => {
    return requests.filter(r => r.pharmacyId === pharmacyId || r.pharmacyName.includes("Vance"));
  }, [requests, pharmacyId]);

  const pendingRequests = incomingRequests.filter(r => r.status === 'pending');

  // Low stock items based on configured threshold
  const lowStockItems = pharmacyInventory.filter(i => i.stockQuantity <= i.lowStockThreshold && i.stockQuantity > 0);
  const outOfStockItems = pharmacyInventory.filter(i => i.stockQuantity === 0 || i.status === 'out_of_stock');
  const availableItems = pharmacyInventory.filter(i => i.status === 'available' && i.stockQuantity > 0);

  // Chart Data: Stock distribution
  const stockDistributionData = [
    { name: 'Adequate Stock', value: availableItems.length - lowStockItems.length, color: '#10B981' },
    { name: 'Low Stock Alert', value: lowStockItems.length, color: '#F59E0B' },
    { name: 'Out of Stock', value: outOfStockItems.length, color: '#EF4444' }
  ];

  // Weekly Request volume trends data
  const requestTrendsData = [
    { day: 'Mon', requests: 4 },
    { day: 'Tue', requests: 7 },
    { day: 'Wed', requests: 5 },
    { day: 'Thu', requests: 9 },
    { day: 'Fri', requests: 12 },
    { day: 'Sat', requests: 8 },
    { day: 'Sun', requests: 3 },
  ];

  const handleSaveListing = (e) => {
    e.preventDefault();

    if (editingItem) {
      updateInventoryItem(editingItem.id, {
        stockQuantity: Number(stockQty),
        listedPrice: Number(price),
        lowStockThreshold: Number(threshold),
        requiresPrescription: requiresRx
      });
      setEditingItem(null);
    } else {
      addInventoryItem({
        pharmacyId,
        medicineId: selectedMedId,
        stockQuantity: stockQty,
        listedPrice: price,
        lowStockThreshold: threshold,
        requiresPrescription: requiresRx
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setSelectedMedId(item.medicineId);
    setStockQty(item.stockQuantity);
    setPrice(item.listedPrice);
    setThreshold(item.lowStockThreshold);
    setRequiresRx(item.requiresPrescription);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setSelectedMedId(medicines[0]?.id || '');
    setStockQty(25);
    setPrice(15.00);
    setThreshold(10);
    setRequiresRx(true);
    setEditingItem(null);
  };

  // Filtered inventory list
  const filteredListings = pharmacyInventory.filter(item => {
    const med = medicines.find(m => m.id === item.medicineId);
    if (!med) return false;
    return med.name.toLowerCase().includes(searchInventory.toLowerCase()) ||
           med.genericName.toLowerCase().includes(searchInventory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Store className="w-3.5 h-3.5" />
            <span>Pharmacy Operations Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {pharmacyName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time stock management, low-stock threshold monitoring, and customer request fulfillment.
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medicine Listing</span>
        </button>
      </div>

      <DisclaimerBanner compact={true} />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Total Listed Medicines</span>
            <Pill className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{pharmacyInventory.length}</div>
          <div className="text-[11px] text-slate-500">Active formulary items</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Available In Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{availableItems.length}</div>
          <div className="text-[11px] text-slate-500">Recently verified availability</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Low-Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{lowStockItems.length}</div>
          <div className="text-[11px] text-slate-500">Below configured threshold</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Pending Requests</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600">{pendingRequests.length}</div>
          <div className="text-[11px] text-slate-500">Awaiting pharmacist response</div>
        </div>

      </div>

      {/* Analytics Charts Row with Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Request Volume (BarChart) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Weekly Customer Request Inquiries</h3>
              <p className="text-xs text-slate-500">Volume of availability confirmations requested</p>
            </div>
            <TrendingUp className="w-4 h-4 text-brand-600" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '0.75rem', fontSize: '12px', border: '1px solid #E2E8F0' }}
                />
                <Bar dataKey="requests" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Breakdown (PieChart) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Inventory Status Health</h3>
            <p className="text-xs text-slate-500">Current dispensary distribution</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stockDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {stockDistributionData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-900">{item.value} items</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Incoming Availability Requests Queue */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Incoming Medicine Availability Requests</h3>
            <p className="text-xs text-slate-500">Review requests from nearby patients and update live status</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {incomingRequests.length} Total Requests
          </span>
        </div>

        <div className="space-y-3">
          {incomingRequests.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No incoming requests for this pharmacy at this time.</p>
          ) : (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-slate-900">{req.medicineName}</strong>
                    <span className="text-slate-500 font-medium">({req.formulation})</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-200 text-slate-700">
                      Qty: {req.requestedQuantity}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Patient: <strong>{req.patientName}</strong> ({req.patientPhone})
                    {req.patientNotes && <> • <em>"{req.patientNotes}"</em></>}
                  </p>
                  <span className="text-[10px] text-slate-400">
                    Received: {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                {/* Instant Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => updateRequestStatus(req.id, 'confirmed', 'Confirmed in stock by pharmacist.')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Available</span>
                  </button>

                  <button
                    onClick={() => updateRequestStatus(req.id, 'ready_for_collection', 'Packaged on collection counter.')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Ready for Pickup</span>
                  </button>

                  <button
                    onClick={() => updateRequestStatus(req.id, 'unavailable', 'Currently depleted from dispensary inventory.')}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Out of Stock</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pharmacy Inventory Management Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Catalogue & Stock Management</h3>
            <p className="text-xs text-slate-500">Edit listed prices, update stock levels, and set alert thresholds</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchInventory}
              onChange={(e) => setSearchInventory(e.target.value)}
              placeholder="Search inventory..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Medicine & Formula</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">In Stock</th>
                <th className="py-3 px-4">Low Threshold</th>
                <th className="py-3 px-4">Listed Price</th>
                <th className="py-3 px-4">Prescription Rule</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredListings.map((item) => {
                const med = medicines.find(m => m.id === item.medicineId);
                const isLow = item.stockQuantity <= item.lowStockThreshold && item.stockQuantity > 0;
                const isOut = item.stockQuantity === 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{med?.name || 'Medicine'}</div>
                      <div className="text-[11px] text-slate-400">{med?.genericName} • {med?.strength}</div>
                    </td>
                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Low Stock Alert
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${isLow ? 'text-amber-600' : isOut ? 'text-rose-600' : 'text-slate-800'}`}>
                        {item.stockQuantity} units
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {item.lowStockThreshold} units
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      ${item.listedPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-slate-500">
                        {item.requiresPrescription ? 'Rx Required' : 'OTC / Open'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="Edit Listing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteInventoryItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Inventory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingItem ? 'Edit Medicine Listing' : 'Add Medicine to Inventory'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="space-y-4">
              
              {!editingItem && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Select Verified Medicine</label>
                  <select
                    value={selectedMedId}
                    onChange={(e) => setSelectedMedId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.genericName} - {m.strength})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Stock Quantity (Units)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Listed Unit Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Low Stock Alert Threshold</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Prescription Status</label>
                  <select
                    value={requiresRx ? "yes" : "no"}
                    onChange={(e) => setRequiresRx(e.target.value === "yes")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    <option value="yes">Prescription Required (Rx)</option>
                    <option value="no">Over The Counter (OTC)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Save Listing
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
