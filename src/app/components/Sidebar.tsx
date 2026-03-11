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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900/40 backdrop-blur-xl border-r border-purple-500/10 z-50">
      {/* Neon gradient line */}
      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-blue-500 opacity-50"></div>
      
      {/* Logo section */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Ridzhan SASS
            </h2>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
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
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-400 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-cyan-400" : ""
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/50">
        <div className="text-xs text-slate-600 text-center">
          <p>© 2026 Ridzhan SASS</p>
          <p className="mt-1">Gaming Club System</p>
        </div>
      </div>
    </aside>
  );
}
