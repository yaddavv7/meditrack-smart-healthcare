import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { UserDashboard } from './pages/UserDashboard';
import { MedicineDiscovery } from './pages/MedicineDiscovery';
import { PharmacyDiscovery } from './pages/PharmacyDiscovery';
import { RequestSystem } from './pages/RequestSystem';
import { SmartReminder } from './pages/SmartReminder';
import { MedicineInfoCentre } from './pages/MedicineInfoCentre';
import { HealthcareFacilities } from './pages/HealthcareFacilities';
import { MedicineAssistance } from './pages/MedicineAssistance';
import { PharmacyDashboard } from './pages/PharmacyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

// Automatically scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component for Admin
const AdminRoute = ({ children }) => {
  const { isAdmin, currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/auth?mode=login" replace />;
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-900">Administrator Access Restricted</h2>
        <p className="text-xs text-slate-500">
          This portal requires platform governance privileges. You can switch to the Platform Admin demo role using the header pill above to evaluate this view.
        </p>
      </div>
    );
  }
  return children;
};

// Protected Route Component for Pharmacist
const PharmacistRoute = ({ children }) => {
  const { isPharmacist, isAdmin, currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/auth?mode=login" replace />;
  if (!isPharmacist && !isAdmin) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-900">Pharmacist Portal Restricted</h2>
        <p className="text-xs text-slate-500">
          This portal requires a verified pharmacy license role. Switch to Dr. Marcus Vance using the Quick Role Switcher pill in the navbar to evaluate this view.
        </p>
      </div>
    );
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans selection:bg-brand-100 selection:text-brand-900">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* 1. Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* 2. Authentication */}
                <Route path="/auth" element={<AuthPage />} />

                {/* 3. User Dashboard */}
                <Route path="/dashboard" element={<UserDashboard />} />

                {/* 4. Medicine Discovery & Price Comparison */}
                <Route path="/medicines" element={<MedicineDiscovery />} />

                {/* 5. Pharmacy Discovery and Map */}
                <Route path="/pharmacies" element={<PharmacyDiscovery />} />

                {/* 6. Medicine Availability Request System */}
                <Route path="/requests" element={<RequestSystem />} />

                {/* 7. Smart Medicine Reminders */}
                <Route path="/reminders" element={<SmartReminder />} />

                {/* 8. Medicine Information Centre */}
                <Route path="/info" element={<MedicineInfoCentre />} />

                {/* 9. Healthcare Facility Discovery */}
                <Route path="/facilities" element={<HealthcareFacilities />} />

                {/* 10. Medicine Assistance Programme */}
                <Route path="/assistance" element={<MedicineAssistance />} />

                {/* 11. Pharmacy Dashboard */}
                <Route 
                  path="/pharmacy-dashboard" 
                  element={
                    <PharmacistRoute>
                      <PharmacyDashboard />
                    </PharmacistRoute>
                  } 
                />

                {/* 12. Admin Dashboard */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
