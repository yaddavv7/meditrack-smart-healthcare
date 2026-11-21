// Realistic Demo & Seed Data for MediTrack Platform

export const initialUsers = [
  {
    id: "usr_pat_1",
    name: "Sarah Jenkins",
    email: "patient@meditrack.org",
    role: "patient",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
    city: "Metropolis Central",
    status: "active",
    joinedAt: "2026-01-15T10:00:00Z"
  },
  {
    id: "usr_phm_1",
    name: "Dr. Marcus Vance, PharmD",
    email: "pharmacist@meditrack.org",
    role: "pharmacist",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-6789",
    pharmacyId: "phm_1",
    pharmacyName: "Vance Central Pharmacy & Care",
    licenseNumber: "RPH-94821-NY",
    verificationStatus: "verified",
    status: "active",
    joinedAt: "2025-11-10T08:30:00Z"
  },
  {
    id: "usr_prv_1",
    name: "Dr. Elena Rostova, MD",
    email: "provider@meditrack.org",
    role: "provider",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
    facilityId: "fac_1",
    facilityName: "St. Jude Comprehensive Medical Center",
    medicalLicense: "MED-55102-NY",
    specialty: "Internal Medicine & Chronic Care",
    verificationStatus: "verified",
    status: "active",
    joinedAt: "2025-12-05T09:15:00Z"
  },
  {
    id: "usr_adm_1",
    name: "Platform Chief Administrator",
    email: "admin@meditrack.org",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 999-0000",
    badge: "SuperAdmin",
    status: "active",
    joinedAt: "2025-01-01T00:00:00Z"
  }
];

