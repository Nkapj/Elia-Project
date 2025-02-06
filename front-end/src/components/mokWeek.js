//user 
export const mockUsers = [
    {
      _id: "63e204aa06b26bd2315321f0",
      lastName: "FROOMP",
      firstName: "Timmy",
      id: 25829,
      zone: "ScooterShop",
      job: "technicien",
      guardPerDays: 70,
      admin: false,
      color: "#9ad3bc"            
    },
    {
      _id: "63e204aa06b26bd2315321f1",
      lastName: "Doe",
      firstName: "Jane",
      id: 12345,
      avatar: "jane@dptcact.com",
      zone: "ScooterShop",
      job: "technicien",
      guardPerDays: 5,
      admin: false,
      color: "#f5b461"
    },
    {
      _id: "63e204aa06b26bd2315321f2",
      lastName: "Smith",
      firstName: "John",
      id: 99999,
      avatar: "john@dptcact.com",
      zone: "ScooterShop",
      job: "technicien",
      guardPerDays: 8,
      admin: false,
      color: "#f68f6a"
    }
  ];
  
 //DAYS 
  export const mockDays = [
    {
      _id: "63e204aa06b26bd2315321e0",
      date: "05-02-2025",
      schedule: [
        { period: "8h-16h", guard: "Timmy" },
        { period: "16h-24h", guard: "Serenic" }
      ]
    },
    {
      _id: "63e204aa06b26bd2315321e1",
      date: "06-02-2025",
      schedule: [
        { period: "8h-16h", guard: "Timmy" },
        { period: "16h-24h", guard: "Jane" }
      ]
    },
    {
      _id: "63e204aa06b26bd2315321e2",
      date: "07-02-2025",
      schedule: [
        { period: "8h-16h", guard: "John" },
        { period: "16h-24h", guard: "Timmy" }
      ]
    }
  ];
  
 //WEEKS 

  export const mockWeeks = [
    {
      _id: "63e204aa06b26bd2315321e9",
      startWeek: "04-02-2025",
      endWeek: "08-02-2025",
      assignedUserId: "63e204aa06b26bd2315321f0",
      // Références (IDs) vers les documents "days" qui appartiennent à cette semaine
      days: [
        "63e204aa06b26bd2315321e0",
        "63e204aa06b26bd2315321e1",
        "63e204aa06b26bd2315321e2"
      ]
    },
    {
        _id: "63e204aa06b26bd2315321e9",
        startWeek: "06-03-2025",
        endWeek: "04-05-2025",
        assignedUserId: "63e204aa06b26bd2315321f1",
        // Références (IDs) vers les documents "days" qui appartiennent à cette semaine
        days: [
          "63e204aa06b26bd2315321e0",
          "63e204aa06b26bd2315321e1",
          "63e204aa06b26bd2315321e2"
        ]
      }
  ];
  