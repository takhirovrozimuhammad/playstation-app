import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import {
  Clock,
  DollarSign,
  Gamepad2,
  Users,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { rooms, bookings, activeSessions, payments, clients } from "../data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { format } from "date-fns";

export function Dashboard() {
  // Calculate stats
  const activeSessionsCount = activeSessions.length;
  const freeRoomsCount = rooms.filter((r) => r.status === "free").length;
  const occupiedRoomsCount = rooms.filter((r) => r.status === "occupied").length;
  const todayBookings = bookings.filter(
    (b) => b.startTime.toDateString() === new Date().toDateString()
  ).length;
  const todayRevenue = payments
    .filter((p) => p.timestamp.toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.amount, 0);
  const todayClients = new Set(
    bookings
      .filter((b) => b.startTime.toDateString() === new Date().toDateString())
      .map((b) => b.clientId)
  ).size;

  // Get recent bookings
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1> <div className="bg-red-500 text-white p-6 text-2xl">Tailwind ishladi</div>
        <p className="text-slate-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Sessions"
          value={activeSessionsCount}
          icon={Clock}
          iconColor="text-cyan-400"
          iconBgColor="from-cyan-600/20 to-cyan-600/10"
          trend={{ value: "+2 from last hour", isPositive: true }}
        />
        <StatCard
          title="Free Rooms"
          value={freeRoomsCount}
          icon={Gamepad2}
          iconColor="text-green-400"
          iconBgColor="from-green-600/20 to-green-600/10"
        />
        <StatCard
          title="Occupied Rooms"
          value={occupiedRoomsCount}
          icon={Gamepad2}
          iconColor="text-red-400"
          iconBgColor="from-red-600/20 to-red-600/10"
        />
        <StatCard
          title="Today's Bookings"
          value={todayBookings}
          icon={CalendarCheck}
          iconColor="text-blue-400"
          iconBgColor="from-blue-600/20 to-blue-600/10"
        />
        <StatCard
          title="Today's Clients"
          value={todayClients}
          icon={Users}
          iconColor="text-purple-400"
          iconBgColor="from-purple-600/20 to-purple-600/10"
        />
        <StatCard
          title="Today's Revenue"
          value={`SAR ${todayRevenue.toFixed(2)}`}
          icon={DollarSign}
          iconColor="text-yellow-400"
          iconBgColor="from-yellow-600/20 to-yellow-600/10"
          trend={{ value: "+12.5%", isPositive: true }}
        />
      </div>

      {/* Room Status Overview */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Room Status Overview</h2>
          <TrendingUp className="w-5 h-5 text-purple-400" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-slate-900/50 rounded-lg border border-slate-800/50 p-4 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{room.name}</p>
                  <p className="text-xs text-slate-500">{room.consoleType}</p>
                </div>
                <Gamepad2 className="w-4 h-4 text-purple-400" />
              </div>
              <StatusBadge status={room.status} className="text-xs" />
              {room.status === "occupied" && room.occupiedUntil && (
                <p className="text-xs text-slate-500 mt-2">
                  Until {format(room.occupiedUntil, "HH:mm")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
 
      {/* Recent Bookings */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-400">Booking ID</TableHead>
                <TableHead className="text-slate-400">Room</TableHead>
                <TableHead className="text-slate-400">Client</TableHead>
                <TableHead className="text-slate-400">Time</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => {
                const room = rooms.find((r) => r.id === booking.roomId);
                const client = clients.find((c) => c.id === booking.clientId);
                return (
                  <TableRow
                    key={booking.id}
                    className="border-slate-800/50 hover:bg-slate-800/30"
                  >
                    <TableCell className="text-slate-300">
                      #{booking.id.slice(-6)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {room?.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {client?.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {format(booking.startTime, "HH:mm")} -{" "}
                      {format(booking.endTime, "HH:mm")}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      SAR {booking.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} className="text-xs" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
