
import { format } from "date-fns";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  DollarSign,
  Gamepad2,
  Monitor,
  Phone,
  Plus,
  Sparkles,
  TrendingUp,
  User2,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

/* =========================
   TYPES
========================= */

type RoomStatus = "free" | "booked" | "occupied" | "cleaning";
type RoomKind = "playstation" | "pc";
type BookingStatus = "confirmed" | "completed";
type DurationPreset = "30" | "45" | "60" | "120" | "180";

type Room = {
  id: string;
  name: string;
  kind: RoomKind;
  deviceLabel: string;
  pricePerHour: number;
  status: RoomStatus;
  sessionStart?: Date | null;
  occupiedUntil?: Date | null;
  bookedFor?: Date | null;
  isVip?: boolean;
};

type Booking = {
  id: string;
  roomId: string;
  phone: string;
  clientName: string;
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

const now = new Date();

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
    sessionStart: new Date(new Date().setHours(20, 22, 0, 0)),
    occupiedUntil: new Date(new Date().setHours(21, 52, 0, 0)),
    isVip: false,
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
    sessionStart: new Date(new Date().setHours(19, 20, 0, 0)),
    occupiedUntil: null,
    isVip: true,
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
    sessionStart: new Date(new Date().setHours(20, 0, 0, 0)),
    occupiedUntil: new Date(new Date().setHours(20, 55, 0, 0)),
    isVip: false,
  },
];

