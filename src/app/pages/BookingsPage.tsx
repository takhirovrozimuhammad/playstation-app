import { useState } from "react";
import { bookings as initialBookings, clients, rooms } from "../data/mockData";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Plus, Search, Calendar } from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";

export function BookingsPage() {
  const [bookings] = useState(initialBookings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const client = clients.find((c) => c.id === booking.clientId);
    const room = rooms.find((r) => r.id === booking.roomId);
    const searchLower = searchQuery.toLowerCase();
    return (
      client?.name.toLowerCase().includes(searchLower) ||
      room?.name.toLowerCase().includes(searchLower) ||
      booking.id.toLowerCase().includes(searchLower)
    );
  });

  const handleCreateBooking = () => {
    toast.success("Booking created successfully");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bookings</h1>
          <p className="text-slate-400">Manage room bookings and reservations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/20 text-slate-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Booking</DialogTitle>
              <DialogDescription className="text-slate-400">
                Book a room for a client
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client" className="text-slate-300">
                  Client
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room" className="text-slate-300">
                  Room
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    {rooms
                      .filter((r) => r.status === "free")
                      .map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - {room.consoleType}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-slate-300">
                  Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-slate-300">
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-slate-300">
                  Duration (hours)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="2"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-slate-300">
                  Amount (SAR)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100.00"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateBooking}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Create Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search by client, room, or booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Bookings table */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-400">Booking ID</TableHead>
                <TableHead className="text-slate-400">Client</TableHead>
                <TableHead className="text-slate-400">Room</TableHead>
                <TableHead className="text-slate-400">Date & Time</TableHead>
                <TableHead className="text-slate-400">Duration</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">Paid</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const client = clients.find((c) => c.id === booking.clientId);
                const room = rooms.find((r) => r.id === booking.roomId);
                const duration = Math.round(
                  (booking.endTime.getTime() - booking.startTime.getTime()) /
                    (1000 * 60 * 60)
                );
                return (
                  <TableRow
                    key={booking.id}
                    className="border-slate-800/50 hover:bg-slate-800/30"
                  >
                    <TableCell className="font-mono text-slate-300">
                      #{booking.id.slice(-8)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div>
                        <p className="font-medium">{client?.name}</p>
                        <p className="text-xs text-slate-500">{client?.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div>
                        <p className="font-medium">{room?.name}</p>
                        <p className="text-xs text-slate-500">
                          {room?.consoleType}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div>
                        <p className="font-medium">
                          {format(booking.startTime, "MMM dd, yyyy")}
                        </p>
                        <p className="text-xs text-slate-500">
                          {format(booking.startTime, "HH:mm")} -{" "}
                          {format(booking.endTime, "HH:mm")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {duration}h
                    </TableCell>
                    <TableCell className="text-slate-300 font-semibold">
                      SAR {booking.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {booking.paid ? (
                        <span className="text-green-400 text-sm">✓ Paid</span>
                      ) : (
                        <span className="text-orange-400 text-sm">⊗ Unpaid</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} className="text-xs" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                          onClick={() => toast.info("View booking details")}
                        >
                          View
                        </Button>
                        {booking.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            onClick={() => toast.success("Booking confirmed")}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-sm text-slate-400">Active</p>
              <p className="text-2xl font-bold text-white">
                {bookings.filter((b) => b.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-orange-500/20 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-sm text-slate-400">Pending</p>
              <p className="text-2xl font-bold text-white">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Confirmed</p>
              <p className="text-2xl font-bold text-white">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
