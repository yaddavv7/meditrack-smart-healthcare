// Extra Innovative Features: Smart Availability Matching & Medicine Access Score

/**
 * Calculates a transparent Medicine Access Score (0 - 100)
 * Evaluates 4 core pillars:
 * 1. Confirmation Freshness (35 pts max)
 * 2. Proximity / Distance (30 pts max)
 * 3. Listing Completeness (20 pts max)
 * 4. Pharmacy Verification (15 pts max)
 */
export function calculateAccessScore(pharmacy, inventoryItem, distanceKm = 2.4) {
  let freshnessScore = 0;
  let distanceScore = 0;
  let completenessScore = 0;
  let verificationScore = 0;

  // 1. Freshness Score (max 35)
  if (inventoryItem.status === 'out_of_stock') {
    freshnessScore = 0;
  } else {
    const lastConfirmed = new Date(inventoryItem.lastConfirmedAt || Date.now());
    const hoursElapsed = (Date.now() - lastConfirmed.getTime()) / (1000 * 60 * 60);

    if (hoursElapsed <= 6) {
      freshnessScore = 35; // Confirmed within 6 hours
    } else if (hoursElapsed <= 24) {
      freshnessScore = 28; // Confirmed today (within 24 hours)
    } else if (hoursElapsed <= 72) {
      freshnessScore = 18; // Confirmed within 3 days
    } else {
      freshnessScore = 8;  // Stale confirmation (> 3 days)
    }
  }

  // 2. Distance Score (max 30)
  if (distanceKm <= 1.5) {
    distanceScore = 30;
  } else if (distanceKm <= 3.5) {
    distanceScore = 25;
  } else if (distanceKm <= 7.0) {
    distanceScore = 18;
  } else if (distanceKm <= 15.0) {
    distanceScore = 12;
  } else {
    distanceScore = 6;
  }

  // 3. Listing Completeness (max 20)
  if (inventoryItem.listedPrice && inventoryItem.listedPrice > 0) completenessScore += 8;
  if (inventoryItem.stockQuantity !== undefined && inventoryItem.stockQuantity > 0) completenessScore += 6;
  if (inventoryItem.requiresPrescription !== undefined) completenessScore += 3;
  if (inventoryItem.lowStockThreshold) completenessScore += 3;

  // 4. Pharmacy Verification (max 15)
  if (pharmacy?.isVerified) {
    verificationScore = 15;
  } else {
    verificationScore = 4;
  }

  const totalScore = Math.min(100, Math.round(freshnessScore + distanceScore + completenessScore + verificationScore));

  let tier = "Limited Access";
  let badgeColor = "bg-rose-100 text-rose-800 border-rose-200";
  let progressColor = "bg-rose-500";

  if (totalScore >= 85) {
    tier = "Optimal Access";
    badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
    progressColor = "bg-emerald-500";
  } else if (totalScore >= 70) {
    tier = "High Access";
    badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
    progressColor = "bg-blue-500";
  } else if (totalScore >= 50) {
    tier = "Moderate Access";
    badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
    progressColor = "bg-amber-500";
  }

  return {
    score: totalScore,
    tier,
    badgeColor,
    progressColor,
    breakdown: {
      freshness: {
        points: freshnessScore,
        max: 35,
        detail: freshnessScore === 35 ? "Confirmed within last 6 hours" :
                freshnessScore === 28 ? "Confirmed within 24 hours" :
                freshnessScore === 18 ? "Reported within past 3 days" : "Older inventory record / Unconfirmed"
      },
      distance: {
        points: distanceScore,
        max: 30,
        detail: `${distanceKm.toFixed(1)} km away from your location`
      },
      completeness: {
        points: completenessScore,
        max: 20,
        detail: `${completenessScore}/20 transparent details listed (price, stock, prescription rule)`
      },
      verification: {
        points: verificationScore,
        max: 15,
        detail: pharmacy?.isVerified ? "Verified state pharmacy license on file" : "Verification pending"
      }
    }
  };
}

/**
 * Smart Availability Matching Engine
 * Compares query against verified medicine identifiers and formulation details.
 */