export const initialMedicines = [
  {
    id: "med_1",
    name: "Amoxicillin",
    brandNames: ["Amoxil", "Moxatag", "Trimox"],
    genericName: "Amoxicillin Trihydrate",
    category: "Antibiotics",
    formulation: "Capsule",
    strength: "500 mg",
    indications: "Bacterial respiratory tract infections, otitis media, skin and urinary tract infections.",
    commonUsage: "Taken orally every 8 or 12 hours with or without food. Complete the entire course as prescribed.",
    storage: "Store at 20°C to 25°C (68°F to 77°F). Keep in tight, light-resistant container away from excessive moisture.",
    safetyWarnings: "Contraindicated in patients with severe penicillin allergy. May cause gastrointestinal upset or rash.",
    source: "WHO Model Formulary & U.S. National Library of Medicine",
    lastReviewed: "2026-08-10",
    isVerified: true
  },
  {
    id: "med_2",
    name: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Fortamet", "Glumetza"],
    genericName: "Metformin HCl",
    category: "Endocrinology / Diabetes",
    formulation: "Extended-Release Tablet",
    strength: "500 mg",
    indications: "First-line management of Type 2 Diabetes Mellitus to improve glycemic control.",
    commonUsage: "Usually taken once daily with the evening meal. Swallow whole; do not crush or chew extended-release forms.",
    storage: "Store at controlled room temperature between 20°C and 25°C. Protect from light and humidity.",
    safetyWarnings: "Risk of lactic acidosis in severe renal impairment. Avoid excessive alcohol consumption.",
    source: "American Diabetes Association Standards & FDA Drug Database",
    lastReviewed: "2026-09-01",
    isVerified: true
  },
  {
    id: "med_3",
    name: "Atorvastatin Calcium",
    brandNames: ["Lipitor", "Atorva"],
    genericName: "Atorvastatin Calcium Trihydrate",
    category: "Cardiovascular / Lipid Lowering",
    formulation: "Film-Coated Tablet",
    strength: "20 mg",
    indications: "Primary hyperlipidemia and prevention of cardiovascular events in high-risk patients.",
    commonUsage: "Take once daily, at any time of day, with or without food. Consistency in daily timing is recommended.",
    storage: "Store in original packaging at 20°C to 25°C. Avoid damp bathroom cabinets.",
    safetyWarnings: "Report unexplained muscle pain, tenderness, or weakness immediately. Contraindicated in active liver disease.",
    source: "AHA/ACC Cholesterol Clinical Guidelines & DailyMed",
    lastReviewed: "2026-07-22",
    isVerified: true
  },
  {
    id: "med_4",
    name: "Salbutamol (Albuterol)",
    brandNames: ["Ventolin", "ProAir", "Proventil"],
    genericName: "Albuterol Sulfate",
    category: "Respiratory / Bronchodilator",
    formulation: "Metered-Dose Inhaler (HFA)",
    strength: "100 mcg/actuation",
    indications: "Relief and prevention of bronchospasm in asthma and reversible obstructive airway disease.",
    commonUsage: "Inhale 1 to 2 puffs every 4 to 6 hours as needed for symptoms. Prime inhaler before first use or if unused for 14 days.",
    storage: "Store upright between 15°C and 25°C. Contents under pressure; do not puncture or expose to open flame.",
    safetyWarnings: "May cause transient tachycardia or tremor. If rescue inhaler is needed more than twice weekly, review asthma action plan.",
    source: "Global Initiative for Asthma (GINA) & FDA Monograph",
    lastReviewed: "2026-10-05",
    isVerified: true
  },
  {
    id: "med_5",
    name: "Paracetamol (Acetaminophen)",
    brandNames: ["Tylenol", "Panadol", "Calpol"],
    genericName: "Acetaminophen",
    category: "Analgesics & Antipyretics",
    formulation: "Oral Tablet",
    strength: "500 mg",
    indications: "Mild to moderate pain relief and reduction of fever.",
    commonUsage: "1 to 2 tablets every 4 to 6 hours as needed. Do not exceed 4,000 mg (8 tablets) in a 24-hour period.",
    storage: "Keep in a dry place at room temperature. Keep tightly sealed.",
    safetyWarnings: "Severe liver damage hazard if maximum daily dose is exceeded or combined with other acetaminophen products.",
    source: "WHO Essential Medicines List & FDA OTC Drug Review",
    lastReviewed: "2026-06-15",
    isVerified: true
  },
  {
    id: "med_6",
    name: "Losartan Potassium",
    brandNames: ["Cozaar"],
    genericName: "Losartan Potassium",
    category: "Cardiovascular / Antihypertensive",
    formulation: "Oral Tablet",
    strength: "500 mg",
    indications: "Management of essential hypertension and nephropathy in Type 2 diabetic patients.",
    commonUsage: "Typically taken once daily with or without food. Blood pressure should be monitored regularly.",
    storage: "Store at 25°C (77°F); excursions permitted to 15-30°C. Protect from light.",
    safetyWarnings: "Contraindicated in pregnancy (fetal toxicity). Monitor serum potassium and renal function.",
    source: "JNC 8 Hypertension Guidelines & DailyMed",
    lastReviewed: "2026-08-30",
    isVerified: true
  },
  {
    id: "med_7",
    name: "Omeprazole",
    brandNames: ["Prilosec", "Losec"],
    genericName: "Omeprazole Magnesium",
    category: "Gastrointestinal / PPI",
    formulation: "Delayed-Release Capsule",
    strength: "20 mg",
    indications: "Gastroesophageal reflux disease (GERD), gastric ulcers, and erosive esophagitis.",
    commonUsage: "Take once daily in the morning, 30 to 60 minutes prior to a meal. Swallow whole with water.",
    storage: "Store at 15°C to 30°C. Protect from moisture.",
    safetyWarnings: "Prolonged use (>1 year) may reduce magnesium and B12 absorption and increase bone fracture risk.",
    source: "ACG Clinical Guidelines & FDA Approved Label",
    lastReviewed: "2026-05-18",
    isVerified: true
  },
  {
    id: "med_8",
    name: "Cetirizine Hydrochloride",
    brandNames: ["Zyrtec", "Reactine"],
    genericName: "Cetirizine HCl",
    category: "Antihistamines / Allergy",
    formulation: "Film-Coated Tablet",
    strength: "10 mg",
    indications: "Relief of symptoms associated with seasonal allergic rhinitis, perennial allergic rhinitis, and chronic urticaria.",
    commonUsage: "One tablet once daily. May be taken with or without meals.",
    storage: "Store between 20°C and 25°C. Keep out of reach of children.",
    safetyWarnings: "May cause drowsiness in sensitive individuals. Avoid alcohol and sedatives while taking.",
    source: "FDA Drug Database & National Allergy Bureau",
    lastReviewed: "2026-04-12",
    isVerified: true
  },
  {
    id: "med_9",
    name: "Azithromycin",
    brandNames: ["Zithromax", "Z-Pak"],
    genericName: "Azithromycin Dihydrate",
    category: "Antibiotics / Macrolide",
    formulation: "Oral Tablet",
    strength: "250 mg",
    indications: "Mild to moderate bacterial infections of the respiratory tract, skin, and sexually transmitted infections.",
    commonUsage: "Commonly 500 mg as single dose on Day 1, followed by 250 mg once daily on Days 2 through 5.",
    storage: "Store at 15°C to 30°C (59°F to 86°F).",
    safetyWarnings: "Potential for QT interval prolongation in predisposed cardiovascular patients.",
    source: "Infectious Diseases Society of America (IDSA)",
    lastReviewed: "2026-09-14",
    isVerified: true
  },
  {
    id: "med_10",
    name: "Insulin Glargine",
    brandNames: ["Lantus", "Basaglar", "Toujeo"],
    genericName: "Insulin Glargine Recombinant",
    category: "Endocrinology / Insulin",
    formulation: "Subcutaneous Solution (Pen)",
    strength: "100 units/mL",
    indications: "Long-acting basal insulin for glycemic control in Type 1 and Type 2 Diabetes.",
    commonUsage: "Injected subcutaneously once daily at the same time each day. Rotate injection sites consistently.",
    storage: "Unopened pens must be refrigerated (2°C to 8°C). Open pens stay at room temperature (<30°C) for up to 28 days.",
    safetyWarnings: "Risk of hypoglycemia. Never share insulin injection pens or needles between individuals.",
    source: "ADA Clinical Practice Recommendations",
    lastReviewed: "2026-10-18",
    isVerified: true
  },
  {
    id: "med_11",
    name: "Amlodipine Besylate",
    brandNames: ["Norvasc"],
    genericName: "Amlodipine Besylate",
    category: "Cardiovascular / Calcium Channel Blocker",
    formulation: "Oral Tablet",
    strength: "5 mg",
    indications: "Treatment of hypertension and chronic stable angina.",
    commonUsage: "Take once daily with or without food. Initial dosage is commonly 5 mg daily.",
    storage: "Store at controlled room temperature 15°C to 30°C in a dry location.",
    safetyWarnings: "Peripheral edema and dizziness may occur, particularly at higher doses.",
    source: "American Heart Association Guidelines",
    lastReviewed: "2026-08-04",
    isVerified: true
  },
  {
    id: "med_12",
    name: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Nurofen"],
    genericName: "Ibuprofen",
    category: "Analgesics / NSAID",
    formulation: "Coated Tablet",
    strength: "400 mg",
    indications: "Relief of inflammatory pain, headache, dental pain, and dysmenorrhea.",
    commonUsage: "Take 1 tablet every 4 to 6 hours with food or milk to minimize gastric discomfort.",
    storage: "Store at 20°C to 25°C. Avoid excessive heat and humidity.",
    safetyWarnings: "Increased risk of GI bleeding and cardiovascular thrombotic events with prolonged high doses.",
    source: "FDA Safety Communications & BNF",
    lastReviewed: "2026-07-11",
    isVerified: true
  }
];

