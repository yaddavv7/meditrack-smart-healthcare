import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Store, 
  Stethoscope, 
  ShieldAlert, 
  ChevronDown, 
  Sparkles,
  Check
} from 'lucide-react';

export const RoleSwitcherPill = () => {
  const { currentUser, switchDemoRole, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'patient',
      name: 'Sarah Jenkins',
      title: 'Patient / General User',
      icon: User,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      badge: 'bg-emerald-500'
    },
    {
      id: 'pharmacist',
      name: 'Dr. Marcus Vance, PharmD',
      title: 'Pharmacist (Vance Pharmacy)',
      icon: Store,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      badge: 'bg-blue-500'
    },
    {
      id: 'provider',
      name: 'Dr. Elena Rostova, MD',
      title: 'Healthcare Provider (St. Jude)',
      icon: Stethoscope,
      color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
      badge: 'bg-teal-500'
    },
    {
      id: 'admin',
      name: 'Platform Administrator',
      title: 'Platform Chief Admin',
      icon: ShieldAlert,
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      badge: 'bg-purple-500'
    }
  ];

  const currentRoleConfig = roles.find(r => r.id === role) || roles[0];
  const IconComponent = currentRoleConfig.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-all shadow-sm"
        title="Switch Demo Role for testing"
      >
        <div className={`w-2 h-2 rounded-full ${currentRoleConfig.badge} animate-pulse`} />
        <IconComponent className="w-3.5 h-3.5 text-slate-600" />
        <span className="hidden sm:inline">Role:</span>
        <span className="text-slate-900 font-bold">{currentRoleConfig.name.split(',')[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Role Switcher</span>
              </div>
              <p className="text-[11px] text-slate-500">Test the platform as any of the 4 required personas:</p>
            </div>

            <div className="space-y-1">
              {roles.map((r) => {
                const ItemIcon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchDemoRole(r.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs ${
                      isSelected
                        ? 'bg-brand-50 border border-brand-200 text-brand-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${r.color}`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{r.name}</div>
                        <div className="text-[10px] text-slate-500">{r.title}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
