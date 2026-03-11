import React, { useEffect, useRef, useState } from "react";
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
  PanelLeftClose,
  PanelLeftOpen,
  MousePointer2,
} from "lucide-react";

type NavItem = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  exact?: boolean;
};

type SidebarMode = "expanded" | "collapsed" | "auto";

const navItems: NavItem[] = [
  { to: "/", icon: LayoutDashboard, label: "Boshqaruv paneli", exact: true },
  { to: "/rooms", icon: Gamepad2, label: "Xonalar / Konsollar" },
  { to: "/bookings", icon: BookOpen, label: "Bronlar" },
  { to: "/clients", icon: Users, label: "Mijozlar" },
  { to: "/sessions", icon: Clock, label: "Faol seanslar" },
  { to: "/payments", icon: DollarSign, label: "To‘lovlar" },
  { to: "/calendar", icon: CalendarDays, label: "Kalendar" },
  { to: "/notifications", icon: Bell, label: "Bildirishnomalar" },
  { to: "/settings", icon: Settings, label: "Sozlamalar" },
];

export default function Sidebar() {
  const [mode, setMode] = useState<SidebarMode>("auto");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isExpanded = mode === "expanded";
  const isCollapsed = mode === "collapsed";
  const isAuto = mode === "auto";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const asideWidth = isExpanded ? "w-[220px]" : isCollapsed ? "w-[76px]" : "w-[76px] hover:w-[220px]";

  const showText = isExpanded
    ? "opacity-100"
    : isAuto
    ? "opacity-0 group-hover:opacity-100"
    : "opacity-0";

  const showArrow = isExpanded
    ? "opacity-100"
    : isAuto
    ? "opacity-0 group-hover:opacity-100"
    : "opacity-0";

  return (
    <aside
      className={[
        "group fixed left-0 top-0 z-50 h-screen",
        asideWidth,
        "transition-[width] duration-300 ease-out",
      ].join(" ")}
      aria-label="Sidebar navigation"
    >
      <div className="relative h-full overflow-visible border-r border-fuchsia-400/10 bg-[#07101f]/88 backdrop-blur-2xl shadow-[10px_0_40px_rgba(0,0,0,0.28)]">
        {/* layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_center,rgba(56,189,248,0.08),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />

        {/* neon right line */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400/90 via-cyan-400/80 to-blue-500/90 shadow-[0_0_18px_rgba(34,211,238,0.60)]" />

        {/* glow blobs */}
        <div className="absolute -left-16 top-4 h-28 w-28 rounded-full bg-fuchsia-500/16 blur-3xl" />
        <div className="absolute -left-10 bottom-16 h-32 w-32 rounded-full bg-cyan-500/14 blur-3xl" />

        <div className="relative flex h-full flex-col">
          {/* top logo block */}
          <div className="px-2.5 pb-2 pt-3">
            <div className="flex items-center gap-2.5 rounded-[20px] border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.24)]">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/25 shadow-[0_0_26px_rgba(168,85,247,0.26)]">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
                <Gamepad2 className="relative h-5 w-5 text-white" />
              </div>

              <div className="min-w-0 overflow-hidden">
                <h2
                  className={[
                    "truncate text-[14px] font-semibold tracking-[0.01em] text-white transition-all duration-200",
                    showText,
                  ].join(" ")}
                >
                  Ridzhan SASS
                </h2>
                <p
                  className={[
                    "truncate text-[11px] text-white/60 transition-all duration-200 delay-75",
                    showText,
                  ].join(" ")}
                >
                  Admin panel
                </p>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="flex-1 px-2 py-1">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  title={item.label}
                  className={({ isActive }) =>
                    [
                      "relative flex h-11 items-center gap-3 overflow-hidden rounded-xl border px-3",
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
                          <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.10),transparent_36%),radial-gradient(circle_at_right,rgba(34,211,238,0.08),transparent_30%)]" />
                        </>
                      )}

                      <div className="relative z-10 flex w-5 shrink-0 justify-center">
                        <item.icon
                          className={[
                            "h-[18px] w-[18px] transition-all duration-200",
                            isActive
                              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                              : "text-white/80",
                          ].join(" ")}
                        />
                      </div>

                      <span
                        className={[
                          "relative z-10 whitespace-nowrap text-[13px] font-medium transition-all duration-200",
                          showText,
                        ].join(" ")}
                      >
                        {item.label}
                      </span>

                      <ChevronRight
                        className={[
                          "relative z-10 ml-auto h-3.5 w-3.5 shrink-0 transition-all duration-200",
                          showArrow,
                          isActive ? "text-cyan-300" : "text-white/35",
                        ].join(" ")}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* bottom controls */}
          <div className="relative p-2.5" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.18)]"
              title="Sidebar boshqaruvi"
            >
              <PanelLeftOpen className="h-4.5 w-4.5" />
            </button>

            {menuOpen && (
              <div className="absolute bottom-14 left-2 z-[60] w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#12151c]/95 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="text-[13px] font-medium text-white/80">
                    Sidebar boshqaruvi
                  </p>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("expanded");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2.5">
                      <PanelLeftOpen className="h-4 w-4" />
                      Doim ochiq
                    </span>
                    {mode === "expanded" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("collapsed");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2.5">
                      <PanelLeftClose className="h-4 w-4" />
                      Doim yopiq
                    </span>
                    {mode === "collapsed" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("auto");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2.5">
                      <MousePointer2 className="h-4 w-4" />
                      Avto (hover)
                    </span>
                    {mode === "auto" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}