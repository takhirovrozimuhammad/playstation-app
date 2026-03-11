import { NavLink } from "react-router-dom";
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
        w-[86px] hover:w-[290px]
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      "
    >
      {/* Main glass body */}
      <div
        className="
          relative h-full overflow-hidden
          border-r border-white/10
          bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))]
          backdrop-blur-2xl
          shadow-[0_0_40px_rgba(88,28,255,0.10)]
        "
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Neon edge line */}
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-fuchsia-400/80 via-cyan-400/70 to-blue-500/80 shadow-[0_0_16px_rgba(56,189,248,0.65)]" />

        {/* top glow */}
        <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-10 bottom-24 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex h-full flex-col">
          {/* Logo */}
          <div className="px-4 pt-4 pb-5">
            <div
              className="
                flex items-center gap-3 rounded-[26px]
                border border-white/10
                bg-white/[0.06]
                px-3 py-3
                shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_10px_30px_rgba(0,0,0,0.22)]
                backdrop-blur-xl
              "
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/25 shadow-[0_0_25px_rgba(192,38,211,0.30)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <Gamepad2 className="relative z-10 h-7 w-7 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <h2
                  className="
                    truncate text-[17px] font-semibold tracking-wide text-white
                    opacity-0 translate-x-3
                    transition-all duration-300
                    group-hover:translate-x-0 group-hover:opacity-100
                  "
                >
                  Ridzhan SASS
                </h2>
                <p
                  className="
                    truncate text-xs text-white/45
                    opacity-0 translate-x-3
                    transition-all duration-300 delay-75
                    group-hover:translate-x-0 group-hover:opacity-100
                  "
                >
                  Gameclub Admin Access
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-2">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `
                    relative flex h-[58px] items-center rounded-2xl
                    overflow-hidden
                    transition-all duration-300
                    ${
                      isActive
                        ? "border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-500/18 via-violet-500/14 to-cyan-400/18 shadow-[0_0_20px_rgba(168,85,247,0.16),inset_0_1px_0_rgba(255,255,255,0.07)]"
                        : "border border-transparent bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.06] hover:shadow-[0_10px_30px_rgba(0,0,0,0.20)]"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* active glow */}
                      {isActive && (
                        <>
                          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.75)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.12),transparent_40%),radial-gradient(circle_at_right,rgba(34,211,238,0.10),transparent_35%)]" />
                        </>
                      )}

                      {/* Icon block */}
                      <div className="relative z-10 flex h-full w-[80px] shrink-0 items-center justify-center">
                        <div
                          className={`
                            flex h-11 w-11 items-center justify-center rounded-2xl
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/10 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                                : "bg-transparent group-hover:bg-white/5"
                            }
                          `}
                        >
                          <item.icon
                            className={`
                              h-5 w-5 transition-all duration-300
                              ${
                                isActive
                                  ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.75)]"
                                  : "text-white/75"
                              }
                            `}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="relative z-10 flex min-w-0 flex-1 items-center justify-between pr-4">
                        <span
                          className="
                            truncate text-sm font-medium tracking-[0.02em] text-white/90
                            opacity-0 translate-x-2
                            transition-all duration-300
                            group-hover:translate-x-0 group-hover:opacity-100
                          "
                        >
                          {item.label}
                        </span>

                        <ChevronRight
                          className={`
                            h-4 w-4 shrink-0 transition-all duration-300
                            opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100
                            ${isActive ? "text-cyan-300" : "text-white/35"}
                          `}
                        />
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Bottom user/system card */}
          <div className="p-3">
            <div
              className="
                rounded-[24px] border border-white/10
                bg-white/[0.05]
                px-3 py-3
                backdrop-blur-xl
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.18)]
              "
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/25 border border-white/10">
                  <span className="text-sm font-semibold text-white">RS</span>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                </div>

                <div className="min-w-0 overflow-hidden">
                  <p
                    className="
                      truncate text-sm font-medium text-white
                      opacity-0 translate-x-2
                      transition-all duration-300
                      group-hover:translate-x-0 group-hover:opacity-100
                    "
                  >
                    Ridzhan Admin
                  </p>
                  <p
                    className="
                      truncate text-xs text-white/45
                      opacity-0 translate-x-2
                      transition-all duration-300 delay-75
                      group-hover:translate-x-0 group-hover:opacity-100
                    "
                  >
                    Gaming Club System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}