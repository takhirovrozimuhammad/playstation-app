import { useState } from "react";
import { rooms as initialRooms, Room, RoomStatus } from "../data/mockData";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/ui/button";
import { Gamepad2, Plus, Edit, Trash2 } from "lucide-react";
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

export function RoomsPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<RoomStatus | "all">("all");

  const filteredRooms =
    filterStatus === "all"
      ? rooms
      : rooms.filter((room) => room.status === filterStatus);

  const handleChangeStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );
    toast.success(`Room status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Rooms / Consoles
          </h1>
          <p className="text-slate-400">Manage PlayStation rooms and consoles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/20 text-slate-100">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Room</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new PlayStation room to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room-name" className="text-slate-300">
                  Room Name
                </Label>
                <Input
                  id="room-name"
                  placeholder="e.g., PS5 Premium 4"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="console-type" className="text-slate-300">
                  Console Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select console" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    <SelectItem value="ps5">PlayStation 5</SelectItem>
                    <SelectItem value="ps4">PlayStation 4</SelectItem>
                  </SelectContent>
                </Select>
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
                onClick={() => {
                  toast.success("Room added successfully");
                  setIsDialogOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Add Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <div className="flex items-center gap-4">
          <Label className="text-slate-300">Filter by Status:</Label>
          <div className="flex gap-2">
            {(["all", "free", "occupied", "booked", "cleaning"] as const).map(
              (status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={
                    filterStatus === status
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {status === "all" ? "All" : status}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6 hover:border-purple-500/40 transition-all"
          >
            {/* Room header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {room.name}
                </h3>
                <p className="text-sm text-slate-400">{room.consoleType}</p>
              </div>
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/10">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            {/* Status */}
            <div className="mb-4">
              <StatusBadge status={room.status} className="w-full justify-center" />
            </div>

            {/* Time info */}
            {room.status === "occupied" && room.occupiedUntil && (
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Occupied Until</p>
                <p className="text-sm font-semibold text-white">
                  {format(room.occupiedUntil, "HH:mm")}
                </p>
              </div>
            )}

            {room.status === "booked" && room.occupiedSince && (
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Booked From</p>
                <p className="text-sm font-semibold text-white">
                  {format(room.occupiedSince, "HH:mm")}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Select
                value={room.status}
                onValueChange={(value) =>
                  handleChangeStatus(room.id, value as RoomStatus)
                }
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => setSelectedRoom(room)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => toast.error("Room cannot be deleted while in use")}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-400 mb-1">Total Rooms</p>
            <p className="text-2xl font-bold text-white">{rooms.length}</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-sm text-green-400 mb-1">Free</p>
            <p className="text-2xl font-bold text-green-400">
              {rooms.filter((r) => r.status === "free").length}
            </p>
          </div>
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <p className="text-sm text-red-400 mb-1">Occupied</p>
            <p className="text-2xl font-bold text-red-400">
              {rooms.filter((r) => r.status === "occupied").length}
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-sm text-blue-400 mb-1">Booked</p>
            <p className="text-2xl font-bold text-blue-400">
              {rooms.filter((r) => r.status === "booked").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
