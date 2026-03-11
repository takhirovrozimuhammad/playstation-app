import { Badge } from "./ui/badge";
import { RoomStatus } from "../data/mockData";

interface StatusBadgeProps {
  status: RoomStatus | string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "free":
        return "bg-green-500/20 text-green-400 border-green-500/30 shadow-green-500/10";
      case "occupied":
        return "bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/10";
      case "booked":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/10";
      case "cleaning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-yellow-500/10";
      case "active":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-cyan-500/10";
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30 shadow-orange-500/10";
      case "confirmed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/10";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30 shadow-green-500/10";
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30 shadow-gray-500/10";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <Badge
      className={`${getStatusStyles(status)} border shadow-lg capitalize font-semibold ${className}`}
    >
      {status}
    </Badge>
  );
}