const initialBookings: Booking[] = [
  {
    id: "king-2",
    roomId: "room-3",
    phone: "+966 50 444 77 88",
    clientName: "Ahmed Al-Rashid",
    startTime: new Date(new Date().setHours(21, 52, 0, 0)),
    endTime: new Date(new Date().setHours(22, 52, 0, 0)),
    isVip: false,
    totalAmount: 100,
    status: "confirmed",
    createdAt: now,
  },
  {
    id: "king-5",
    roomId: "room-6",
    phone: "+966 54 999 01 01",
    clientName: "Khalid Al-Qahtani",
    startTime: new Date(new Date().setHours(23, 22, 0, 0)),
    endTime: new Date(new Date().setHours(0, 22, 0, 0)),
    isVip: false,
    totalAmount: 100,
    status: "confirmed",
    createdAt: now,
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

const durationOptions: Array<{
  value: DurationPreset;
  label: string;
  minutes: number;
}> = [
  { value: "30", label: "30 minut", minutes: 30 },
  { value: "45", label: "45 minut", minutes: 45 },
  { value: "60", label: "1 soat", minutes: 60 },
  { value: "120", label: "2 soat", minutes: 120 },
  { value: "180", label: "3 soat", minutes: 180 },
];

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
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
  if (status === "confirmed") return "Confirmed";
  return "Completed";
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function getDurationMinutes(value: DurationPreset) {
  return durationOptions.find((item) => item.value === value)?.minutes ?? 60;
}

function formatRemainingTime(end: Date | null | undefined) {
  if (!end) return "Cheklanmagan";

  const diff = end.getTime() - Date.now();
  if (diff <= 0) return "Vaqti tugagan";

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours} soat ${minutes} min qoldi`;
  if (hours > 0) return `${hours} soat qoldi`;
  return `${minutes} min qoldi`;
}

function getSessionAmount(pricePerHour: number, minutes: number) {
  return Number(((pricePerHour / 60) * minutes).toFixed(2));
}

function buildDateFromTime(time: string) {
  const base = new Date();
  const [hh, mm] = time.split(":").map(Number);
  const result = new Date(base);
  result.setHours(hh || 0, mm || 0, 0, 0);
  return result;
}

/* =========================
   UI PARTS
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
      className={[
        "relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/[0.04] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />
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
    cyan: "from-cyan-500/30 to-cyan-400/10 text-cyan-300 border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.12)]",
    green:
      "from-emerald-500/30 to-emerald-400/10 text-emerald-300 border-emerald-400/20 shadow-[0_0_30px_rgba(16,185,129,0.12)]",
    red: "from-rose-500/30 to-rose-400/10 text-rose-300 border-rose-400/20 shadow-[0_0_30px_rgba(244,63,94,0.12)]",
    blue: "from-blue-500/30 to-blue-400/10 text-blue-300 border-blue-400/20 shadow-[0_0_30px_rgba(59,130,246,0.12)]",
    violet:
      "from-violet-500/30 to-fuchsia-400/10 text-fuchsia-200 border-fuchsia-400/20 shadow-[0_0_30px_rgba(217,70,239,0.12)]",
    yellow:
      "from-amber-500/30 to-yellow-400/10 text-yellow-200 border-yellow-400/20 shadow-[0_0_30px_rgba(245,158,11,0.12)]",
  };

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300/80">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
          {subtitle && <p className="mt-2 text-xs text-slate-400">{subtitle}</p>}
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
          free: "border-emerald-400/25 bg-emerald-500/12 text-emerald-300",
          booked: "border-blue-400/25 bg-blue-500/12 text-blue-300",
          occupied: "border-rose-400/25 bg-rose-500/12 text-rose-300",
          cleaning: "border-amber-400/25 bg-amber-500/12 text-amber-300",
        }
      : {
          confirmed: "border-blue-400/25 bg-blue-500/12 text-blue-300",
          completed: "border-slate-400/25 bg-slate-500/12 text-slate-300",
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

function CyberDialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogContent
      className={[
        "max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#09101f]/95 p-0 text-white shadow-[0_20px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/12 before:via-white/[0.04] before:to-transparent",
        "[&>button]:right-5 [&>button]:top-5 [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/[0.05] [&>button]:p-1.5 [&>button]:text-slate-400 [&>button]:opacity-100 [&>button]:transition-all",
        "[&>button:hover]:border-cyan-400/30 [&>button:hover]:bg-cyan-400/10 [&>button:hover]:text-cyan-300",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />
      <div className="relative">{children}</div>
    </DialogContent>
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
  const [occupiedModalOpen, setOccupiedModalOpen] = useState(false);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

  const [sessionVip, setSessionVip] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<DurationPreset>("60");

  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingClientName, setBookingClientName] = useState("");
  const [bookingRoomId, setBookingRoomId] = useState(initialRooms[0]?.id ?? "");
  const [bookingStart, setBookingStart] = useState(format(new Date(), "HH:mm"));
  const [bookingVip, setBookingVip] = useState(false);
  const [bookingDuration, setBookingDuration] = useState<DurationPreset>("60");



  const todayStartedCount = useMemo(() => {
    return rooms.filter((room) => room.sessionStart && isToday(room.sessionStart)).length;
  }, [rooms]);

  const freeCount = useMemo(() => rooms.filter((r) => r.status === "free").length, [rooms]);

  const occupiedCount = useMemo(
    () => rooms.filter((r) => r.status === "occupied").length,
    [rooms]
  );

  const bookedCount = useMemo(() => rooms.filter((r) => r.status === "booked").length, [rooms]);

  const totalRooms = rooms.length;

  const todayRevenue = useMemo(() => {
    const roomRevenue = rooms.reduce((sum, room) => {
      if (room.status !== "occupied" || !room.sessionStart || !isToday(room.sessionStart)) {
        return sum;
      }

      if (room.isVip) return sum;
      if (!room.occupiedUntil) return sum;

      const totalMinutes = Math.max(
        Math.floor((room.occupiedUntil.getTime() - room.sessionStart.getTime()) / 1000 / 60),
        0
      );

      return sum + getSessionAmount(room.pricePerHour, totalMinutes);
    }, 0);

    const bookingRevenue = bookings
      .filter((b) => isToday(b.startTime))
      .reduce((sum, b) => sum + b.totalAmount, 0);

    return roomRevenue + bookingRevenue;
  }, [rooms, bookings]);

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

  function resetSessionForm() {
    setSessionVip(false);
    setSessionDuration("60");
  }

  function resetBookingForm() {
    const firstAvailable = freeOrBookedRooms[0]?.id ?? rooms[0]?.id ?? "";
    setBookingPhone("");
    setBookingClientName("");
    setBookingRoomId(firstAvailable);
    setBookingStart(format(new Date(), "HH:mm"));
    setBookingVip(false);
    setBookingDuration("60");
  }

  function openRoom(room: Room) {
    setSelectedRoom(room);

    if (room.status === "free" || room.status === "booked") {
      resetSessionForm();
      setSessionModalOpen(true);
      return;
    }

    if (room.status === "occupied") {
      setOccupiedModalOpen(true);
      return;
    }
  }

  function handleCreateSession() {
    if (!selectedRoom) return;

    const startDate = new Date();

    let endDate: Date | null = null;
    if (!sessionVip) {
      const minutes = getDurationMinutes(sessionDuration);
      endDate = addMinutes(startDate, minutes);
    }

    setRooms((prev) =>
      prev.map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              status: "occupied",
              sessionStart: startDate,
              occupiedUntil: endDate,
              bookedFor: null,
              isVip: sessionVip,
            }
          : room
      )
    );

    setSessionModalOpen(false);
    setSelectedRoom(null);
    resetSessionForm();
  }

  function handleFinishSession() {
    if (!selectedRoom) return;

    setRooms((prev) =>
      prev.map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              status: "free",
              sessionStart: null,
              occupiedUntil: null,
              bookedFor: null,
              isVip: false,
            }
          : room
      )
    );

    setOccupiedModalOpen(false);
    setSelectedRoom(null);
  }

  function handleCreatePreBooking() {
    if (!bookingPhone.trim() || !bookingClientName.trim() || !bookingRoomId) return;

    const targetRoom = rooms.find((r) => r.id === bookingRoomId);
    if (!targetRoom) return;

    const startDate = buildDateFromTime(bookingStart);

    let endDate: Date | null = null;
    let amount = 0;

    if (!bookingVip) {
      const minutes = getDurationMinutes(bookingDuration);
      endDate = addMinutes(startDate, minutes);
      amount = getSessionAmount(targetRoom.pricePerHour, minutes);
    }

    const newBooking: Booking = {
      id: generateBookingId(),
      roomId: bookingRoomId,
      phone: bookingPhone,
      clientName: bookingClientName,
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

  const selectedRoomAmount = useMemo(() => {
    if (!selectedRoom || sessionVip) return "VIP";
    const minutes = getDurationMinutes(sessionDuration);
    return formatMoney(getSessionAmount(selectedRoom.pricePerHour, minutes));
  }, [selectedRoom, sessionVip, sessionDuration]);

  const selectedBookingAmount = useMemo(() => {
    const room = rooms.find((r) => r.id === bookingRoomId);
    if (!room || bookingVip) return "VIP";
    const minutes = getDurationMinutes(bookingDuration);
    return formatMoney(getSessionAmount(room.pricePerHour, minutes));
  }, [rooms, bookingRoomId, bookingVip, bookingDuration]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#16001f] via-[#050816] to-[#031a24]" />
      <div className="absolute -left-24 top-[-80px] h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="absolute right-[-60px] top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="relative min-h-screen p-4 sm:p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-300/80">
                Bugungi holat shu yerda. Kassaga nima tushdi, qaysi xona bo‘sh —
                hammasi ko‘z oldingda.
              </p>
            </div>

            <Button
              onClick={() => {
                resetBookingForm();
                setNewBookingModalOpen(true);
              }}
              className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 px-5 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-all duration-300 hover:scale-[1.01] hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300 hover:shadow-[0_16px_40px_rgba(217,70,239,0.28)]"
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
              subtitle="Kassa yomon emas"
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
                  Avval bo‘sh, keyin buyurtirilgan, undan keyin band xonalar chiqadi.
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-fuchsia-300" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {visibleRooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => openRoom(room)}
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_rgba(168,85,247,0.14)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-cyan-400/60 opacity-70" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{room.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                        {room.deviceLabel}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {room.kind === "pc" ? (
                        <Monitor className="h-5 w-5 text-cyan-300" />
                      ) : (
                        <Gamepad2 className="h-5 w-5 text-fuchsia-300" />
                      )}
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <StatusBadge status={room.status} type="room" />
                    <p className="text-sm font-medium text-slate-200">
                      SAR {room.pricePerHour}/soat
                    </p>
                  </div>

                  {room.status === "occupied" && (
                    <div className="relative mt-3 space-y-1 text-sm text-slate-400">
                      {room.isVip ? (
                        <>
                          <p className="font-medium text-fuchsia-300">VIP</p>
                          {room.sessionStart && (
                            <p>Boshlangan: {format(room.sessionStart, "HH:mm")}</p>
                          )}
                        </>
                      ) : (
                        <>
                          {room.sessionStart && room.occupiedUntil && (
                            <p>
                              {format(room.sessionStart, "HH:mm")} -{" "}
                              {format(room.occupiedUntil, "HH:mm")}
                            </p>
                          )}
                          <p>{formatRemainingTime(room.occupiedUntil)}</p>
                        </>
                      )}
                    </div>
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
                  className="rounded-2xl border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.08] hover:text-white"
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
                <h2 className="text-2xl font-bold text-white">Buyurtmalar ro‘yxati</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Bu yerda faqat oldindan bronlar turadi.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/[0.03]">
                    <TableHead className="text-slate-300">Booking ID</TableHead>
                    <TableHead className="text-slate-300">Room</TableHead>
                    <TableHead className="text-slate-300">Ism</TableHead>
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
                      <TableRow key={booking.id} className="border-white/10 hover:bg-white/[0.03]">
                        <TableCell className="text-slate-200">#{booking.id}</TableCell>
                        <TableCell className="text-slate-200">{room?.name ?? "-"}</TableCell>
                        <TableCell className="text-slate-200">{booking.clientName}</TableCell>
                        <TableCell className="text-slate-200">{booking.phone}</TableCell>
                        <TableCell className="text-slate-200">
                          {format(booking.startTime, "HH:mm")} -{" "}
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
      </div>

      {/* SESSION START MODAL */}
      <Dialog open={sessionModalOpen} onOpenChange={setSessionModalOpen}>
        <CyberDialogContent>
          <div className="p-6 sm:p-7">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedRoom?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Hona bo‘shatilgan ekan, endi odam qo‘yish mumkin.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  id="session-vip"
                  type="checkbox"
                  checked={sessionVip}
                  onChange={(e) => setSessionVip(e.target.checked)}
                  className="h-4 w-4 accent-fuchsia-500"
                />
                <Label htmlFor="session-vip" className="cursor-pointer text-sm text-slate-200">
                  VIP qilish — vaqt cheklanmaydi
                </Label>
              </div>

              {!sessionVip && (
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                    Davomiyligi
                  </Label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {durationOptions.map((item) => {
                      const isActive = sessionDuration === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setSessionDuration(item.value)}
                          className={[
                            "rounded-2xl border px-3 py-3 text-sm font-medium transition-all",
                            isActive
                              ? "border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 text-white shadow-[0_0_30px_rgba(217,70,239,0.15)]"
                              : "border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.08]",
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
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
                <p className="mt-1">
                  Session narxi:{" "}
                  <span className="font-semibold text-white">{selectedRoomAmount}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSessionModalOpen(false)}
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.08]"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateSession}
                  className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 font-semibold text-white transition-all duration-300 hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300 hover:shadow-[0_16px_40px_rgba(217,70,239,0.28)]"
                >
                  Session boshlash
                </Button>
              </div>
            </div>
          </div>
        </CyberDialogContent>
      </Dialog>

      {/* OCCUPIED ROOM MODAL */}
      <Dialog open={occupiedModalOpen} onOpenChange={setOccupiedModalOpen}>
        <CyberDialogContent>
          <div className="p-6 sm:p-7">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedRoom?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Hozir xona band. Shu yerdan tugatish mumkin.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                <p>
                  Qurilma turi:{" "}
                  <span className="font-semibold text-white">
                    {selectedRoom?.deviceLabel}
                  </span>
                </p>

                {selectedRoom?.isVip ? (
                  <>
                    <p className="mt-2 font-semibold text-fuchsia-300">VIP session</p>
                    {selectedRoom.sessionStart && (
                      <p className="mt-1">
                        Boshlangan: {format(selectedRoom.sessionStart, "HH:mm")}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {selectedRoom?.sessionStart && selectedRoom?.occupiedUntil && (
                      <p className="mt-2">
                        Vaqti: {format(selectedRoom.sessionStart, "HH:mm")} -{" "}
                        {format(selectedRoom.occupiedUntil, "HH:mm")}
                      </p>
                    )}
                    <p className="mt-1">
                      Qolgan vaqt: {formatRemainingTime(selectedRoom?.occupiedUntil)}
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOccupiedModalOpen(false)}
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.08]"
                >
                  Ortga
                </Button>
                <Button
                  type="button"
                  onClick={handleFinishSession}
                  className="h-12 rounded-2xl border border-red-400/20 bg-gradient-to-r from-rose-500 to-red-500 font-semibold text-white hover:from-rose-400 hover:to-red-400"
                >
                  Honani tugatish
                </Button>
              </div>
            </div>
          </div>
        </CyberDialogContent>
      </Dialog>

      {/* NEW BOOKING MODAL */}
      <Dialog open={newBookingModalOpen} onOpenChange={setNewBookingModalOpen}>
        <CyberDialogContent>
          <div className="p-6 sm:p-7">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Yangi buyurtma qo‘shish
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Oldindan bron qilish uchun ism va telefon ham yoziladi.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                  Ism
                </Label>
                <div className="relative">
                  <User2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={bookingClientName}
                    onChange={(e) => setBookingClientName(e.target.value)}
                    placeholder="Mijoz ismi"
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] pl-11 text-slate-100 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus:border-fuchsia-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-fuchsia-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                  Telefon raqami
                </Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+966 5X XXX XX XX"
                    className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] pl-11 text-slate-100 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                  Xona
                </Label>
                <select
                  value={bookingRoomId}
                  onChange={(e) => setBookingRoomId(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-slate-100 outline-none transition-all duration-300 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                >
                  {freeOrBookedRooms.map((room) => (
                    <option key={room.id} value={room.id} className="bg-[#0b1120] text-white">
                      {room.name} — {room.deviceLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                  Boshlanish vaqti
                </Label>
                <Input
                  type="time"
                  value={bookingStart}
                  onChange={(e) => setBookingStart(e.target.value)}
                  className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <input
                  id="booking-vip"
                  type="checkbox"
                  checked={bookingVip}
                  onChange={(e) => setBookingVip(e.target.checked)}
                  className="h-4 w-4 accent-fuchsia-500"
                />
                <Label htmlFor="booking-vip" className="cursor-pointer text-sm text-slate-200">
                  VIP bron — tugash vaqti yo‘q
                </Label>
              </div>

              {!bookingVip && (
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                    Davomiyligi
                  </Label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {durationOptions.map((item) => {
                      const isActive = bookingDuration === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setBookingDuration(item.value)}
                          className={[
                            "rounded-2xl border px-3 py-3 text-sm font-medium transition-all",
                            isActive
                              ? "border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 text-white shadow-[0_0_30px_rgba(217,70,239,0.15)]"
                              : "border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.08]",
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                <p>
                  Bron summasi:{" "}
                  <span className="font-semibold text-white">{selectedBookingAmount}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewBookingModalOpen(false)}
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.08]"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="button"
                  onClick={handleCreatePreBooking}
                  className="h-12 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 font-semibold text-white transition-all duration-300 hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300 hover:shadow-[0_16px_40px_rgba(217,70,239,0.28)]"
                >
                  Bron yaratish
                </Button>
              </div>
            </div>
          </div>
        </CyberDialogContent>
      </Dialog>
    </div>
  );
}