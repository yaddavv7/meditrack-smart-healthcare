import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';
import { isFirebaseConfigured, auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut 
} from 'firebase/auth';

const AuthContext = createContext(null);

const STORAGE_KEY = 'meditrack_current_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error reading stored user:", e);
    }
    // Default to the demo Patient user
    return initialUsers[0];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  // Quick switch for demo testing all 4 roles effortlessly
  const switchDemoRole = (role) => {
    const targetUser = initialUsers.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      setAuthError(null);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    // If Firebase is active, try Firebase auth
    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userObj = {
          id: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName || email.split('@')[0],
          role: "patient",
          status: "active"
        };
        setCurrentUser(userObj);
        setIsLoading(false);
        return { success: true };
      } catch (err) {
        console.warn("Firebase login failed, checking demo users:", err.message);
      }
    }

    // Demo Mode lookup
    const foundUser = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoading(false);
      return { success: true };
    }

    // Allow mock login for any arbitrary email in demo mode
    const genericUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: "patient",
      status: "active",
      joinedAt: new Date().toISOString()
    };
    setCurrentUser(genericUser);
    setIsLoading(false);
    return { success: true };
  };

  const signup = async ({ name, email, password, role, licenseNumber, facilityName, phone }) => {
    setIsLoading(true);
    setAuthError(null);

    // Strict security rule: Users cannot register themselves as admin!
    if (role === 'admin') {
      setIsLoading(false);
      setAuthError("Administrative roles cannot be self-registered. Contact system administrator.");
      return { success: false, error: "Unauthorized role assignment." };
    }

    const permittedRole = ['patient', 'pharmacist', 'provider'].includes(role) ? role : 'patient';

    if (isFirebaseConfigured && auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
          id: cred.user.uid,
          name,
          email,
          phone: phone || "",
          role: permittedRole,
          licenseNumber: licenseNumber || null,
          facilityName: facilityName || null,
          verificationStatus: permittedRole === 'patient' ? 'verified' : 'pending',
          status: "active",
          joinedAt: new Date().toISOString()
        };
        setCurrentUser(newUser);
        setIsLoading(false);
        return { success: true };
      } catch (err) {
        console.warn("Firebase signup failed, continuing in demo mode:", err.message);
      }
    }

    // Demo Mode registration
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: phone || "+1 (555) 000-1122",
      role: permittedRole,
      licenseNumber: licenseNumber || null,
      facilityName: facilityName || null,
      verificationStatus: permittedRole === 'patient' ? 'verified' : 'pending',
      status: "active",
      joinedAt: new Date().toISOString()
    };

    setCurrentUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.error("Firebase signout error:", e);
      }
    }
    // In demo mode, reset to patient or null
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value = {
    currentUser,
    setCurrentUser,
    role: currentUser?.role || 'guest',
    isPatient: currentUser?.role === 'patient',
    isPharmacist: currentUser?.role === 'pharmacist',
    isProvider: currentUser?.role === 'provider',
    isAdmin: currentUser?.role === 'admin',
    isLoading,
    authError,
    setAuthError,
    login,
    signup,
    logout,
    updateProfile,
    switchDemoRole,
    isDemoMode: !isFirebaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