export const initialPharmacies = [
  {
    id: "phm_1",
    name: "Vance Central Pharmacy & Care",
    ownerId: "usr_phm_1",
    address: "742 Evergreen Blvd, Midtown Health District",
    phone: "+1 (555) 345-6789",
    operatingHours: "Mon-Sat: 08:00 AM - 10:00 PM | Sun: 09:00 AM - 07:00 PM",
    lat: 40.730610,
    lng: -73.935242,
    licenseNumber: "RPH-94821-NY",
    isVerified: true,
    verificationDate: "2025-11-12",
    rating: 4.9,
    reviewCount: 148,
    acceptsDigitalPrescriptions: true,
    hasDelivery: true,
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "phm_2",
    name: "Apex Community Wellness Apothecary",
    ownerId: "usr_phm_2",
    address: "128 Oak Avenue, North Park Plaza",
    phone: "+1 (555) 789-1234",
    operatingHours: "Open 24 Hours / 7 Days",
    lat: 40.748817,
    lng: -73.985428,
    licenseNumber: "RPH-82711-NY",
    isVerified: true,
    verificationDate: "2025-08-20",
    rating: 4.8,
    reviewCount: 230,
    acceptsDigitalPrescriptions: true,
    hasDelivery: true,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "phm_3",
    name: "HealthBridge Express Pharmacy",
    ownerId: "usr_phm_3",
    address: "512 University Way, Westside Medical Row",
    phone: "+1 (555) 432-8765",
    operatingHours: "Mon-Fri: 07:30 AM - 09:00 PM | Sat: 08:00 AM - 06:00 PM",
    lat: 40.712776,
    lng: -74.005974,
    licenseNumber: "RPH-71629-NY",
    isVerified: true,
    verificationDate: "2026-01-08",
    rating: 4.6,
    reviewCount: 94,
    acceptsDigitalPrescriptions: true,
    hasDelivery: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "phm_4",
    name: "GreenCross Neighborhood Chemists",
    ownerId: "usr_phm_4",
    address: "89 Market Square, Old Town District",
    phone: "+1 (555) 654-9870",
    operatingHours: "Mon-Sat: 09:00 AM - 08:00 PM | Closed Sundays",
    lat: 40.721415,
    lng: -73.998421,
    licenseNumber: "RPH-65412-NY",
    isVerified: true,
    verificationDate: "2025-06-14",
    rating: 4.7,
    reviewCount: 112,
    acceptsDigitalPrescriptions: false,
    hasDelivery: true,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "phm_5",
    name: "Metro Meds Discount Rx",
    ownerId: "usr_phm_5",
    address: "304 Riverside Dr, East River Boulevard",
    phone: "+1 (555) 987-2345",
    operatingHours: "Mon-Fri: 08:30 AM - 07:30 PM | Sat: 09:00 AM - 05:00 PM",
    lat: 40.758896,
    lng: -73.985130,
    licenseNumber: "RPH-54320-NY",
    isVerified: false, // Unverified demo example for moderation review
    verificationDate: null,
    rating: 4.1,
    reviewCount: 38,
    acceptsDigitalPrescriptions: true,
    hasDelivery: false,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&auto=format&fit=crop&q=80"
  }
];

