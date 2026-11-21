# MediTrack – Smart Medicine & Healthcare Access Platform

MediTrack is a modern, responsive, and functional web application for discovering medicine availability, comparing listed pharmacy prices, tracking personal medicine schedules, requesting stock confirmations from pharmacies, and coordinating medicine assistance.

> **Important Clinical & Ethical Disclaimer:** MediTrack is a healthcare coordination and availability discovery platform, not a medical diagnosis tool. It never prescribes medicines, recommends changing doses, or claims that an alternative medicine is clinically equivalent. Medicine substitutions must be confirmed by a qualified pharmacist or doctor.

---

## Quick Start Guide

### 1. Project Directory
The project is located at:
`C:\Users\user\.gemini\antigravity\scratch\meditrack`

You can open this folder directly in your IDE or terminal.

### 2. Running the Development Server
```bash
cd C:\Users\user\.gemini\antigravity\scratch\meditrack
npm run dev
```
Open **`http://localhost:5174/`** (or port specified in terminal) in any modern browser.

### 3. Dual-Mode Backend Configuration
- **Interactive Demo Mode (Active by default):** Runs automatically out-of-the-box with realistic pre-seeded data, reactive state management, and persistent browser storage. No setup or API keys needed.
- **Firebase Live Mode:** Add your Firebase credentials to `.env`:
  ```env
  VITE_FIREBASE_API_KEY=your_key
  VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```

---

## 4 User Roles & Personas
Use the **Quick Role Switcher** pill located in the top navbar to instantly test all 4 roles:
1. **Patient / General User:** Sarah Jenkins (`patient@meditrack.org`)
2. **Pharmacist / Pharmacy Owner:** Dr. Marcus Vance, PharmD (`pharmacist@meditrack.org`)
3. **Healthcare Provider:** Dr. Elena Rostova, MD (`provider@meditrack.org`)
4. **Platform Administrator:** Chief Administrator (`admin@meditrack.org`)

---

## Key Features Implemented

1. **Smart Availability Matching:** Verified molecular identifiers, brand and generic matching, exact formulation differentiation, and match reason explanations.
2. **Medicine Access Score (0–100):** Transparent 4-pillar score (Confirmation Freshness 35pts, Proximity 30pts, Listing Completeness 20pts, Pharmacy Verification 15pts) with interactive formula breakdown modal.
3. **Medicine Availability Request System:** End-to-end request workflow (`pending` $\rightarrow$ `confirmed` $\rightarrow$ `ready_for_collection` $\rightarrow$ `completed`) with audit timestamps.
4. **Interactive Leaflet & OpenStreetMap:** Real-time pharmacy & clinic map with custom pins, split/list/map view toggles, and external navigation links.
5. **Smart Medicine Reminders:** Schedule management, adherence percentage tracking, and unbroken streak day counters.
6. **Medicine Information Centre:** Verified reference monographs from WHO and FDA guidelines with clear unverified fallbacks and storage conditions.
7. **Medicine Assistance Programme:** Social-impact portal connecting patients with partner charities (Global Rx Relief, HealthBridge Care) for co-pay vouchers.
8. **Pharmacy Dashboard:** Inventory table with stock adjustments, low-stock threshold triggers, request queue, and Recharts analytics.
9. **Admin Control Center:** Pharmacy license verification queue, user moderation (suspend/activate), audit logs, and platform analytics.
