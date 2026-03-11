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
  ChevronRight,
} from "lucide-react";

type NavItem = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  exact?: boolean;
};

const navItems: NavItem[] = [
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
        w-[88px] hover:w-[244px]
        transition-[width] duration-300 ease-out
      "
      aria-label="Sidebar navigation"
    >
      <div className="relative h-full overflow-hidden border-r border-fuchsia-400/10 bg-[#07101f]/88 backdrop-blur-2xl shadow-[10px_0_40px_rgba(0,0,0,0.28)]">
        {/* layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_center,rgba(56,189,248,0.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />

        {/* neon right line */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400/90 via-cyan-400/80 to-blue-500/90 shadow-[0_0_18px_rgba(34,211,238,0.60)]" />

        {/* glow blobs */}
        <div className="absolute -left-16 top-4 h-36 w-36 rounded-full bg-fuchsia-500/16 blur-3xl" />
        <div className="absolute -left-10 bottom-16 h-40 w-40 rounded-full bg-cyan-500/14 blur-3xl" />

        <div className="relative flex h-full flex-col">
          {/* top logo block */}
          <div className="px-3 pb-3 pt-4">
            <div className="flex items-center gap-3 rounded-[26px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.24)]">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/25 shadow-[0_0_26px_rgba(168,85,247,0.26)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <Gamepad2 className="relative h-6 w-6 text-white" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <h2 className="truncate text-[17px] font-semibold tracking-[0.01em] text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                  Ridzhan SASS
                </h2>
                <p className="truncate text-xs text-white/60 opacity-0 transition-all duration-200 delay-75 group-hover:opacity-100">
                  Admin Access
                </p>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="flex-1 px-2 py-1">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  title={item.label}
                  className={({ isActive }) =>
                    [
                      "relative flex h-14 items-center gap-4 overflow-hidden rounded-2xl border px-4",
                      "transition-all duration-200 ease-out",
                      isActive
                        ? "border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/18 via-violet-500/12 to-cyan-400/16 text-cyan-300 shadow-[0_0_24px_rgba(168,85,247,0.24)]"
                        : "border-transparent bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <>
                          <div className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.10),transparent_36%),radial-gradient(circle_at_right,rgba(34,211,238,0.08),transparent_30%)]" />
                        </>
                      )}

                      <div className="relative z-10 flex w-6 shrink-0 justify-center">
                        <item.icon
                          className={[
                            "h-5 w-5 transition-all duration-200",
                            isActive
                              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                              : "text-white/80",
                          ].join(" ")}
                        />
                      </div>

                      <span className="relative z-10 whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-200 group-hover:opacity-100">
                        {item.label}
                      </span>

                      <ChevronRight
                        className={[
                          "relative z-10 ml-auto h-4 w-4 shrink-0 transition-all duration-200",
                          "opacity-0 group-hover:opacity-100",
                          isActive ? "text-cyan-300" : "text-white/35",
                        ].join(" ")}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav> 
  
          {/* bottom profile */}
          <div className="p-3">
            <div className="flex items-center gap-3 rounded-[26px] border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.18)]">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/20 text-sm font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.16)]">
                RS
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.85)]" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <p className="truncate text-sm font-medium text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                  Ridzhan Admin
                </p>
                <p className="truncate text-xs text-white/60 opacity-0 transition-all duration-200 delay-75 group-hover:opacity-100">
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