export const initialInventory = [
  // Vance Central Pharmacy (phm_1)
  {
    id: "inv_1",
    pharmacyId: "phm_1",
    medicineId: "med_1",
    status: "available", // "available", "reported", "out_of_stock", "requested"
    stockQuantity: 42,
    listedPrice: 14.50,
    lowStockThreshold: 15,
    lastConfirmedAt: "2026-11-21T11:30:00Z", // Fresh (within a few hours)
    requiresPrescription: true
  },
  {
    id: "inv_2",
    pharmacyId: "phm_1",
    medicineId: "med_2",
    status: "available",
    stockQuantity: 88,
    listedPrice: 9.75,
    lowStockThreshold: 20,
    lastConfirmedAt: "2026-11-21T09:15:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_3",
    pharmacyId: "phm_1",
    medicineId: "med_4",
    status: "available",
    stockQuantity: 18,
    listedPrice: 28.00,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-20T17:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_4",
    pharmacyId: "phm_1",
    medicineId: "med_5",
    status: "available",
    stockQuantity: 120,
    listedPrice: 5.25,
    lowStockThreshold: 25,
    lastConfirmedAt: "2026-11-21T13:00:00Z",
    requiresPrescription: false
  },
  {
    id: "inv_5",
    pharmacyId: "phm_1",
    medicineId: "med_10",
    status: "available",
    stockQuantity: 12,
    listedPrice: 65.00,
    lowStockThreshold: 10, // Close to threshold
    lastConfirmedAt: "2026-11-21T10:00:00Z",
    requiresPrescription: true
  },

  // Apex Community Wellness (phm_2)
  {
    id: "inv_6",
    pharmacyId: "phm_2",
    medicineId: "med_1",
    status: "available",
    stockQuantity: 25,
    listedPrice: 15.00,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-21T08:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_7",
    pharmacyId: "phm_2",
    medicineId: "med_3",
    status: "available",
    stockQuantity: 64,
    listedPrice: 18.50,
    lowStockThreshold: 15,
    lastConfirmedAt: "2026-11-20T14:20:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_8",
    pharmacyId: "phm_2",
    medicineId: "med_7",
    status: "reported", // Reported earlier, not recently confirmed
    stockQuantity: 30,
    listedPrice: 12.90,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-17T12:00:00Z", // Stale
    requiresPrescription: false
  },
  {
    id: "inv_9",
    pharmacyId: "phm_2",
    medicineId: "med_4",
    status: "out_of_stock",
    stockQuantity: 0,
    listedPrice: 26.50,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-20T18:00:00Z",
    requiresPrescription: true
  },

  // HealthBridge Express (phm_3)
  {
    id: "inv_10",
    pharmacyId: "phm_3",
    medicineId: "med_1",
    status: "reported",
    stockQuantity: 14,
    listedPrice: 13.90,
    lowStockThreshold: 15,
    lastConfirmedAt: "2026-11-18T16:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_11",
    pharmacyId: "phm_3",
    medicineId: "med_2",
    status: "available",
    stockQuantity: 45,
    listedPrice: 8.99,
    lowStockThreshold: 15,
    lastConfirmedAt: "2026-11-21T12:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_12",
    pharmacyId: "phm_3",
    medicineId: "med_6",
    status: "available",
    stockQuantity: 34,
    listedPrice: 16.20,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-21T11:45:00Z",
    requiresPrescription: true
  },

  // GreenCross (phm_4)
  {
    id: "inv_13",
    pharmacyId: "phm_4",
    medicineId: "med_3",
    status: "available",
    stockQuantity: 29,
    listedPrice: 17.80,
    lowStockThreshold: 12,
    lastConfirmedAt: "2026-11-21T07:30:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_14",
    pharmacyId: "phm_4",
    medicineId: "med_9",
    status: "available",
    stockQuantity: 19,
    listedPrice: 22.40,
    lowStockThreshold: 8,
    lastConfirmedAt: "2026-11-20T19:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_15",
    pharmacyId: "phm_4",
    medicineId: "med_8",
    status: "available",
    stockQuantity: 55,
    listedPrice: 7.50,
    lowStockThreshold: 15,
    lastConfirmedAt: "2026-11-21T09:00:00Z",
    requiresPrescription: false
  },

  // Metro Meds (phm_5)
  {
    id: "inv_16",
    pharmacyId: "phm_5",
    medicineId: "med_11",
    status: "available",
    stockQuantity: 40,
    listedPrice: 11.00,
    lowStockThreshold: 10,
    lastConfirmedAt: "2026-11-19T10:00:00Z",
    requiresPrescription: true
  },
  {
    id: "inv_17",
    pharmacyId: "phm_5",
    medicineId: "med_12",
    status: "available",
    stockQuantity: 70,
    listedPrice: 4.80,
    lowStockThreshold: 20,
    lastConfirmedAt: "2026-11-21T10:30:00Z",
    requiresPrescription: false
  }
];

