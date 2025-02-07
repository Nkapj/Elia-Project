// src/data/mockDb.js

// COLLECTION: Users
export const mockUsers = [
  {
    _id: "63e204aa06b26bd2315321f0",
    firstName: "Timmy",
    lastName: "FROOMP",
    zone: "ScooterShop",
    guardPerDays: 10,
    color: "#9ad3bc"
  },
  {
    _id: "63e204aa06b26bd2315321f1",
    firstName: "Jane",
    lastName: "Doe",
    zone: "ScooterShop",
    guardPerDays: 5,
    color: "#f5b461"
  }
];

// COLLECTION: Days  
// Ici, la date est au format "DD-MM-YYYY".
export const mockDays = [
  // Semaine 1 (du 06-02-2025 au 12-02-2025)
  {
    _id: "day1",
    date: "06-02-2025", // Jeudi (selon vos besoins)
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day2",
    date: "07-02-2025", // Vendredi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day3",
    date: "08-02-2025", // Samedi
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day4",
    date: "09-02-2025", // Dimanche
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day5",
    date: "10-02-2025", // Lundi
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day6",
    date: "11-02-2025", // Mardi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day7",
    date: "12-02-2025", // Mercredi
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },

  // Semaine 2 (du 13-02-2025 au 19-02-2025)
  {
    _id: "day8",
    date: "13-02-2025", // Jeudi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day9",
    date: "14-02-2025", // Vendredi
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day10",
    date: "15-02-2025", // Samedi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day11",
    date: "16-02-2025", // Dimanche
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  },
  {
    _id: "day12",
    date: "17-02-2025", // Lundi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day13",
    date: "18-02-2025", // Mardi
    schedule: [
      { period: "8h-16h", guard: "Timmy" },
      { period: "16h-24h", guard: "Jane" }
    ]
  },
  {
    _id: "day14",
    date: "19-02-2025", // Mercredi
    schedule: [
      { period: "8h-16h", guard: "Jane" },
      { period: "16h-24h", guard: "Timmy" }
    ]
  }
];

// COLLECTION: Weeks  
// On référence ici les jours via leurs _id.
export const mockWeeks = [
  {
    _id: "week1",
    startWeek: "06-02-2025",
    endWeek: "12-02-2025",
    assignedUserId: "63e204aa06b26bd2315321f0", // Par exemple Timmy
    days: ["day1", "day2", "day3", "day4", "day5", "day6", "day7"]
  },
  {
    _id: "week2",
    startWeek: "13-02-2025",
    endWeek: "19-02-2025",
    assignedUserId: "63e204aa06b26bd2315321f1", // Par exemple Jane
    days: ["day8", "day9", "day10", "day11", "day12", "day13", "day14"]
  }
];

  