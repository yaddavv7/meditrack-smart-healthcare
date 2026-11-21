import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import {
  Pill,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Flame,
  Award,
  BellRing,
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';

export const SmartReminder = () => {
  const { reminders, addReminder, updateReminder, deleteReminder, recordReminderAction } = useData();
  const { currentUser } = useAuth();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // Form states
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('500 mg');
  const [unit, setUnit] = useState('Tablet');
  const [frequency, setFrequency] = useState('Twice daily');
  const [time1, setTime1] = useState('08:00');
  const [time2, setTime2] = useState('20:00');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');

  // Filter reminders for current user
  const userReminders = reminders.filter(r => r.userId === currentUser?.id || !r.userId);

  // Calculate overall adherence & streak
  const totalDosesLogged = userReminders.reduce((acc, r) => acc + (r.history?.length || 0), 0);
  const takenDosesLogged = userReminders.reduce((acc, r) => acc + (r.history?.filter(h => h.status === 'taken').length || 0), 0);
  const overallAdherence = totalDosesLogged > 0 ? Math.round((takenDosesLogged / totalDosesLogged) * 100) : 95;
  const maxStreak = Math.max(0, ...userReminders.map(r => r.streakDays || 0));

  const handleSaveReminder = (e) => {
    e.preventDefault();

    const times = frequency === 'Once daily' ? [time1] : [time1, time2];

    if (editingReminder) {
      updateReminder(editingReminder.id, {
        medicineName: medName,
        dosage,
        unit,
        frequency,
        timesOfDay: times,
        startDate,
        endDate,
        instructions
      });
      setEditingReminder(null);
    } else {
      addReminder({
        userId: currentUser?.id || 'usr_pat_1',
        medicineName: medName,
        dosage,
        unit,
        frequency,
        timesOfDay: times,
        startDate,
        endDate,
        instructions
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (rem) => {
    setEditingReminder(rem);
    setMedName(rem.medicineName);
    setDosage(rem.dosage);
    setUnit(rem.unit || 'Tablet');
    setFrequency(rem.frequency);
    setTime1(rem.timesOfDay[0] || '08:00');
    setTime2(rem.timesOfDay[1] || '20:00');
    setStartDate(rem.startDate);
    setEndDate(rem.endDate || '');
    setInstructions(rem.instructions || '');
    setShowAddModal(true);
  };

  const resetForm = () => {
    setMedName('');
    setDosage('500 mg');
    setUnit('Tablet');
    setFrequency('Twice daily');
    setTime1('08:00');
    setTime2('20:00');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setInstructions('');
    setEditingReminder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-widest">
            <Pill className="w-3.5 h-3.5" />
            <span>Adherence & Schedule Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Medicine Reminders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain your health routines with personalized schedules entered strictly per your doctor or prescription label.
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medicine Schedule</span>
        </button>
      </div>

      {/* Safety Notice Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-900">Safety & Prescribing Advisory:</div>
          <p className="text-amber-800 leading-relaxed">
            MediTrack does not suggest or calculate drug dosages. All reminder times and frequencies must strictly match the instructions provided on your prescription container label or by your licensed healthcare professional. Browser reminders depend on device connectivity and notification permissions.
          </p>
        </div>
      </div>

      {/* Adherence & Streak Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{overallAdherence}%</div>
            <div className="text-xs text-slate-500 font-medium">Overall Adherence Rate</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{maxStreak} Days</div>
            <div className="text-xs text-slate-500 font-medium">Longest Unbroken Streak</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{userReminders.length}</div>
            <div className="text-xs text-slate-500 font-medium">Active Prescriptions Tracked</div>
          </div>
        </div>

      </div>

      {/* Reminders Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReminders.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Pill className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
            <h3 className="font-bold text-slate-800 text-sm">No scheduled reminders yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your prescribed medicine, dosing times, and instructions to stay organized and on track.
            </p>
            <button
              onClick={() => { resetForm(); setShowAddModal(true); }}
              className="mt-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
            >
              Add First Reminder
            </button>
          </div>
        ) : (
          userReminders.map((rem) => (
            <div
              key={rem.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Top Row: Name, Menu */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{rem.medicineName}</h3>
                    <p className="text-xs text-slate-500">
                      {rem.dosage} • {rem.unit || 'Tablet'} • {rem.frequency}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditClick(rem)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      title="Edit Schedule"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReminder(rem.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Schedule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Times of Day badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {rem.timesOfDay?.map((time, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold font-mono"
                    >
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{time}</span>
                    </span>
                  ))}
                </div>

                {/* Instructions note */}
                {rem.instructions && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong>Label note:</strong> {rem.instructions}
                  </div>
                )}

                {/* Adherence & Streak badges */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-orange-600 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{rem.streakDays} day streak</span>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Adherence: <strong className="text-brand-600">{rem.adherenceRate}%</strong>
                  </span>
                </div>

              </div>

              {/* Action Buttons: Mark Dose Taken */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => recordReminderAction(rem.id, 'taken')}
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Taken</span>
                </button>
                <button
                  onClick={() => recordReminderAction(rem.id, 'snoozed')}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center gap-1"
                  title="Snooze for 15 minutes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Snooze</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Add / Edit Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingReminder ? 'Edit Medicine Schedule' : 'Add New Medicine Schedule'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Medicine Name</label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g., Metformin HCl, Amoxicillin"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Dosage Strength</label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 500 mg, 10 mcg"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Form Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Inhalation Puff">Inhalation Puff</option>
                    <option value="Liquid ml">Liquid ml</option>
                    <option value="Pen Unit">Pen Unit</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                >
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="As needed (PRN)">As needed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Primary Reminder Time</label>
                  <input
                    type="time"
                    required
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                {frequency !== 'Once daily' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Secondary Reminder Time</label>
                    <input
                      type="time"
                      value={time2}
                      onChange={(e) => setTime2(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Prescription Instructions / Special Notes</label>
                <textarea
                  rows="2"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Take with dinner. Complete full 7-day course."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
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
                  Save Schedule
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