export const initialAvailabilityRequests = [
  {
    id: "req_101",
    patientId: "usr_pat_1",
    patientName: "Sarah Jenkins",
    patientPhone: "+1 (555) 234-5678",
    pharmacyId: "phm_1",
    pharmacyName: "Vance Central Pharmacy & Care",
    medicineId: "med_1",
    medicineName: "Amoxicillin",
    formulation: "Capsule, 500 mg",
    requestedQuantity: 21,
    status: "confirmed", // "pending", "confirmed", "unavailable", "ready_for_collection", "completed", "cancelled"
    urgency: "standard",
    patientNotes: "Doctor prescribed 500mg tid x 7 days for ear infection. Need to pick up this afternoon.",
    pharmacistNotes: "Full pack of 21 capsules set aside under Sarah J. Ready when you arrive.",
    createdAt: "2026-11-21T10:15:00Z",
    updatedAt: "2026-11-21T11:00:00Z",
    timeline: [
      { status: "pending", timestamp: "2026-11-21T10:15:00Z", message: "Request sent to pharmacy." },
      { status: "confirmed", timestamp: "2026-11-21T11:00:00Z", message: "Pharmacist Dr. Vance confirmed availability." }
    ]
  },
  {
    id: "req_102",
    patientId: "usr_pat_1",
    patientName: "Sarah Jenkins",
    patientPhone: "+1 (555) 234-5678",
    pharmacyId: "phm_2",
    pharmacyName: "Apex Community Wellness Apothecary",
    medicineId: "med_4",
    medicineName: "Salbutamol (Albuterol)",
    formulation: "Inhaler, 100 mcg",
    requestedQuantity: 1,
    status: "unavailable",
    urgency: "urgent",
    patientNotes: "Current rescue inhaler is empty, looking for immediate stock.",
    pharmacistNotes: "Currently out of stock on HFA 100mcg. Awaiting delivery by Monday morning.",
    createdAt: "2026-11-20T16:20:00Z",
    updatedAt: "2026-11-20T17:10:00Z",
    timeline: [
      { status: "pending", timestamp: "2026-11-20T16:20:00Z", message: "Request sent to pharmacy." },
      { status: "unavailable", timestamp: "2026-11-20T17:10:00Z", message: "Pharmacy reported stock unavailable." }
    ]
  },
  {
    id: "req_103",
    patientId: "usr_pat_2",
    patientName: "David Miller",
    patientPhone: "+1 (555) 777-3344",
    pharmacyId: "phm_1",
    pharmacyName: "Vance Central Pharmacy & Care",
    medicineId: "med_10",
    medicineName: "Insulin Glargine",
    formulation: "Solution Pen, 100 units/mL",
    requestedQuantity: 2,
    status: "ready_for_collection",
    urgency: "urgent",
    patientNotes: "Need cold-stored pens. Refill authorization on file with Dr. Rostova.",
    pharmacistNotes: "Prescription verified. Kept in pharmaceutical refrigeration box #2.",
    createdAt: "2026-11-21T08:30:00Z",
    updatedAt: "2026-11-21T12:00:00Z",
    timeline: [
      { status: "pending", timestamp: "2026-11-21T08:30:00Z", message: "Request received." },
      { status: "confirmed", timestamp: "2026-11-21T09:10:00Z", message: "Availability confirmed." },
      { status: "ready_for_collection", timestamp: "2026-11-21T12:00:00Z", message: "Prescription packaged and ready for pickup." }
    ]
  },
  {
    id: "req_104",
    patientId: "usr_pat_3",
    patientName: "Maria Garcia",
    patientPhone: "+1 (555) 888-9900",
    pharmacyId: "phm_1",
    pharmacyName: "Vance Central Pharmacy & Care",
    medicineId: "med_2",
    medicineName: "Metformin Hydrochloride",
    formulation: "ER Tablet, 500 mg",
    requestedQuantity: 60,
    status: "pending",
    urgency: "standard",
    patientNotes: "Monthly maintenance supply request. Can collect tomorrow morning.",
    pharmacistNotes: "",
    createdAt: "2026-11-21T14:45:00Z",
    updatedAt: "2026-11-21T14:45:00Z",
    timeline: [
      { status: "pending", timestamp: "2026-11-21T14:45:00Z", message: "Request submitted by patient." }
    ]
  }
];

