// Mock data for the PlayStation gaming club admin panel

export type RoomStatus = "free" | "booked" | "occupied" | "cleaning";

export interface Room {
  id: string;
  name: string;
  consoleType: "PS5" | "PS4";
  status: RoomStatus;
  currentBookingId?: string;
  occupiedSince?: Date;
  occupiedUntil?: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: Date;
  totalVisits: number;
  totalSpent: number;
  lastVisit?: Date;
}

export interface Booking {
  id: string;
  roomId: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  totalAmount: number;
  paid: boolean;
}

export interface Session {
  id: string;
  roomId: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  remainingMinutes: number;
  amount: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  clientId: string;
  amount: number;
  method: "cash" | "card" | "online";
  timestamp: Date;
  status: "completed" | "pending" | "refunded";
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Mock Rooms
export const rooms: Room[] = [
  {
    id: "room-1",
    name: "PS5 Premium 1",
    consoleType: "PS5",
    status: "occupied",
    occupiedSince: new Date(Date.now() - 3600000),
    occupiedUntil: new Date(Date.now() + 1800000),
  },
  {
    id: "room-2",
    name: "PS5 Premium 2",
    consoleType: "PS5",
    status: "free",
  },
  {
    id: "room-3",
    name: "PS5 Premium 3",
    consoleType: "PS5",
    status: "booked",
    occupiedSince: new Date(Date.now() + 1800000),
    occupiedUntil: new Date(Date.now() + 5400000),
  },
  {
    id: "room-4",
    name: "PS5 Standard 1",
    consoleType: "PS5",
    status: "occupied",
    occupiedSince: new Date(Date.now() - 7200000),
    occupiedUntil: new Date(Date.now() + 3600000),
  },
  {
    id: "room-5",
    name: "PS5 Standard 2",
    consoleType: "PS5",
    status: "free",
  },
  {
    id: "room-6",
    name: "PS4 Classic 1",
    consoleType: "PS4",
    status: "cleaning",
  },
  {
    id: "room-7",
    name: "PS4 Classic 2",
    consoleType: "PS4",
    status: "free",
  },
  {
    id: "room-8",
    name: "PS4 Classic 3",
    consoleType: "PS4",
    status: "occupied",
    occupiedSince: new Date(Date.now() - 1800000),
    occupiedUntil: new Date(Date.now() + 1800000),
  },
];

// Mock Clients
export const clients: Client[] = [
  {
    id: "client-1",
    name: "Ahmed Al-Rashid",
    email: "ahmed.rashid@email.com",
    phone: "+966 50 123 4567",
    memberSince: new Date("2024-01-15"),
    totalVisits: 45,
    totalSpent: 3250.00,
    lastVisit: new Date(Date.now() - 86400000),
  },
  {
    id: "client-2",
    name: "Mohammed Al-Saud",
    email: "m.saud@email.com",
    phone: "+966 55 234 5678",
    memberSince: new Date("2023-11-20"),
    totalVisits: 78,
    totalSpent: 5890.00,
    lastVisit: new Date(),
  },
  {
    id: "client-3",
    name: "Fahad Al-Mutairi",
    email: "fahad.m@email.com",
    phone: "+966 56 345 6789",
    memberSince: new Date("2024-02-10"),
    totalVisits: 32,
    totalSpent: 2100.00,
    lastVisit: new Date(Date.now() - 172800000),
  },
  {
    id: "client-4",
    name: "Khalid Al-Qahtani",
    email: "khalid.q@email.com",
    phone: "+966 50 456 7890",
    memberSince: new Date("2023-09-05"),
    totalVisits: 120,
    totalSpent: 9450.00,
    lastVisit: new Date(Date.now() - 259200000),
  },
  {
    id: "client-5",
    name: "Faisal Al-Harbi",
    email: "faisal.h@email.com",
    phone: "+966 55 567 8901",
    memberSince: new Date("2024-03-01"),
    totalVisits: 18,
    totalSpent: 1350.00,
    lastVisit: new Date(),
  },
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: "booking-1",
    roomId: "room-1",
    clientId: "client-2",
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 1800000),
    status: "active",
    totalAmount: 150.00,
    paid: true,
  },
  {
    id: "booking-2",
    roomId: "room-3",
    clientId: "client-1",
    startTime: new Date(Date.now() + 1800000),
    endTime: new Date(Date.now() + 5400000),
    status: "confirmed",
    totalAmount: 100.00,
    paid: false,
  },
  {
    id: "booking-3",
    roomId: "room-4",
    clientId: "client-5",
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() + 3600000),
    status: "active",
    totalAmount: 300.00,
    paid: true,
  },
  {
    id: "booking-4",
    roomId: "room-8",
    clientId: "client-3",
    startTime: new Date(Date.now() - 1800000),
    endTime: new Date(Date.now() + 1800000),
    status: "active",
    totalAmount: 80.00,
    paid: true,
  },
  {
    id: "booking-5",
    roomId: "room-2",
    clientId: "client-4",
    startTime: new Date(Date.now() + 7200000),
    endTime: new Date(Date.now() + 10800000),
    status: "confirmed",
    totalAmount: 100.00,
    paid: false,
  },
];

