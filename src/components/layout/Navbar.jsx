import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RoleSwitcherPill } from '../common/RoleSwitcherPill';
import { NotificationDrawer } from '../common/NotificationDrawer';
import {
  Pill,
  Search,
  MapPin,
  Clock,
  Building2,
  BookOpen,
  HeartHandshake,
  LayoutDashboard,
  Store,
  ShieldAlert,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, role, isPatient, isPharmacist, isProvider, isAdmin, logout } = useAuth();
  const { notifications } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Calculate unread count for current user/role
  const unreadCount = notifications.filter(n => 
    !n.isRead && (n.recipientId === currentUser?.id || n.recipientRole === role || n.recipientRole === 'all')
  ).length;

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Find Medicine', path: '/medicines', icon: Search },
    { name: 'Pharmacies & Map', path: '/pharmacies', icon: MapPin },
    { name: 'Request Tracker', path: '/requests', icon: Clock },
    { name: 'Smart Reminders', path: '/reminders', icon: Pill },
    { name: 'Healthcare Facilities', path: '/facilities', icon: Building2 },
    { name: 'Medicine Info', path: '/info', icon: BookOpen },
    { name: 'Assistance Aid', path: '/assistance', icon: HeartHandshake },
  ];

  const getDashboardLink = () => {
    if (isAdmin) return { name: 'Admin Portal', path: '/admin', icon: ShieldAlert };
    if (isPharmacist) return { name: 'Pharmacy Dashboard', path: '/pharmacy-dashboard', icon: Store };
    return { name: 'My Health Dashboard', path: '/dashboard', icon: LayoutDashboard };
  };

  const dashboardLink = getDashboardLink();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-mediblue-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Pill className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-mediblue-900 bg-clip-text text-transparent">
                  Medi<span className="text-brand-600">Track</span>
                </span>
                <span className="hidden sm:block text-[9px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                  Healthcare Access
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.slice(0, 5).map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* More dropdown for Info & Assistance */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70">
                  <span>More</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute right-0 top-full pt-1 hidden group-hover:block w-48 animate-in fade-in zoom-in-95 duration-100">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 space-y-0.5">
                    {navLinks.slice(5).map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                        >
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Role-specific Dashboard shortcut */}
              <Link
                to={dashboardLink.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ml-1 transition-colors ${
                  isActive(dashboardLink.path)
                    ? 'bg-mediblue-50 text-mediblue-700 border border-mediblue-200'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <dashboardLink.icon className="w-3.5 h-3.5 text-mediblue-600" />
                <span>{dashboardLink.name.split(' ')[0]} Hub</span>
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2.5">
              {/* Quick Role Switcher Pill */}
              <RoleSwitcherPill />

              {/* In-app Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User profile dropdown / Auth button */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-xs font-medium"
                  >
                    <img
                      src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-500"
                    />
                    <span className="hidden sm:inline font-semibold text-slate-700 max-w-[100px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="font-semibold text-slate-900 text-xs truncate">{currentUser.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700">
                            {role}
                          </span>
                        </div>
                        <div className="py-1">
                          <Link
                            to={dashboardLink.path}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            <span>{dashboardLink.name}</span>
                          </Link>
                          <Link
                            to="/requests"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
                          >
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>Request History</span>
                          </Link>
                          <Link
                            to="/reminders"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-medium"
                          >
                            <Pill className="w-4 h-4 text-slate-400" />
                            <span>Medicine Schedules</span>
                          </Link>
                        </div>
                        <div className="pt-1 border-t border-slate-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth?mode=login"
                    className="text-xs font-semibold text-slate-700 hover:text-brand-600 px-3 py-1.5"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <Link
              to={dashboardLink.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold bg-mediblue-50 text-mediblue-700 mb-2"
            >
              <dashboardLink.icon className="w-4 h-4 text-mediblue-600" />
              <span>{dashboardLink.name}</span>
            </Link>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Slide-in Notifications Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
