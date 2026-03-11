import { useState } from "react";
import { bookings, rooms, clients } from "../data/mockData";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
import { StatusBadge } from "../components/StatusBadge";

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("week");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getBookingsForSlot = (date: Date, hour: number) => {
    return bookings.filter((booking) => {
      const bookingDate = booking.startTime;
      const bookingHour = bookingDate.getHours();
      return isSameDay(bookingDate, date) && bookingHour === hour;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
          <p className="text-slate-400">View and manage room availability</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("day")}
            className={
              view === "day"
                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("week")}
            className={
              view === "week"
                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }
          >
            Week
          </Button>
        </div>
      </div>

      {/* Calendar navigation */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(view === "day" ? addDays(currentDate, -1) : addWeeks(currentDate, -1))
              }
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(view === "day" ? addDays(currentDate, 1) : addWeeks(currentDate, 1))
              }
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Week view calendar */}
      {view === "week" && (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Days header */}
              <div className="grid grid-cols-8 border-b border-slate-800/50 bg-slate-900/60">
                <div className="p-4 border-r border-slate-800/50">
                  <span className="text-slate-500 text-sm font-medium">Time</span>
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="p-4 text-center border-r border-slate-800/50 last:border-r-0"
                  >
                    <p className="text-sm text-slate-400">{format(day, "EEE")}</p>
                    <p
                      className={`text-lg font-bold ${
                        isSameDay(day, new Date())
                          ? "text-cyan-400"
                          : "text-white"
                      }`}
                    >
                      {format(day, "d")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="grid grid-cols-8 border-b border-slate-800/50 hover:bg-slate-800/20"
                  >
                    <div className="p-3 border-r border-slate-800/50 bg-slate-900/40">
                      <span className="text-sm text-slate-500 font-medium">
                        {hour.toString().padStart(2, "0")}:00
                      </span>
                    </div>
                    {weekDays.map((day) => {
                      const slotBookings = getBookingsForSlot(day, hour);
                      return (
                        <div
                          key={`${day.toISOString()}-${hour}`}
                          className="p-2 border-r border-slate-800/50 last:border-r-0 min-h-[60px]"
                        >
                          {slotBookings.map((booking) => {
                            const room = rooms.find((r) => r.id === booking.roomId);
                            const client = clients.find(
                              (c) => c.id === booking.clientId
                            );
                            return (
                              <div
                                key={booking.id}
                                className="mb-1 p-2 rounded bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer"
                              >
                                <p className="text-xs font-semibold text-white truncate">
                                  {room?.name}
                                </p>
                                <p className="text-xs text-slate-300 truncate">
                                  {client?.name}
                                </p>
                                <StatusBadge
                                  status={booking.status}
                                  className="text-[10px] mt-1"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day view */}
      {view === "day" && (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">
              {format(currentDate, "EEEE, MMMM d, yyyy")}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => {
              const roomBookings = bookings.filter(
                (b) =>
                  b.roomId === room.id &&
                  isSameDay(b.startTime, currentDate)
              );
              return (
                <div
                  key={room.id}
                  className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white">{room.name}</h4>
                      <p className="text-xs text-slate-400">{room.consoleType}</p>
                    </div>
                    <StatusBadge status={room.status} className="text-xs" />
                  </div>
                  <div className="space-y-2">
                    {roomBookings.length === 0 ? (
                      <p className="text-sm text-slate-500">No bookings today</p>
                    ) : (
                      roomBookings.map((booking) => {
                        const client = clients.find(
                          (c) => c.id === booking.clientId
                        );
                        return (
                          <div
                            key={booking.id}
                            className="p-2 bg-purple-600/20 rounded border border-purple-500/30"
                          >
                            <p className="text-sm font-medium text-white">
                              {format(booking.startTime, "HH:mm")} -{" "}
                              {format(booking.endTime, "HH:mm")}
                            </p>
                            <p className="text-xs text-slate-300">
                              {client?.name}
                            </p>
                            <StatusBadge
                              status={booking.status}
                              className="text-[10px] mt-1"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <StatusBadge status="active" className="text-xs" />
            <span className="text-sm text-slate-400">Active Session</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="confirmed" className="text-xs" />
            <span className="text-sm text-slate-400">Confirmed Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="pending" className="text-xs" />
            <span className="text-sm text-slate-400">Pending Confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="completed" className="text-xs" />
            <span className="text-sm text-slate-400">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
