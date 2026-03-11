import { useEffect, useMemo, useState } from "react";
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
  Lock,
  LockOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type NavItem = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  exact?: boolean;
};

type SidebarMode = "open" | "closed" | "auto";

const STORAGE_KEY = "ridzhan_sidebar_mode";

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

function getInitialMode(): SidebarMode {
  if (typeof window === "undefined") return "auto";

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "open" || saved === "closed" || saved === "auto") {
    return saved;
  }

  return "auto";
}

export default function Sidebar() {
  const [mode, setMode] = useState<SidebarMode>(getInitialMode);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const isExpanded = useMemo(() => {
    if (mode === "open") return true;
    if (mode === "closed") return false;
    return isHovered;
  }, [mode, isHovered]);

  const sidebarWidth = isExpanded ? "w-[228px]" : "w-[84px]";

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-50 h-screen",
        sidebarWidth,
        "transition-[width] duration-300 ease-out",
      ].join(" ")}
      aria-label="Sidebar navigation"
      onMouseEnter={() => {
        if (mode === "auto") setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (mode === "auto") setIsHovered(false);
      }}
    >
      <div className="relative h-full overflow-visible border-r border-fuchsia-400/10 bg-[#07101f]/90 backdrop-blur-2xl shadow-[10px_0_40px_rgba(0,0,0,0.28)]">
        {/* layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* right neon line */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400/90 via-cyan-400/80 to-blue-500/90 shadow-[0_0_18px_rgba(34,211,238,0.60)]" />

        {/* glow blobs */}
        <div className="absolute -left-14 top-6 h-32 w-32 rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute -left-10 bottom-16 h-36 w-36 rounded-full bg-cyan-500/12 blur-3xl" />

        <div className="relative flex h-full flex-col">
          {/* top logo */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex h-[68px] items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.055] px-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.22)]">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/28 via-violet-500/18 to-cyan-400/22 shadow-[0_0_22px_rgba(168,85,247,0.22)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <Gamepad2 className="relative h-5 w-5 text-white" />
              </div>

              <div
                className={[
                  "min-w-0 overflow-hidden transition-all duration-200",
                  isExpanded
                    ? "w-auto opacity-100 translate-x-0"
                    : "w-0 opacity-0 -translate-x-1",
                ].join(" ")}
              >
                <h2 className="truncate text-[15px] font-semibold tracking-[0.01em] text-white">
                  Ridzhan SASS
                </h2>
                <p className="truncate text-[11px] text-white/60">
                  Admin Access
                </p>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="flex-1 px-3 py-2">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    [
                      "group/item relative flex h-[54px] items-center overflow-visible rounded-2xl border px-3",
                      "transition-all duration-200 ease-out",
                      isActive
                        ? "border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/16 via-violet-500/10 to-cyan-400/14 text-cyan-300 shadow-[0_0_22px_rgba(168,85,247,0.18)]"
                        : "border-transparent bg-white/[0.02] text-white/72 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <>
                          <div className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
                          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.10),transparent_36%),radial-gradient(circle_at_right,rgba(34,211,238,0.08),transparent_30%)]" />
                        </>
                      )}

                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <item.icon
                          className={[
                            "h-[18px] w-[18px] transition-all duration-200",
                            isActive
                              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                              : "text-white/80",
                          ].join(" ")}
                        />
                      </div>

                      <div
                        className={[
                          "relative z-10 flex min-w-0 items-center transition-all duration-200",
                          isExpanded
                            ? "ml-1 w-auto opacity-100 translate-x-0"
                            : "ml-0 w-0 opacity-0 -translate-x-1 overflow-hidden",
                        ].join(" ")}
                      >
                        <span className="truncate whitespace-nowrap text-[13px] font-medium">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight
                        className={[
                          "relative z-10 ml-auto h-4 w-4 shrink-0 transition-all duration-200",
                          isExpanded ? "opacity-100" : "opacity-0",
                          isActive ? "text-cyan-300" : "text-white/35",
                        ].join(" ")}
                      />

                      {/* Tooltip faqat always closed holatda */}
                      {!isExpanded && mode === "closed" && (
                        <div className="pointer-events-none absolute left-[92px] top-1/2 z-[60] -translate-y-1/2 opacity-0 transition-all duration-150 group-hover/item:translate-x-1 group-hover/item:opacity-100">
                          <div className="whitespace-nowrap rounded-xl border border-white/10 bg-[#0b1528]/95 px-3 py-2 text-xs font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                            {item.label}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* bottom profile + mode control */}
          <div className="p-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_28px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/20 text-sm font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.16)]">
                  RS
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.85)]" />
                </div>

                <div
                  className={[
                    "min-w-0 overflow-hidden transition-all duration-200",
                    isExpanded
                      ? "w-auto opacity-100 translate-x-0"
                      : "w-0 opacity-0 -translate-x-1",
                  ].join(" ")}
                >
                  <p className="truncate text-sm font-medium text-white">
                    Ridzhan Admin
                  </p>
                  <p className="truncate text-[11px] text-white/60">
                    Gaming Club System
                  </p>
                </div>
              </div>

              <div
                className={[
                  "overflow-hidden transition-all duration-200",
                  isExpanded ? "mt-3 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0",
                ].join(" ")}
              >
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("open")}
                    className={[
                      "flex h-10 items-center justify-center gap-1 rounded-xl border text-[11px] font-medium transition-all",
                      mode === "open"
                        ? "border-cyan-400/30 bg-cyan-400/12 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.18)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white",
                    ].join(" ")}
                    title="Har doim ochiq"
                  >
                    <PanelLeftOpen className="h-3.5 w-3.5" />
                    Open
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("closed")}
                    className={[
                      "flex h-10 items-center justify-center gap-1 rounded-xl border text-[11px] font-medium transition-all",
                      mode === "closed"
                        ? "border-fuchsia-400/30 bg-fuchsia-400/12 text-fuchsia-300 shadow-[0_0_14px_rgba(217,70,239,0.16)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white",
                    ].join(" ")}
                    title="Har doim yopiq"
                  >
                    <PanelLeftClose className="h-3.5 w-3.5" />
                    Closed
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("auto")}
                    className={[
                      "flex h-10 items-center justify-center gap-1 rounded-xl border text-[11px] font-medium transition-all",
                      mode === "auto"
                        ? "border-emerald-400/30 bg-emerald-400/12 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.16)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white",
                    ].join(" ")}
                    title="Hover bo‘lsa ochiladi"
                  >
                    <LockOpen className="h-3.5 w-3.5" />
                    Auto
                  </button>
                </div>
              </div>

              {/* collapsed holatda bitta lock button */}
              {!isExpanded && (
                <div className="mt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (mode === "auto") setMode("open");
                      else if (mode === "open") setMode("closed");
                      else setMode("auto");
                    }}
                    className="group/lock relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75 transition-all hover:bg-white/[0.08] hover:text-white"
                    title={
                      mode === "open"
                        ? "Mode: Open"
                        : mode === "closed"
                        ? "Mode: Closed"
                        : "Mode: Auto"
                    }
                  >
                    {mode === "open" ? (
                      <LockOpen className="h-4 w-4" />
                    ) : mode === "closed" ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Settings className="h-4 w-4" />
                    )}

                    <div className="pointer-events-none absolute left-[54px] top-1/2 z-[60] -translate-y-1/2 opacity-0 transition-all duration-150 group-hover/lock:translate-x-1 group-hover/lock:opacity-100">
                      <div className="whitespace-nowrap rounded-xl border border-white/10 bg-[#0b1528]/95 px-3 py-2 text-xs font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        {mode === "open"
                          ? "Mode: Open"
                          : mode === "closed"
                          ? "Mode: Closed"
                          : "Mode: Auto"}
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}