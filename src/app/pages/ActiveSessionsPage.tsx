import { useState } from "react";
import { activeSessions as initialSessions, clients, rooms } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Clock, Play, Square, Plus } from "lucide-react";
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
import { Progress } from "../components/ui/progress";

export function ActiveSessionsPage() {
  const [sessions] = useState(initialSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStartSession = () => {
    toast.success("Session started successfully");
    setIsDialogOpen(false);
  };

  const handleEndSession = (sessionId: string) => {
    toast.success("Session ended successfully");
  };

  const handleExtendSession = (sessionId: string) => {
    toast.success("Session extended by 30 minutes");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Active Sessions</h1>
          <p className="text-slate-400">Monitor and manage ongoing gaming sessions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25">
              <Play className="w-4 h-4 mr-2" />
              Start Session
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/20 text-slate-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Start New Session</DialogTitle>
              <DialogDescription className="text-slate-400">
                Start a gaming session for a walk-in client
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-client" className="text-slate-300">
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
                <Label htmlFor="session-room" className="text-slate-300">
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
                <Label htmlFor="session-duration" className="text-slate-300">
                  Duration 
                </Label>
                <Input
                  id="session-duration"
                  type="number"
                  placeholder="2"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-amount" className="text-slate-300">
                  Amount (SAR)
                </Label>
                <Input
                  id="session-amount"
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
                onClick={handleStartSession}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Start Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active sessions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sessions.map((session) => {
          const room = rooms.find((r) => r.id === session.roomId);
          const client = clients.find((c) => c.id === session.clientId);
          const totalMinutes = Math.round(
            (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)
          );
          const progressPercent =
            ((totalMinutes - session.remainingMinutes) / totalMinutes) * 100;

          return (
            <div
              key={session.id}
              className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6 hover:border-purple-500/40 transition-all"
            >
              {/* Room info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {room?.name}
                  </h3>
                  <p className="text-sm text-slate-400">{room?.consoleType}</p>
                </div>
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/20 to-cyan-600/10">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
              </div>

              {/* Client info */}
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Client</p>
                <p className="font-medium text-white">{client?.name}</p>
              </div>

              {/* Time info */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Started</span>
                  <span className="text-white font-medium">
                    {format(session.startTime, "HH:mm")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ends at</span>
                  <span className="text-white font-medium">
                    {format(session.endTime, "HH:mm")}
                  </span>
                </div>
              </div>

              {/* Remaining time */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Remaining</span>
                  <span
                    className={`font-bold ${
                      session.remainingMinutes <= 15
                        ? "text-red-400"
                        : session.remainingMinutes <= 30
                        ? "text-yellow-400"
                        : "text-cyan-400"
                    }`}
                  >
                    {session.remainingMinutes} min
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              {/* Amount */}
              <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs text-green-400 mb-1">Session Amount</p>
                <p className="text-xl font-bold text-green-400">
                  SAR {session.amount.toFixed(2)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => handleExtendSession(session.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Extend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => handleEndSession(session.id)}
                >
                  <Square className="w-4 h-4 mr-1" />
                  End
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Session summary table */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50">
          <h2 className="text-xl font-bold text-white">Session Details</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-400">Session ID</TableHead>
                <TableHead className="text-slate-400">Room</TableHead>
                <TableHead className="text-slate-400">Client</TableHead>
                <TableHead className="text-slate-400">Start Time</TableHead>
                <TableHead className="text-slate-400">End Time</TableHead>
                <TableHead className="text-slate-400">Remaining</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => {
                const room = rooms.find((r) => r.id === session.roomId);
                const client = clients.find((c) => c.id === session.clientId);
                return (
                  <TableRow
                    key={session.id}
                    className="border-slate-800/50 hover:bg-slate-800/30"
                  >
                    <TableCell className="font-mono text-slate-300">
                      #{session.id.slice(-8)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {room?.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {client?.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {format(session.startTime, "HH:mm")}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {format(session.endTime, "HH:mm")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${
                          session.remainingMinutes <= 15
                            ? "text-red-400"
                            : session.remainingMinutes <= 30
                            ? "text-yellow-400"
                            : "text-cyan-400"
                        }`}
                      >
                        {session.remainingMinutes} min
                      </span>
                    </TableCell>
                    <TableCell className="text-green-400 font-semibold">
                      SAR {session.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                          onClick={() => handleExtendSession(session.id)}
                        >
                          Extend
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={() => handleEndSession(session.id)}
                        >
                          End
                        </Button>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-sm text-slate-400">Active Sessions</p>
              <p className="text-2xl font-bold text-white">{sessions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-yellow-500/20 p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-slate-400">Ending Soon</p>
              <p className="text-2xl font-bold text-white">
                {sessions.filter((s) => s.remainingMinutes <= 30).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Session Revenue</p>
              <p className="text-2xl font-bold text-white">
                SAR {sessions.reduce((sum, s) => sum + s.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