export const initialReminders = [
  {
    id: "rem_1",
    userId: "usr_pat_1",
    medicineName: "Metformin HCl",
    dosage: "500 mg",
    unit: "Tablet",
    frequency: "Twice daily",
    timesOfDay: ["08:00", "20:00"],
    startDate: "2026-11-01",
    endDate: "2027-05-01",
    instructions: "Take with meals to avoid stomach upset. Entered per Dr. Rostova's instruction.",
    isActive: true,
    history: [
      { date: "2026-11-21", time: "08:00", status: "taken", recordedAt: "2026-11-21T08:05:00Z" },
      { date: "2026-11-20", time: "20:00", status: "taken", recordedAt: "2026-11-20T20:12:00Z" },
      { date: "2026-11-20", time: "08:00", status: "taken", recordedAt: "2026-11-20T08:02:00Z" },
      { date: "2026-11-19", time: "20:00", status: "taken", recordedAt: "2026-11-19T20:30:00Z" }
    ],
    streakDays: 8,
    adherenceRate: 94
  },
  {
    id: "rem_2",
    userId: "usr_pat_1",
    medicineName: "Atorvastatin Calcium",
    dosage: "20 mg",
    unit: "Tablet",
    frequency: "Once daily",
    timesOfDay: ["21:30"],
    startDate: "2026-10-15",
    endDate: "2027-04-15",
    instructions: "Take in the evening. As instructed by cardiologist.",
    isActive: true,
    history: [
      { date: "2026-11-20", time: "21:30", status: "taken", recordedAt: "2026-11-20T21:35:00Z" },
      { date: "2026-11-19", time: "21:30", status: "taken", recordedAt: "2026-11-19T21:40:00Z" }
    ],
    streakDays: 14,
    adherenceRate: 98
  },
  {
    id: "rem_3",
    userId: "usr_pat_1",
    medicineName: "Amoxicillin",
    dosage: "500 mg",
    unit: "Capsule",
    frequency: "Three times daily",
    timesOfDay: ["08:00", "14:00", "20:00"],
    startDate: "2026-11-21",
    endDate: "2026-11-28",
    instructions: "Complete all 7 days of treatment even if symptoms improve.",
    isActive: true,
    history: [
      { date: "2026-11-21", time: "08:00", status: "taken", recordedAt: "2026-11-21T08:10:00Z" },
      { date: "2026-11-21", time: "14:00", status: "pending", recordedAt: null }
    ],
    streakDays: 1,
    adherenceRate: 100
  }
];

export const initialFacilities = [
  {
    id: "fac_1",
    name: "St. Jude Comprehensive Medical Center",
    type: "Hospital",
    address: "950 Health Sciences Parkway, Metro Core",
    phone: "+1 (555) 456-7890",
    emergency: true,
    operatingHours: "24 Hours / 7 Days",
    lat: 40.735000,
    lng: -73.990000,
    isVerified: true,
    services: [
      "24/7 Emergency Care",
      "Internal Medicine",
      "Cardiovascular Diagnostics",
      "On-site Clinical Laboratory",
      "Pulmonary Function Testing"
    ],
    rating: 4.8,
    contactEmail: "care@stjudemedical.org",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "fac_2",
    name: "CityCare Community Outpatient Clinic",
    type: "Clinic",
    address: "320 Elm St, Suite 400, North Park",
    phone: "+1 (555) 234-9000",
    emergency: false,
    operatingHours: "Mon-Fri: 08:00 AM - 06:00 PM | Sat: 09:00 AM - 01:00 PM",
    lat: 40.750200,
    lng: -73.980500,
    isVerified: true,
    services: [
      "Family Practice",
      "Pediatric Checkups",
      "Diabetes Management",
      "Routine Vaccinations"
    ],
    rating: 4.7,
    contactEmail: "info@citycareclinic.org",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "fac_3",
    name: "Apex Advanced Diagnostic & Imaging Centre",
    type: "Diagnostic Centre",
    address: "710 Broadway Ave, Midtown",
    phone: "+1 (555) 678-3456",
    emergency: false,
    operatingHours: "Mon-Sat: 07:00 AM - 08:00 PM",
    lat: 40.728000,
    lng: -73.995000,
    isVerified: true,
    services: [
      "MRI & CT Scanning",
      "Digital X-Ray & Ultrasound",
      "Blood Pathology Lab",
      "ECG & Echo Stress Tests"
    ],
    rating: 4.9,
    contactEmail: "lab@apexdiagnostic.com",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "fac_4",
    name: "Riverside Urgent & Walk-in Care",
    type: "Urgent Care",
    address: "415 Riverside Dr, East District",
    phone: "+1 (555) 890-1234",
    emergency: true,
    operatingHours: "Daily: 08:00 AM - 11:00 PM",
    lat: 40.760000,
    lng: -73.978000,
    isVerified: true,
    services: [
      "Minor Wound & Fracture Care",
      "Rapid Strep / Flu / Covid Testing",
      "IV Hydration",
      "Walk-in Prescription Refills"
    ],
    rating: 4.5,
    contactEmail: "walkin@riversideurgent.com",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&auto=format&fit=crop&q=80"
  }
];

