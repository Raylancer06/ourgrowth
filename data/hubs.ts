export interface DispatchHub {
  city: string;
  state: string;
  address: string;
  leadTime: string;
  reeferFleet: string;
  phone: string;
  manager: string;
}

export const dispatchHubs: DispatchHub[] = [
  {
    city: "Kolkata & Howrah",
    state: "West Bengal (Head Hub)",
    address: "Cold Store Zone 4, Posta & Barabazar Cold Terminal, Kolkata - 700007",
    leadTime: "Same-Day Dispatch (by 6:00 AM)",
    reeferFleet: "8 Dedicated Chilled Vans",
    phone: "+91 94760 20341",
    manager: "Karan Mehta (Dispatch Head)",
  },
  {
    city: "Mumbai & Navi Mumbai",
    state: "Maharashtra",
    address: "APMC Commercial Sector 19, Vashi Cold-Chain Warehouse, Navi Mumbai - 400703",
    leadTime: "Next-Morning Delivery (24 hrs)",
    reeferFleet: "6 Reefer Trucks",
    phone: "+91 94760 20342",
    manager: "Rohit Shinde (Regional Supply)",
  },
  {
    city: "Bengaluru & Hyderabad",
    state: "South Transit Hub",
    address: "Yeshwanthpur Agro Logistics Hub & Madhapur Cold Terminal",
    leadTime: "24–36 Hours Chilled Transit",
    reeferFleet: "Inter-State Insulated Crates",
    phone: "+91 94760 20343",
    manager: "S. Murthy (South Regional Lead)",
  },
  {
    city: "Delhi NCR",
    state: "North Hub",
    address: "Azadpur Mandi Cold Storage Logistics Hub, Delhi - 110033",
    leadTime: "36–48 Hours Pan-India Reefer",
    reeferFleet: "Scheduled Daily Morning Route",
    phone: "+91 94760 20341",
    manager: "National Wholesale Desk",
  },
];