export function matchMedicines({
  medicines = [],
  inventory = [],
  pharmacies = [],
  query = "",
  filters = {}
}) {
  const normalizedQuery = (query || "").trim().toLowerCase();

  // Build unified inventory records
  const unifiedRecords = [];

  inventory.forEach(invItem => {
    const medicine = medicines.find(m => m.id === invItem.medicineId);
    const pharmacy = pharmacies.find(p => p.id === invItem.pharmacyId);

    if (!medicine || !pharmacy) return;

    // Simulate distance based on coordinates or defaults
    const simulatedDistances = {
      phm_1: 1.2,
      phm_2: 2.8,
      phm_3: 4.1,
      phm_4: 3.5,
      phm_5: 6.2
    };
    const distanceKm = simulatedDistances[pharmacy.id] || 3.0;

    const accessScore = calculateAccessScore(pharmacy, invItem, distanceKm);

    // Matching logic
    let matchType = null; // 'exact', 'brand', 'generic', 'category', 'none'
    let matchReasons = [];

    if (!normalizedQuery) {
      matchType = 'all';
      matchReasons.push("Browsing full catalogue");
    } else {
      const nameMatch = medicine.name.toLowerCase().includes(normalizedQuery);
      const brandMatch = medicine.brandNames?.some(b => b.toLowerCase().includes(normalizedQuery));
      const genericMatch = medicine.genericName.toLowerCase().includes(normalizedQuery);
      const categoryMatch = medicine.category.toLowerCase().includes(normalizedQuery);
      const formulationMatch = medicine.formulation.toLowerCase().includes(normalizedQuery) ||
                               medicine.strength.toLowerCase().includes(normalizedQuery);

      if (nameMatch) {
        matchType = 'exact';
        matchReasons.push(`Exact medicine name match: "${medicine.name}"`);
      } else if (brandMatch) {
        matchType = 'brand';
        const matchedBrand = medicine.brandNames.find(b => b.toLowerCase().includes(normalizedQuery));
        matchReasons.push(`Matched registered brand name: "${matchedBrand}"`);
      } else if (genericMatch) {
        matchType = 'generic';
        matchReasons.push(`Matched active pharmaceutical ingredient: "${medicine.genericName}"`);
      } else if (formulationMatch) {
        matchType = 'formulation';
        matchReasons.push(`Matched formulation detail: ${medicine.strength} ${medicine.formulation}`);
      } else if (categoryMatch) {
        matchType = 'category';
        matchReasons.push(`Matched therapeutic category: "${medicine.category}"`);
      }
    }

    if (!matchType) return; // Not matched

    // Reason explanation breakdown
    if (invItem.status === 'available') {
      matchReasons.push("Verified stock currently available at pharmacy");
    } else if (invItem.status === 'reported') {
      matchReasons.push("Stock reported by pharmacy staff (confirmation freshness >24h)");
    } else {
      matchReasons.push("Currently out of stock (request confirmation enabled)");
    }

    matchReasons.push(`${distanceKm.toFixed(1)} km distance • $${invItem.listedPrice.toFixed(2)} listed`);

    unifiedRecords.push({
      id: `${invItem.id}_${pharmacy.id}`,
      inventoryId: invItem.id,
      medicine,
      pharmacy,
      inventoryItem: invItem,
      distanceKm,
      accessScore,
      matchType,
      matchReasons,
      isExactFormulation: matchType === 'exact' || matchType === 'brand' || matchType === 'generic'
    });
  });

  // Apply filters
  let filtered = unifiedRecords.filter(item => {
    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (item.inventoryItem.status !== filters.status) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (item.medicine.category !== filters.category) return false;
    }

    // Max Price filter
    if (filters.maxPrice && item.inventoryItem.listedPrice > Number(filters.maxPrice)) {
      return false;
    }

    // Max Distance filter
    if (filters.maxDistance && item.distanceKm > Number(filters.maxDistance)) {
      return false;
    }

    // Only Verified Pharmacies filter
    if (filters.verifiedOnly && !item.pharmacy.isVerified) {
      return false;
    }

    return true;
  });

  // Sort: by default sort by Access Score descending, or user choice
  if (filters.sortBy === 'price_low') {
    filtered.sort((a, b) => a.inventoryItem.listedPrice - b.inventoryItem.listedPrice);
  } else if (filters.sortBy === 'distance') {
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (filters.sortBy === 'freshness') {
    filtered.sort((a, b) => new Date(b.inventoryItem.lastConfirmedAt) - new Date(a.inventoryItem.lastConfirmedAt));
  } else {
    // Default: Best Medicine Access Score
    filtered.sort((a, b) => b.accessScore.score - a.accessScore.score);
  }

  return filtered;
}