export const initialAssistancePrograms = {
  organizations: [
    {
      id: "org_1",
      name: "Global Rx Relief Foundation",
      type: "Non-Profit Humanitarian NGO",
      mission: "Bridging emergency medicine access gaps for low-income families and chronic illness sufferers.",
      totalGrantsDisbursed: "$68,450",
      beneficiariesSupported: 1420,
      verifiedPartner: true,
      supportedCategories: ["Insulin & Diabetes Supplies", "Cardiovascular Maintenance", "Antibiotics"],
      contact: "grants@globalrxrelief.org"
    },
    {
      id: "org_2",
      name: "HealthBridge Community Care Initiative",
      type: "Community Health Trust",
      mission: "Subsidizing copays and direct medicine costs in partnership with verified municipal pharmacies.",
      totalGrantsDisbursed: "$42,100",
      beneficiariesSupported: 890,
      verifiedPartner: true,
      supportedCategories: ["Essential Chronic Disease Rx", "Pediatric Medications"],
      contact: "assist@healthbridgecare.org"
    },
    {
      id: "org_3",
      name: "Metro Patient Compassion Network",
      type: "Charitable Healthcare Alliance",
      mission: "Rapid 48-hour emergency medicine vouchers for individuals without prescription insurance coverage.",
      totalGrantsDisbursed: "$29,800",
      beneficiariesSupported: 615,
      verifiedPartner: true,
      supportedCategories: ["Inhalers / Respiratory", "General Urgent Prescriptions"],
      contact: "support@metropatientaid.org"
    }
  ],
  requests: [
    {
      id: "ast_1",
      applicantId: "usr_pat_1",
      applicantName: "Sarah Jenkins",
      incomeTier: "Below 150% Federal Poverty Level",
      medicineName: "Insulin Glargine Pen (3-Month Supply)",
      estimatedCost: 195.00,
      urgency: "urgent",
      organizationId: "org_1",
      organizationName: "Global Rx Relief Foundation",
      status: "approved", // "under_review", "info_requested", "approved", "disbursed", "rejected"
      grantAmount: 195.00,
      disbursementMethod: "Direct Pharmacy Voucher (Vance Central Pharmacy)",
      voucherCode: "MEDITRACK-AID-78921",
      submittedAt: "2026-11-14T09:00:00Z",
      reviewedAt: "2026-11-16T14:30:00Z",
      notes: "Approved full co-pay assistance for 3 months under chronic endocrine relief program."
    },
    {
      id: "ast_2",
      applicantId: "usr_pat_4",
      applicantName: "Robert Hughes",
      incomeTier: "Temporary Hardship / Uninsured",
      medicineName: "Salbutamol Inhaler & Spacers",
      estimatedCost: 56.00,
      urgency: "standard",
      organizationId: "org_3",
      organizationName: "Metro Patient Compassion Network",
      status: "under_review",
      grantAmount: null,
      disbursementMethod: null,
      voucherCode: null,
      submittedAt: "2026-11-20T11:20:00Z",
      reviewedAt: null,
      notes: "Application pending income verification review by intake committee."
    }
  ]
};

