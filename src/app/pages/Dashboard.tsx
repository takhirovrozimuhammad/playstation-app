import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  CalendarCheck,
  Clock3,
  DollarSign,
  Gamepad2,
  Monitor,
  Plus,
  Sparkles,
  TrendingUp,
  Phone,
  X,
  CheckCircle2,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

/* =========================
   TYPES
========================= */

type RoomStatus = "free" | "booked" | "occupied" | "cleaning";
type RoomKind = "playstation" | "pc";
type BookingStatus = "active" | "confirmed" | "completed";

type Room = {
  id: string;
  name: string;
  kind: RoomKind;
  deviceLabel: string;
  pricePerHour: number;
  status: RoomStatus;
  occupiedUntil?: Date | null;
  bookedFor?: Date | null;
};

type Booking = {
  id: string;
  roomId: string;
  phone: string;
  startTime: Date;
  endTime?: Date | null;
  isVip: boolean;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
};

/* =========================
   MOCK DATA
========================= */

const initialRooms: Room[] = [
  {
    id: "room-1",
    name: "PS5 Premium 1",
    kind: "playstation",
    deviceLabel: "PS5",
    pricePerHour: 80,
    status: "free",
  },
  {
    id: "room-2",
    name: "PS5 Premium 2",
    kind: "playstation",
    deviceLabel: "PS5",
    pricePerHour: 80,
    status: "free",
  },
  {
    id: "room-3",
    name: "PS5 Premium 3",
    kind: "playstation",
    deviceLabel: "PS5",
    pricePerHour: 80,
    status: "booked",
    bookedFor: new Date(new Date().setHours(22, 30, 0, 0)),
  },
  {
    id: "room-4",
    name: "PS5 Standard 1",
    kind: "playstation",
    deviceLabel: "PS5",
    pricePerHour: 60,
    status: "occupied",
    occupiedUntil: new Date(new Date().setHours(21, 52, 0, 0)),
  },
  {
    id: "room-5",
    name: "PS5 Standard 2",
    kind: "playstation",
    deviceLabel: "PS5",
    pricePerHour: 60,
    status: "free",
  },
  {
    id: "room-6",
    name: "PS4 Classic 1",
    kind: "playstation",
    deviceLabel: "PS4",
    pricePerHour: 45,
    status: "booked",
    bookedFor: new Date(new Date().setHours(23, 10, 0, 0)),
  },
  {
    id: "room-7",
    name: "PS4 Classic 2",
    kind: "playstation",
    deviceLabel: "PS4",
    pricePerHour: 45,
    status: "occupied",
    occupiedUntil: new Date(new Date().setHours(22, 22, 0, 0)),
  },
  {
    id: "room-8",
    name: "PS4 Classic 3",
    kind: "playstation",
    deviceLabel: "PS4",
    pricePerHour: 45,
    status: "cleaning",
  },
  {
    id: "room-9",
    name: "PC Room 1",
    kind: "pc",
    deviceLabel: "PC",
    pricePerHour: 35,
    status: "free",
  },
  {
    id: "room-10",
    name: "PC Room 2",
    kind: "pc",
    deviceLabel: "PC",
    pricePerHour: 35,
    status: "occupied",
    occupiedUntil: new Date(new Date().setHours(20, 55, 0, 0)),
  },
];

const initialBookings: Booking[] = [
  {
    id: "king-1",
    roomId: "room-4",
    phone: "+966 50 111 22 33",
    startTime: new Date(new Date().setHours(20, 22, 0, 0)),
    endTime: new Date(new Date().setHours(21, 52, 0, 0)),
    isVip: false,
    totalAmount: 150,
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "king-2",
    roomId: "room-3",
    phone: "+966 50 444 77 88",
    startTime: new Date(new Date().setHours(21, 52, 0, 0)),
    endTime: new Date(new Date().setHours(22, 52, 0, 0)),
    isVip: false,
    totalAmount: 100,
    status: "confirmed",
    createdAt: new Date(),
  },
  {
    id: "king-3",
    roomId: "room-7",
    phone: "+966 55 888 10 10",
    startTime: new Date(new Date().setHours(19, 22, 0, 0)),
    endTime: new Date(new Date().setHours(22, 22, 0, 0)),
    isVip: false,
    totalAmount: 300,
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "king-4",
    roomId: "room-10",
    phone: "+966 53 222 66 00",
    startTime: new Date(new Date().setHours(20, 52, 0, 0)),
    endTime: new Date(new Date().setHours(21, 52, 0, 0)),
    isVip: false,
    totalAmount: 80,
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "king-5",
    roomId: "room-6",
    phone: "+966 54 999 01 01",
    startTime: new Date(new Date().setHours(23, 22, 0, 0)),
    endTime: new Date(new Date().setHours(0, 22, 0, 0)),
    isVip: false,
    totalAmount: 100,
    status: "confirmed",
    createdAt: new Date(),
  },
];

