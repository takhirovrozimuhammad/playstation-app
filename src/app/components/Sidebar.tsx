import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Gamepad2,
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

export default function Sidebar() {
  return (
    <aside
      className="
        group fixed left-0 top-0 z-50 h-screen
        w-[88px] hover:w-[260px]
        transition-all duration-500 ease-out
      "
    >
      <div className="relative h-full overflow-hidden border-r border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400/80 via-cyan-400/70 to-blue-500/80 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />

        <div className="relative flex h-full flex-col">
          <div className="p-3">
            <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.18)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/25 shadow-[0_0_24px_rgba(168,85,247,0.24)]">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <h2 className="truncate text-base font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Ridzhan SASS
                </h2>
                <p className="truncate text-xs text-white/45 opacity-0 transition-all duration-300 delay-75 group-hover:opacity-100">
                  Admin Access
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-2 py-2">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex h-14 items-center gap-4 rounded-2xl border px-4 transition-all duration-300 ${
                      isActive
                        ? "border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500/18 to-cyan-400/16 text-cyan-300 shadow-[0_0_18px_rgba(168,85,247,0.18)]"
                        : "border-transparent bg-white/[0.02] text-white/65 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex w-6 shrink-0 justify-center">
                        <item.icon
                          className={`h-5 w-5 ${
                            isActive
                              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                              : ""
                          }`}
                        />
                      </div>

                      <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100">
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-3">
            <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.16)]">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/20 text-sm font-semibold text-white">
                RS
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <p className="truncate text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Ridzhan Admin
                </p>
                <p className="truncate text-xs text-white/45 opacity-0 transition-all duration-300 delay-75 group-hover:opacity-100">
                  Gaming Club System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}