export const initialHealthArticles = [
  {
    id: "art_1",
    title: "Understanding Antibiotic Resistance: Why Completing Your Course Matters",
    author: "Dr. Marcus Vance, PharmD",
    facility: "Vance Central Pharmacy & Care",
    category: "Safe Medication Practices",
    publishedAt: "2026-10-14",
    readTime: "4 min read",
    summary: "Stopping antibiotics early when symptoms subside is one of the leading causes of microbial drug resistance. Learn how to manage treatment safely.",
    content: "When you are prescribed an antibiotic like Amoxicillin, bacteria are exposed to lethal concentrations over a multi-day timeline. If you discontinue therapy after 3 days because you feel better, the hardiest bacteria survive, mutate, and multiply into resistant strains. Always consult your prescriber before adjusting or stopping prescribed antimicrobials.",
    verifiedSource: "CDC Antimicrobial Stewardship Framework",
    tags: ["Antibiotics", "Patient Safety", "Infection Control"]
  },
  {
    id: "art_2",
    title: "Cold Chain Storage Essentials for Insulin & Biologics",
    author: "Dr. Elena Rostova, MD",
    facility: "St. Jude Comprehensive Medical Center",
    category: "Storage & Temperature Control",
    publishedAt: "2026-11-02",
    readTime: "5 min read",
    summary: "Temperature fluctuations can degrade peptide structures in insulin. Here is how to transport and store your medication during transit and home use.",
    content: "Unopened insulin glargine requires strict refrigeration between 2°C and 8°C (36°F to 46°F). Never allow vials or pens to freeze, as ice crystal formation permanently breaks molecular bonds. In-use pens may typically remain at controlled room temperature below 30°C for up to 28 days.",
    verifiedSource: "Endocrine Society Clinical Practice Guidelines",
    tags: ["Diabetes", "Insulin", "Medication Storage"]
  },
  {
    id: "art_3",
    title: "Generic vs. Brand Name Medications: What Every Patient Should Know",
    author: "MediTrack Editorial Board & Clinical Reviewers",
    facility: "National Healthcare Advisory Board",
    category: "Healthcare Literacy",
    publishedAt: "2026-09-28",
    readTime: "6 min read",
    summary: "A breakdown of bioequivalence standards, active pharmaceutical ingredients, and why price differences exist between brand names and generic equivalents.",
    content: "Generic medicines contain the identical active pharmaceutical ingredient (API), strength, dosage form, and route of administration as their brand-name counterparts. Regulatory agencies enforce strict bioequivalence criteria (typically within 80-125% pharmacokinetic confidence interval). However, patients should never alter dosages or substitute medications without doctor or pharmacist confirmation.",
    verifiedSource: "FDA Orange Book & WHO Bioequivalence Guidelines",
    tags: ["Generics", "Affordability", "Regulation"]
  }
];

export const initialSystemLogs = [
  {
    id: "log_1",
    action: "PHARMACY_VERIFICATION_APPROVED",
    user: "Platform Chief Administrator",
    details: "Approved license verification for Vance Central Pharmacy & Care (RPH-94821-NY)",
    timestamp: "2026-11-21T08:00:12Z",
    type: "security"
  },
  {
    id: "log_2",
    action: "INVENTORY_SYNC_BATCH",
    user: "Dr. Marcus Vance (Pharmacist)",
    details: "Updated stock status and prices across 5 registered medicines.",
    timestamp: "2026-11-21T11:30:45Z",
    type: "inventory"
  },
  {
    id: "log_3",
    action: "AVAILABILITY_REQUEST_CONFIRMED",
    user: "Vance Central Pharmacy & Care",
    details: "Confirmed availability for Request #req_101 (Amoxicillin 500mg, 21 capsules)",
    timestamp: "2026-11-21T11:00:22Z",
    type: "coordination"
  },
  {
    id: "log_4",
    action: "ASSISTANCE_GRANT_APPROVED",
    user: "Global Rx Relief Foundation",
    details: "Approved co-pay assistance voucher #MEDITRACK-AID-78921 for applicant Sarah Jenkins.",
    timestamp: "2026-11-16T14:30:19Z",
    type: "grant"
  },
  {
    id: "log_5",
    action: "ACCOUNT_REGISTERED",
    user: "Sarah Jenkins",
    details: "New Patient profile created with verified contact credentials.",
    timestamp: "2026-11-10T12:15:33Z",
    type: "auth"
  }
];

export const initialNotifications = [
  {
    id: "notif_1",
    recipientId: "usr_pat_1",
    recipientRole: "patient",
    title: "Medicine Confirmed Available!",
    message: "Dr. Vance at Vance Central Pharmacy confirmed your request for Amoxicillin 500mg.",
    type: "success",
    link: "/requests",
    isRead: false,
    timestamp: "2026-11-21T11:01:00Z"
  },
  {
    id: "notif_2",
    recipientId: "usr_pat_1",
    recipientRole: "patient",
    title: "Assistance Grant Voucher Issued",
    message: "Your application with Global Rx Relief was approved. Voucher #MEDITRACK-AID-78921 is ready.",
    type: "info",
    link: "/assistance",
    isRead: false,
    timestamp: "2026-11-16T14:31:00Z"
  },
  {
    id: "notif_3",
    recipientId: "usr_phm_1",
    recipientRole: "pharmacist",
    title: "New Medicine Availability Request",
    message: "Maria Garcia submitted an availability request for Metformin HCl 500mg ER (60 tabs).",
    type: "warning",
    link: "/pharmacy-dashboard",
    isRead: false,
    timestamp: "2026-11-21T14:45:00Z"
  },
  {
    id: "notif_4",
    recipientId: "usr_phm_1",
    recipientRole: "pharmacist",
    title: "Low Stock Alert: Insulin Glargine",
    message: "Inventory count for Insulin Glargine Pen (100 units/mL) has reached threshold (12 remaining).",
    type: "error",
    link: "/pharmacy-dashboard",
    isRead: true,
    timestamp: "2026-11-21T10:05:00Z"
  }
];