/* =========================
   HELPERS
========================= */

const statusOrder: Record<RoomStatus, number> = {
  free: 1,
  booked: 2,
  occupied: 3,
  cleaning: 4,
};

function isToday(date: Date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function diffHours(start: Date, end: Date) {
  return Math.max((end.getTime() - start.getTime()) / 1000 / 60 / 60, 0);
}

function generateBookingId() {
  return `bk-${Math.random().toString(36).slice(2, 8)}`;
}

function formatMoney(amount: number) {
  return `SAR ${amount.toFixed(2)}`;
}

function getRoomStatusText(status: RoomStatus) {
  if (status === "free") return "Bo‘sh";
  if (status === "booked") return "Buyurtirilgan";
  if (status === "occupied") return "Band";
  return "Tozalanmoqda";
}

function getBookingStatusText(status: BookingStatus) {
  if (status === "active") return "Active";
  if (status === "confirmed") return "Confirmed";
  return "Completed";
}

/* =========================
   SMALL UI PARTS
========================= */

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-fuchsia-400/70 via-violet-300/50 to-cyan-300/70" />
      <div className="relative">{children}</div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "violet",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "cyan" | "green" | "red" | "blue" | "violet" | "yellow";
}) {
  const toneMap: Record<string, string> = {
    cyan: "from-cyan-500/25 to-cyan-400/10 text-cyan-300 border-cyan-400/20",
    green:
      "from-emerald-500/25 to-emerald-400/10 text-emerald-300 border-emerald-400/20",
    red: "from-rose-500/25 to-rose-400/10 text-rose-300 border-rose-400/20",
    blue: "from-blue-500/25 to-blue-400/10 text-blue-300 border-blue-400/20",
    violet:
      "from-violet-500/25 to-fuchsia-400/10 text-fuchsia-200 border-fuchsia-400/20",
    yellow:
      "from-amber-500/25 to-yellow-400/10 text-yellow-200 border-yellow-400/20",
  };

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300/80">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
          {subtitle && (
            <p className="mt-2 text-xs text-emerald-300">{subtitle}</p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br ${toneMap[tone]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </GlassCard>
  );
}

function StatusBadge({
  status,
  type = "room",
}: {
  status: RoomStatus | BookingStatus;
  type?: "room" | "booking";
}) {
  const map =
    type === "room"
      ? {
          free: "border-emerald-400/20 bg-emerald-500/15 text-emerald-300",
          booked: "border-blue-400/20 bg-blue-500/15 text-blue-300",
          occupied: "border-rose-400/20 bg-rose-500/15 text-rose-300",
          cleaning: "border-amber-400/20 bg-amber-500/15 text-amber-300",
        }
      : {
          active: "border-emerald-400/20 bg-emerald-500/15 text-emerald-300",
          confirmed: "border-blue-400/20 bg-blue-500/15 text-blue-300",
          completed: "border-slate-400/20 bg-slate-500/15 text-slate-300",
        };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${map[status as keyof typeof map]}`}
    >
      {type === "room"
        ? getRoomStatusText(status as RoomStatus)
        : getBookingStatusText(status as BookingStatus)}
    </span>
  );
}

/* =========================
   MAIN PAGE
========================= */

export function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [showAllRooms, setShowAllRooms] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  // session form
  const [sessionPhone, setSessionPhone] = useState("");
  const [sessionStart, setSessionStart] = useState(format(new Date(), "HH:mm"));
  const [sessionEnd, setSessionEnd] = useState("");
  const [sessionVip, setSessionVip] = useState(false);

  // booking form
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingRoomId, setBookingRoomId] = useState(initialRooms[0]?.id ?? "");
  const [bookingStart, setBookingStart] = useState(format(new Date(), "HH:mm"));
  const [bookingEnd, setBookingEnd] = useState("");
  const [bookingVip, setBookingVip] = useState(false);

  const todayStartedCount = useMemo(() => {
    return bookings.filter((b) => isToday(b.startTime)).length;
  }, [bookings]);

  const freeCount = useMemo(
    () => rooms.filter((r) => r.status === "free").length,
    [rooms]
  );

  const occupiedCount = useMemo(
    () => rooms.filter((r) => r.status === "occupied").length,
    [rooms]
  );

  const bookedCount = useMemo(
    () => rooms.filter((r) => r.status === "booked").length,
    [rooms]
  );

  const totalRooms = rooms.length;

  const todayRevenue = useMemo(() => {
    return bookings
      .filter((b) => isToday(b.startTime))
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }, [bookings]);

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      const byStatus = statusOrder[a.status] - statusOrder[b.status];
      if (byStatus !== 0) return byStatus;
      return a.name.localeCompare(b.name);
    });
  }, [rooms]);

  const visibleRooms = showAllRooms ? sortedRooms : sortedRooms.slice(0, 8);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 8);
  }, [bookings]);

  const freeOrBookedRooms = useMemo(() => {
    return rooms.filter((r) => r.status === "free" || r.status === "booked");
  }, [rooms]);

  function resetSessionForm(room?: Room) {
    setSelectedRoom(room ?? null);
    setSessionPhone("");
    setSessionStart(format(new Date(), "HH:mm"));
    setSessionEnd("");
    setSessionVip(false);
  }

  function resetBookingForm() {
    const firstAvailable = freeOrBookedRooms[0]?.id ?? rooms[0]?.id ?? "";
    setBookingPhone("");
    setBookingRoomId(firstAvailable);
    setBookingStart(format(new Date(), "HH:mm"));
    setBookingEnd("");
    setBookingVip(false);
  }

  function openRoomModal(room: Room) {
    setSelectedRoom(room);
    resetSessionForm(room);
    setSessionModalOpen(true);
  }

  function handleSetNowForSession() {
    setSessionStart(format(new Date(), "HH:mm"));
  }

  function handleSetNowForBooking() {
    setBookingStart(format(new Date(), "HH:mm"));
  }

  function handleCreateSession() {
    if (!selectedRoom) return;
    if (!sessionPhone.trim()) return;

    const now = new Date();
    const [sh, sm] = sessionStart.split(":").map(Number);
    const startDate = new Date(now);
    startDate.setHours(sh || 0, sm || 0, 0, 0);

    let endDate: Date | null = null;
    let amount = 0;

    if (!sessionVip) {
      if (!sessionEnd) return;
      const [eh, em] = sessionEnd.split(":").map(Number);
      endDate = new Date(now);
      endDate.setHours(eh || 0, em || 0, 0, 0);

      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }

      const hours = diffHours(startDate, endDate);
      amount = Number((hours * selectedRoom.pricePerHour).toFixed(2));
    }

    const newBooking: Booking = {
      id: generateBookingId(),
      roomId: selectedRoom.id,
      phone: sessionPhone,
      startTime: startDate,
      endTime: endDate,
      isVip: sessionVip,
      totalAmount: amount,
      status: "active",
      createdAt: new Date(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setRooms((prev) =>
      prev.map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              status: "occupied",
              occupiedUntil: sessionVip ? null : endDate,
              bookedFor: null,
            }
          : room
      )
    );

    setSessionModalOpen(false);
    resetSessionForm();
  }

  function handleCreatePreBooking() {
    if (!bookingPhone.trim() || !bookingRoomId) return;

    const targetRoom = rooms.find((r) => r.id === bookingRoomId);
    if (!targetRoom) return;

    const now = new Date();
    const [sh, sm] = bookingStart.split(":").map(Number);
    const startDate = new Date(now);
    startDate.setHours(sh || 0, sm || 0, 0, 0);

    let endDate: Date | null = null;
    let amount = 0;

    if (!bookingVip) {
      if (!bookingEnd) return;
      const [eh, em] = bookingEnd.split(":").map(Number);
      endDate = new Date(now);
      endDate.setHours(eh || 0, em || 0, 0, 0);

      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }

      const hours = diffHours(startDate, endDate);
      amount = Number((hours * targetRoom.pricePerHour).toFixed(2));
    }

    const newBooking: Booking = {
      id: generateBookingId(),
      roomId: bookingRoomId,
      phone: bookingPhone,
      startTime: startDate,
      endTime: endDate,
      isVip: bookingVip,
      totalAmount: amount,
      status: "confirmed",
      createdAt: new Date(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setRooms((prev) =>
      prev.map((room) =>
        room.id === bookingRoomId
          ? {
              ...room,
              status: "booked",
              bookedFor: startDate,
            }
          : room
      )
    );

    setNewBookingModalOpen(false);
    resetBookingForm();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] p-4 sm:p-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#16001f] via-[#050816] to-[#031a24]" />
      <div className="pointer-events-none absolute -left-24 top-[-80px] h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-60px] top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-300/80">
              Bugungi holat shu yerda. Qisqasi, kassaga nima tushdi, qaysi xona
              bo‘sh — hammasi ko‘z oldingda.
            </p>
          </div>

          <Button
            onClick={() => {
              resetBookingForm();
              setNewBookingModalOpen(true);
            }}
            className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 px-5 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-all duration-300 hover:scale-[1.01] hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buyurtma qo‘shish
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatCard
            title="Bugun boshlangan sessionlar"
            value={todayStartedCount}
            subtitle="Bugungi ishlagan xonalar soni"
            icon={Clock3}
            tone="cyan"
          />
          <StatCard
            title="Hozir bo‘sh xonalar"
            value={freeCount}
            icon={CheckCircle2}
            tone="green"
          />
          <StatCard
            title="Hozir band xonalar"
            value={occupiedCount}
            icon={Gamepad2}
            tone="red"
          />
          <StatCard
            title="Oldindan buyurtirilgan"
            value={bookedCount}
            icon={CalendarCheck}
            tone="blue"
          />
          <StatCard
            title="Umumiy xonalar"
            value={totalRooms}
            icon={Sparkles}
            tone="violet"
          />
          <StatCard
            title="Bugungi tushum"
            value={formatMoney(todayRevenue)}
            subtitle="Hozircha yomon emas"
            icon={DollarSign}
            tone="yellow"
          />
        </div>

        {/* Rooms */}
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Xonalar holati</h2>
              <p className="mt-1 text-sm text-slate-400">
                Avval bo‘sh, keyin buyurtirilgan, undan keyin band xonalar
                chiqadi.
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-fuchsia-300" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {visibleRooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => openRoomModal(room)}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(168,85,247,0.12)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-70" />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {room.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                      {room.deviceLabel}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    {room.kind === "pc" ? (
                      <Monitor className="h-5 w-5 text-cyan-300" />
                    ) : (
                      <Gamepad2 className="h-5 w-5 text-fuchsia-300" />
                    )}
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-between">
                  <StatusBadge status={room.status} type="room" />
                  <p className="text-sm font-medium text-slate-300">
                    SAR {room.pricePerHour}/soat
                  </p>
                </div>

                {room.status === "occupied" && room.occupiedUntil && (
                  <p className="relative mt-3 text-sm text-slate-400">
                    Tugaydi: {format(room.occupiedUntil, "HH:mm")}
                  </p>
                )}

                {room.status === "booked" && room.bookedFor && (
                  <p className="relative mt-3 text-sm text-slate-400">
                    Kelishi kutilmoqda: {format(room.bookedFor, "HH:mm")}
                  </p>
                )}

                {room.status === "free" && (
                  <p className="relative mt-3 text-sm text-emerald-300">
                    Hozir odam qo‘yish mumkin
                  </p>
                )}

                {room.status === "cleaning" && (
                  <p className="relative mt-3 text-sm text-amber-300">
                    Hozircha texnik pauza
                  </p>
                )}
              </button>
            ))}
          </div>

          {sortedRooms.length > 8 && (
            <div className="mt-5 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowAllRooms((prev) => !prev)}
                className="rounded-2xl border-white/10 bg-white/5 text-slate-200 backdrop-blur-xl hover:bg-white/10 hover:text-white"
              >
                {showAllRooms ? "Kamroq ko‘rish" : "Ko‘proq ko‘rish"}
              </Button>
            </div>
          )}
        </GlassCard>

        {/* Bookings table */}
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Buyurtmalar ro‘yxati
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Bu yerda endi ism emas, telefon raqam chiqadi. To‘g‘risi ham shu,
                receptionistga ko‘proq kerak bo‘ladigani shu-da.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/[0.03]">
                  <TableHead className="text-slate-300">Booking ID</TableHead>
                  <TableHead className="text-slate-300">Room</TableHead>
                  <TableHead className="text-slate-300">Telefon</TableHead>
                  <TableHead className="text-slate-300">Vaqt</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentBookings.map((booking) => {
                  const room = rooms.find((r) => r.id === booking.roomId);

                  return (
                    <TableRow
                      key={booking.id}
                      className="border-white/10 hover:bg-white/[0.03]"
                    >
                      <TableCell className="text-slate-200">
                        #{booking.id}
                      </TableCell>

                      <TableCell className="text-slate-200">
                        {room?.name ?? "-"}
                      </TableCell>

                      <TableCell className="text-slate-200">
                        {booking.phone}
                      </TableCell>

                      <TableCell className="text-slate-200">
                        {format(booking.startTime, "HH:mm")}
                        {" - "}
                        {booking.isVip
                          ? "VIP"
                          : booking.endTime
                          ? format(booking.endTime, "HH:mm")
                          : "-"}
                      </TableCell>

                      <TableCell className="text-slate-200">
                        {booking.isVip ? "VIP" : formatMoney(booking.totalAmount)}
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={booking.status} type="booking" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>

      {/* ROOM SESSION MODAL */}
      <Dialog open={sessionModalOpen} onOpenChange={setSessionModalOpen}>
        <DialogContent className="max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0a1020]/95 p-0 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />

          <div className="relative p-6 sm:p-7">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedRoom?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Odam qo‘yish uchun vaqtni tanlang. Hozir tugmasi bor, VIP ham
                bor. To‘liq receptionistcha set.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                  Telefon raqami
                </Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={sessionPhone}
                    onChange={(e) => setSessionPhone(e.target.value)}
                    placeholder="+966 5X XXX XX XX"
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 pl-11 text-slate-100 placeholder:text-slate-400 backdrop-blur-xl focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                    Boshlanish vaqti
                  </Label>
                  <Input
                    type="time"
                    value={sessionStart}
                    onChange={(e) => setSessionStart(e.target.value)}
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 text-slate-100 backdrop-blur-xl focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={handleSetNowForSession}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 text-slate-100 hover:bg-white/12"
                  >
                    Hozir
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  id="session-vip"
                  type="checkbox"
                  checked={sessionVip}
                  onChange={(e) => setSessionVip(e.target.checked)}
                  className="h-4 w-4 accent-fuchsia-500"
                />
                <Label htmlFor="session-vip" className="cursor-pointer text-sm">
                  VIP qilish — vaqt cheklanmaydi, qachon to‘xtatsa o‘shanda
                  tugaydi
                </Label>
              </div>

              {!sessionVip && (
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                    Tugash vaqti
                  </Label>
                  <Input
                    type="time"
                    value={sessionEnd}
                    onChange={(e) => setSessionEnd(e.target.value)}
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 text-slate-100 backdrop-blur-xl focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                <p>
                  Qurilma turi:{" "}
                  <span className="font-semibold text-white">
                    {selectedRoom?.deviceLabel}
                  </span>
                </p>
                <p className="mt-1">
                  Soatbay narx:{" "}
                  <span className="font-semibold text-white">
                    SAR {selectedRoom?.pricePerHour ?? 0}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSessionModalOpen(false)}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateSession}
                  className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 font-semibold text-white hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300"
                >
                  Session boshlash
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NEW BOOKING MODAL */}
      <Dialog open={newBookingModalOpen} onOpenChange={setNewBookingModalOpen}>
        <DialogContent className="max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0a1020]/95 p-0 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />

          <div className="relative p-6 sm:p-7">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Yangi buyurtma qo‘shish
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Oldindan bron qilish uchun. Hali kelmagan bo‘lsa ham joyni
                bandlab qo‘yadi.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                  Telefon raqami
                </Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+966 5X XXX XX XX"
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 pl-11 text-slate-100 placeholder:text-slate-400 backdrop-blur-xl focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                  Xona
                </Label>
                <select
                  value={bookingRoomId}
                  onChange={(e) => setBookingRoomId(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 px-4 text-slate-100 outline-none backdrop-blur-xl focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                >
                  {freeOrBookedRooms.map((room) => (
                    <option
                      key={room.id}
                      value={room.id}
                      className="bg-slate-900 text-white"
                    >
                      {room.name} — {room.deviceLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                    Boshlanish vaqti
                  </Label>
                  <Input
                    type="time"
                    value={bookingStart}
                    onChange={(e) => setBookingStart(e.target.value)}
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 text-slate-100 backdrop-blur-xl focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={handleSetNowForBooking}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 text-slate-100 hover:bg-white/12"
                  >
                    Hozir
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  id="booking-vip"
                  type="checkbox"
                  checked={bookingVip}
                  onChange={(e) => setBookingVip(e.target.checked)}
                  className="h-4 w-4 accent-fuchsia-500"
                />
                <Label htmlFor="booking-vip" className="cursor-pointer text-sm">
                  VIP bron — tugash vaqti yo‘q
                </Label>
              </div>

              {!bookingVip && (
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                    Tugash vaqti
                  </Label>
                  <Input
                    type="time"
                    value={bookingEnd}
                    onChange={(e) => setBookingEnd(e.target.value)}
                    className="h-12 rounded-2xl border border-white/10 bg-white/8 text-slate-100 backdrop-blur-xl focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewBookingModalOpen(false)}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="button"
                  onClick={handleCreatePreBooking}
                  className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 font-semibold text-white hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300"
                >
                  Bron yaratish
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}