// Mock Active Sessions
export const activeSessions: Session[] = [
  {
    id: "session-1",
    roomId: "room-1",
    clientId: "client-2",
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 1800000),
    remainingMinutes: 30,
    amount: 150.00,
  },
  {
    id: "session-2",
    roomId: "room-4",
    clientId: "client-5",
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() + 3600000),
    remainingMinutes: 60,
    amount: 300.00,
  },
  {
    id: "session-3",
    roomId: "room-8",
    clientId: "client-3",
    startTime: new Date(Date.now() - 1800000),
    endTime: new Date(Date.now() + 1800000),
    remainingMinutes: 30,
    amount: 80.00,
  },
];

// Mock Payments
export const payments: Payment[] = [
  {
    id: "payment-1",
    bookingId: "booking-1",
    clientId: "client-2",
    amount: 150.00,
    method: "card",
    timestamp: new Date(Date.now() - 3600000),
    status: "completed",
  },
  {
    id: "payment-2",
    bookingId: "booking-3",
    clientId: "client-5",
    amount: 300.00,
    method: "cash",
    timestamp: new Date(Date.now() - 7200000),
    status: "completed",
  },
  {
    id: "payment-3",
    bookingId: "booking-4",
    clientId: "client-3",
    amount: 80.00,
    method: "card",
    timestamp: new Date(Date.now() - 1800000),
    status: "completed",
  },
  {
    id: "payment-4",
    bookingId: "booking-1",
    clientId: "client-1",
    amount: 200.00,
    method: "cash",
    timestamp: new Date(Date.now() - 10800000),
    status: "completed",
  },
  {
    id: "payment-5",
    bookingId: "booking-2",
    clientId: "client-4",
    amount: 120.00,
    method: "online",
    timestamp: new Date(Date.now() - 14400000),
    status: "completed",
  },
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "warning",
    title: "Session Ending Soon",
    message: "PS5 Premium 1 session ends in 30 minutes",
    timestamp: new Date(Date.now() - 300000),
    read: false,
  },
  {
    id: "notif-2",
    type: "info",
    title: "New Booking",
    message: "Ahmed Al-Rashid booked PS5 Premium 3 for 3:00 PM",
    timestamp: new Date(Date.now() - 600000),
    read: false,
  },
  {
    id: "notif-3",
    type: "success",
    title: "Payment Received",
    message: "SAR 150 payment received for Booking #booking-1",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: "notif-4",
    type: "error",
    title: "Room Requires Cleaning",
    message: "PS4 Classic 1 needs cleaning before next booking",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: "notif-5",
    type: "info",
    title: "Session Started",
    message: "Mohammed Al-Saud started session in PS5 Premium 1",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
];
