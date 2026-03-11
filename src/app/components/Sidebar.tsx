import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Gamepad2,
  Calendar,
  Users,
  Clock,
  DollarSign,
  CalendarDays,
  Bell,
  Settings,
  BookOpen,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/rooms", icon: Gamepad2, label: "Rooms / Consoles" },
  { to: "/bookings", icon: BookOpen, label: "Bookings" },
  { to: "/clients", icon: Users, label: "Clients" },
  { to: "/sessions", icon: Clock, label: "Active Sessions" },
  { to: "/payments", icon: DollarSign, label: "Payments" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="group fixed left-0 top-0 h-screen w-20 hover:w-64 transition-all duration-300 bg-slate-900/40 backdrop-blur-xl border-r border-purple-500/10 z-50 overflow-hidden">

      {/* Neon line */}
      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-blue-500 opacity-50"></div>

      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>

        {/* hidden until hover */}
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
          <h2 className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
            Ridzhan SASS
          </h2>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group/item ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-400 border border-purple-500/30"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />

            {/* label hidden until hover */}
            <span className="opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/50 text-center opacity-0 group-hover:opacity-100 transition">
        <p className="text-xs text-slate-600">© 2026 Ridzhan SASS</p>
        <p className="text-xs text-slate-600">Gaming Club System</p>
      </div>

    </aside>
  );
}