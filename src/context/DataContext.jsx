import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialMedicines,
  initialPharmacies,
  initialInventory,
  initialAvailabilityRequests,
  initialReminders,
  initialFacilities,
  initialAssistancePrograms,
  initialHealthArticles,
  initialSystemLogs,
  initialNotifications,
  initialUsers
} from '../data/mockData';

const DataContext = createContext(null);

const STORAGE_PREFIX = 'meditrack_data_';

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error loading ${key} from storage:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to storage:`, e);
  }
};

export const DataProvider = ({ children }) => {
  const [medicines, setMedicines] = useState(() => getStored('medicines', initialMedicines));
  const [pharmacies, setPharmacies] = useState(() => getStored('pharmacies', initialPharmacies));
  const [inventory, setInventory] = useState(() => getStored('inventory', initialInventory));
  const [requests, setRequests] = useState(() => getStored('requests', initialAvailabilityRequests));
  const [reminders, setReminders] = useState(() => getStored('reminders', initialReminders));
  const [facilities, setFacilities] = useState(() => getStored('facilities', initialFacilities));
  const [assistanceData, setAssistanceData] = useState(() => getStored('assistance', initialAssistancePrograms));
  const [healthArticles, setHealthArticles] = useState(() => getStored('articles', initialHealthArticles));
  const [systemLogs, setSystemLogs] = useState(() => getStored('systemLogs', initialSystemLogs));
  const [notifications, setNotifications] = useState(() => getStored('notifications', initialNotifications));
  const [usersList, setUsersList] = useState(() => getStored('usersList', initialUsers));
  const [savedPharmacyIds, setSavedPharmacyIds] = useState(() => getStored('savedPharmacies', ['phm_1', 'phm_2']));
  const [savedFacilityIds, setSavedFacilityIds] = useState(() => getStored('savedFacilities', ['fac_1']));

  // Sync states to local storage
  useEffect(() => setStored('medicines', medicines), [medicines]);
  useEffect(() => setStored('pharmacies', pharmacies), [pharmacies]);
  useEffect(() => setStored('inventory', inventory), [inventory]);
  useEffect(() => setStored('requests', requests), [requests]);
  useEffect(() => setStored('reminders', reminders), [reminders]);
  useEffect(() => setStored('facilities', facilities), [facilities]);
  useEffect(() => setStored('assistance', assistanceData), [assistanceData]);
  useEffect(() => setStored('articles', healthArticles), [healthArticles]);
  useEffect(() => setStored('systemLogs', systemLogs), [systemLogs]);
  useEffect(() => setStored('notifications', notifications), [notifications]);
  useEffect(() => setStored('usersList', usersList), [usersList]);
  useEffect(() => setStored('savedPharmacies', savedPharmacyIds), [savedPharmacyIds]);
  useEffect(() => setStored('savedFacilities', savedFacilityIds), [savedFacilityIds]);

  // System audit log helper
  const addSystemLog = (action, user, details, type = 'info') => {
    const newLog = {
      id: `log_${Date.now()}`,
      action,
      user,
      details,
      type,
      timestamp: new Date().toISOString()
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  // In-app Notification helper
  const addNotification = ({ recipientId, recipientRole, title, message, type = 'info', link = '/' }) => {
    const newNotif = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      recipientId: recipientId || 'all',
      recipientRole: recipientRole || 'all',
      title,
      message,
      type,
      link,
      isRead: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = (recipientId) => {
    setNotifications(prev => prev.map(n => (!recipientId || n.recipientId === recipientId || n.recipientRole === 'all') ? { ...n, isRead: true } : n));
  };

  // Medicine Availability Request Operations
  const submitAvailabilityRequest = ({
    patientId,
    patientName,
    patientPhone,
    pharmacyId,
    medicineId,
    requestedQuantity,
    patientNotes,
    urgency = 'standard'
  }) => {
    const pharmacy = pharmacies.find(p => p.id === pharmacyId);
    const medicine = medicines.find(m => m.id === medicineId);

    const newRequest = {
      id: `req_${Date.now()}`,
      patientId,
      patientName: patientName || "Patient",
      patientPhone: patientPhone || "+1 (555) 234-5678",
      pharmacyId,
      pharmacyName: pharmacy?.name || "Partner Pharmacy",
      medicineId,
      medicineName: medicine?.name || "Prescribed Medicine",
      formulation: medicine ? `${medicine.formulation}, ${medicine.strength}` : "Standard Form",
      requestedQuantity: Number(requestedQuantity) || 1,
      status: "pending",
      urgency,
      patientNotes: patientNotes || "",
      pharmacistNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          message: `Request created and routed to ${pharmacy?.name || 'pharmacy'}.`
        }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);

    // Notify pharmacy owner
    addNotification({
      recipientRole: 'pharmacist',
      title: "New Medicine Request Received",
      message: `${patientName || 'A patient'} requested availability for ${medicine?.name} (${requestedQuantity} units).`,
      type: "warning",
      link: "/pharmacy-dashboard"
    });

    addSystemLog(
      "AVAILABILITY_REQUEST_CREATED",
      patientName || "Patient",
      `New availability request #${newRequest.id} created for ${medicine?.name} at ${pharmacy?.name}.`,
      "coordination"
    );

    return newRequest;
  };

  const updateRequestStatus = (requestId, newStatus, pharmacistNotes = "") => {
    setRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;

      let statusMessage = `Status updated to ${newStatus}.`;
      if (newStatus === 'confirmed') statusMessage = `Availability confirmed by pharmacy. ${pharmacistNotes}`;
      if (newStatus === 'unavailable') statusMessage = `Stock reported unavailable by pharmacy. ${pharmacistNotes}`;
      if (newStatus === 'ready_for_collection') statusMessage = `Medicine packaged and ready for collection!`;
      if (newStatus === 'completed') statusMessage = `Request successfully fulfilled and collected.`;
      if (newStatus === 'cancelled') statusMessage = `Request cancelled.`;

      const updatedReq = {
        ...req,
        status: newStatus,
        pharmacistNotes: pharmacistNotes || req.pharmacistNotes,
        updatedAt: new Date().toISOString(),
        timeline: [
          ...req.timeline,
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            message: statusMessage
          }
        ]
      };

      // Notify patient
      let notifType = "info";
      if (newStatus === 'confirmed' || newStatus === 'ready_for_collection') notifType = 'success';
      if (newStatus === 'unavailable') notifType = 'error';

      addNotification({
        recipientId: req.patientId,
        recipientRole: 'patient',
        title: `Request Update: ${req.medicineName}`,
        message: statusMessage,
        type: notifType,
        link: "/requests"
      });

      addSystemLog(
        "REQUEST_STATUS_UPDATED",
        "Pharmacist",
        `Request #${req.id} (${req.medicineName}) changed to ${newStatus}.`,
        "coordination"
      );

      return updatedReq;
    }));
  };

  // Inventory Management (Pharmacist Operations)
  const addInventoryItem = (itemData) => {
    const newItem = {
      id: `inv_${Date.now()}`,
      pharmacyId: itemData.pharmacyId,
      medicineId: itemData.medicineId,
      status: itemData.stockQuantity > 0 ? "available" : "out_of_stock",
      stockQuantity: Number(itemData.stockQuantity) || 0,
      listedPrice: Number(itemData.listedPrice) || 0,
      lowStockThreshold: Number(itemData.lowStockThreshold) || 10,
      lastConfirmedAt: new Date().toISOString(),
      requiresPrescription: itemData.requiresPrescription ?? true
    };

    setInventory(prev => [newItem, ...prev]);

    addSystemLog(
      "INVENTORY_ITEM_ADDED",
      "Pharmacist",
      `Added medicine listing #${newItem.medicineId} to pharmacy inventory.`,
      "inventory"
    );

    return newItem;
  };

  const updateInventoryItem = (itemId, updates) => {
    setInventory(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const updated = {
        ...item,
        ...updates,
        lastConfirmedAt: new Date().toISOString()
      };
      // Auto-evaluate status if stock is updated
      if (updated.stockQuantity <= 0) {
        updated.status = 'out_of_stock';
      } else if (updated.status === 'out_of_stock' && updated.stockQuantity > 0) {
        updated.status = 'available';
      }
      return updated;
    }));

    addSystemLog(
      "INVENTORY_ITEM_UPDATED",
      "Pharmacist",
      `Updated inventory record #${itemId}.`,
      "inventory"
    );
  };

  const deleteInventoryItem = (itemId) => {
    setInventory(prev => prev.filter(i => i.id !== itemId));
    addSystemLog(
      "INVENTORY_ITEM_DELETED",
      "Pharmacist",
      `Removed inventory record #${itemId}.`,
      "inventory"
    );
  };

  // Smart Reminder Operations
  const addReminder = (reminderData) => {
    const newReminder = {
      id: `rem_${Date.now()}`,
      userId: reminderData.userId,
      medicineName: reminderData.medicineName,
      dosage: reminderData.dosage,
      unit: reminderData.unit || 'Tablet',
      frequency: reminderData.frequency || 'Once daily',
      timesOfDay: reminderData.timesOfDay || ['08:00'],
      startDate: reminderData.startDate || new Date().toISOString().split('T')[0],
      endDate: reminderData.endDate || '',
      instructions: reminderData.instructions || '',
      isActive: true,
      streakDays: 0,
      adherenceRate: 100,
      history: []
    };

    setReminders(prev => [newReminder, ...prev]);
    return newReminder;
  };

  const updateReminder = (reminderId, updates) => {
    setReminders(prev => prev.map(r => r.id === reminderId ? { ...r, ...updates } : r));
  };

  const deleteReminder = (reminderId) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  const recordReminderAction = (reminderId, action = 'taken') => {
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toTimeString().substring(0, 5);

    setReminders(prev => prev.map(rem => {
      if (rem.id !== reminderId) return rem;

      const newHistoryEntry = {
        date: today,
        time: timeNow,
        status: action,
        recordedAt: new Date().toISOString()
      };

      const updatedHistory = [newHistoryEntry, ...rem.history];
      const takenCount = updatedHistory.filter(h => h.status === 'taken').length;
      const calculatedAdherence = Math.min(100, Math.round((takenCount / updatedHistory.length) * 100));

      return {
        ...rem,
        history: updatedHistory,
        streakDays: action === 'taken' ? rem.streakDays + 1 : rem.streakDays,
        adherenceRate: calculatedAdherence
      };
    }));
  };

  // Medicine Assistance Programme Operations
  const submitAssistanceApplication = (applicationData) => {
    const newApp = {
      id: `ast_${Date.now()}`,
      applicantId: applicationData.applicantId,
      applicantName: applicationData.applicantName,
      incomeTier: applicationData.incomeTier,
      medicineName: applicationData.medicineName,
      estimatedCost: Number(applicationData.estimatedCost) || 50,
      urgency: applicationData.urgency || 'standard',
      organizationId: applicationData.organizationId || 'org_1',
      organizationName: applicationData.organizationName || 'Global Rx Relief Foundation',
      status: 'under_review',
      grantAmount: null,
      disbursementMethod: null,
      voucherCode: null,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      notes: applicationData.notes || 'Application submitted for assistance assessment.'
    };

    setAssistanceData(prev => ({
      ...prev,
      requests: [newApp, ...prev.requests]
    }));

    addSystemLog(
      "ASSISTANCE_APPLICATION_SUBMITTED",
      applicationData.applicantName,
      `New medicine assistance grant submitted for ${applicationData.medicineName}.`,
      "grant"
    );

    addNotification({
      recipientRole: 'admin',
      title: "New Medicine Assistance Application",
      message: `${applicationData.applicantName} submitted a grant assistance request for ${applicationData.medicineName}.`,
      type: "info",
      link: "/admin"
    });

    return newApp;
  };

  const updateAssistanceStatus = (applicationId, newStatus, grantAmount, notes) => {
    setAssistanceData(prev => ({
      ...prev,
      requests: prev.requests.map(req => {
        if (req.id !== applicationId) return req;
        const voucherCode = newStatus === 'approved' ? `MEDITRACK-AID-${Math.floor(10000 + Math.random() * 90000)}` : req.voucherCode;
        return {
          ...req,
          status: newStatus,
          grantAmount: grantAmount !== undefined ? Number(grantAmount) : req.grantAmount,
          voucherCode,
          disbursementMethod: newStatus === 'approved' ? 'Pharmacy Direct Credit Voucher' : req.disbursementMethod,
          reviewedAt: new Date().toISOString(),
          notes: notes || req.notes
        };
      })
    }));

    addSystemLog(
      "ASSISTANCE_APPLICATION_REVIEWED",
      "Organization Reviewer",
      `Application #${applicationId} updated to ${newStatus}.`,
      "grant"
    );
  };

  // Admin Verification & Moderation
  const updatePharmacyVerification = (pharmacyId, isVerified) => {
    setPharmacies(prev => prev.map(p => p.id === pharmacyId ? {
      ...p,
      isVerified,
      verificationDate: isVerified ? new Date().toISOString().split('T')[0] : null
    } : p));

    addSystemLog(
      isVerified ? "PHARMACY_VERIFIED" : "PHARMACY_VERIFICATION_REVOKED",
      "Admin",
      `Pharmacy #${pharmacyId} verification set to ${isVerified}.`,
      "security"
    );
  };

  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const newStatus = u.status === 'active' ? 'suspended' : 'active';
      return { ...u, status: newStatus };
    }));

    addSystemLog(
      "USER_STATUS_TOGGLED",
      "Admin",
      `Account #${userId} status updated.`,
      "security"
    );
  };

  // Saved / Bookmarks
  const toggleSavePharmacy = (pharmacyId) => {
    setSavedPharmacyIds(prev => 
      prev.includes(pharmacyId) ? prev.filter(id => id !== pharmacyId) : [...prev, pharmacyId]
    );
  };

  const toggleSaveFacility = (facilityId) => {
    setSavedFacilityIds(prev => 
      prev.includes(facilityId) ? prev.filter(id => id !== facilityId) : [...prev, facilityId]
    );
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    setMedicines(initialMedicines);
    setPharmacies(initialPharmacies);
    setInventory(initialInventory);
    setRequests(initialAvailabilityRequests);
    setReminders(initialReminders);
    setFacilities(initialFacilities);
    setAssistanceData(initialAssistancePrograms);
    setHealthArticles(initialHealthArticles);
    setSystemLogs(initialSystemLogs);
    setNotifications(initialNotifications);
    setUsersList(initialUsers);
    setSavedPharmacyIds(['phm_1', 'phm_2']);
    setSavedFacilityIds(['fac_1']);
    localStorage.clear();
    console.info("Demo data reset to factory initial state.");
  };

  const value = {
    medicines,
    pharmacies,
    inventory,
    requests,
    reminders,
    facilities,
    assistanceData,
    healthArticles,
    systemLogs,
    notifications,
    usersList,
    savedPharmacyIds,
    savedFacilityIds,
    addSystemLog,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    submitAvailabilityRequest,
    updateRequestStatus,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addReminder,
    updateReminder,
    deleteReminder,
    recordReminderAction,
    submitAssistanceApplication,
    updateAssistanceStatus,
    updatePharmacyVerification,
    toggleUserStatus,
    toggleSavePharmacy,
    toggleSaveFacility,
    resetDemoData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
