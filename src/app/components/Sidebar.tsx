import { useEffect, useMemo, useRef, useState } from "react";
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
  PanelLeft,
  Sparkles,
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

const SIDEBAR_MODE_KEY = "ridzhan_sidebar_mode";
const COLLAPSED_WIDTH = 94;
const EXPANDED_WIDTH = 248;

export default function Sidebar() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("auto");
  const [controlOpen, setControlOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem(SIDEBAR_MODE_KEY) as SidebarMode | null;

    if (
      savedMode === "expanded" ||
      savedMode === "collapsed" ||
      savedMode === "auto"
    ) {
      setSidebarMode(savedMode);
    } else {
      setSidebarMode("auto");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_MODE_KEY, sidebarMode);
  }, [sidebarMode]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
        setControlOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setControlOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isExpanded = useMemo(() => {
    if (sidebarMode === "expanded") return true;
    if (sidebarMode === "collapsed") return false;
    return isHovered;
  }, [sidebarMode, isHovered]);

  const sidebarWidth = isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  const textClass = [
    "transition-all duration-300 ease-out",
    isExpanded
      ? "opacity-100 translate-x-0"
      : "pointer-events-none opacity-0 -translate-x-2",
  ].join(" ");

  const arrowClass = [
    "ml-auto shrink-0 transition-all duration-300 ease-out",
    isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
  ].join(" ");

  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed left-0 top-0 z-50 h-screen"
      style={{ width: `${sidebarWidth}px` }}
      onMouseEnter={() => {
        if (sidebarMode === "auto") setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (sidebarMode === "auto") {
          setIsHovered(false);
          setControlOpen(false);
        }
      }}
    >
      <div className="relative h-full overflow-visible transition-[width] duration-300 ease-out">
        {/* Outer neon edge */}
        <div className="absolute inset-y-3 left-2 right-0 rounded-r-[34px] bg-gradient-to-b from-fuchsia-500/20 via-violet-500/10 to-cyan-400/20 blur-xl" />

        {/* Main glass shell */}
        <div className="relative h-full overflow-hidden rounded-r-[34px] border-r border-t border-b border-white/10 bg-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
          {/* Deep background */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,30,0.94),rgba(7,11,24,0.90))]" />

          {/* iOS glass reflections */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_top,rgba(217,70,239,0.14),transparent_26%)]" />

          {/* cyber gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(217,70,239,0.22),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.10),transparent_24%)]" />

          {/* grid */}
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />

          {/* top shine */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* right neon border */}
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400 via-violet-300 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />

          {/* floating glows */}
          <div className="absolute -left-14 top-8 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
          <div className="absolute -left-10 bottom-20 h-32 w-32 rounded-full bg-cyan-500/16 blur-3xl animate-pulse" />

          <div className="relative flex h-full flex-col">
            {/* Logo block */}
            <div className="px-3 pb-3 pt-4">
              <div className="group relative flex h-[62px] items-center gap-3 overflow-hidden rounded-[26px] border border-white/12 bg-white/[0.08] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/25 shadow-[0_0_30px_rgba(168,85,247,0.22)]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                  <Gamepad2 className="relative h-5 w-5 text-white" />
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <h2
                    className={`truncate whitespace-nowrap bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-[16px] font-semibold text-transparent ${textClass}`}
                  >
                    Ridzhan SASS
                  </h2>
                  <p className={`truncate whitespace-nowrap text-[12px] text-white/55 ${textClass}`}>
                    Admin panel
                  </p>
                </div>

                <Sparkles
                  className={[
                    "h-4 w-4 shrink-0 text-cyan-300/80 transition-all duration-300",
                    isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75",
                  ].join(" ")}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2.5 py-1">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    title={item.label}
                    className={({ isActive }) =>
                      [
                        "group relative flex h-[54px] items-center gap-3 overflow-hidden rounded-[22px] border px-3",
                        "transition-all duration-300 ease-out",
                        isActive
                          ? "border-fuchsia-400/25 bg-white/[0.10] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_32px_rgba(0,0,0,0.22),0_0_26px_rgba(168,85,247,0.12)] backdrop-blur-2xl"
                          : "border-transparent bg-white/[0.03] text-white/72 hover:border-white/10 hover:bg-white/[0.07] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.16)]",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(217,70,239,0.14),rgba(139,92,246,0.08),rgba(34,211,238,0.12))]" />
                            <div className="absolute inset-y-1 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-fuchsia-400 via-violet-300 to-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.85)]" />
                            <div className="absolute -left-6 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-fuchsia-500/14 blur-2xl" />
                            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-cyan-400/8 to-transparent" />
                          </>
                        )}

                        <div
                          className={[
                            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] transition-all duration-300",
                            isActive
                              ? "border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-400/15 shadow-[0_0_20px_rgba(34,211,238,0.10)]"
                              : "bg-white/[0.04] group-hover:bg-white/[0.08]",
                          ].join(" ")}
                        >
                          <item.icon
                            className={[
                              "h-[18px] w-[18px] transition-all duration-300",
                              isActive
                                ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.75)]"
                                : "text-white/80 group-hover:text-white",
                            ].join(" ")}
                          />
                        </div>

                        <span
                          className={[
                            "relative z-10 min-w-0 flex-1 truncate whitespace-nowrap text-[14px] font-medium",
                            textClass,
                            isActive ? "text-white" : "",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>

                        <ChevronRight
                          className={[
                            "relative z-10 h-4 w-4",
                            arrowClass,
                            isActive
                              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                              : "text-white/35 group-hover:text-white/60",
                          ].join(" ")}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Bottom controller */}
            <div className="p-3" ref={controlRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setControlOpen((prev) => !prev)}
                  title="Sidebar boshqaruvi"
                  className="group relative flex h-[58px] w-full items-center gap-3 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.07] px-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.10]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/5" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/20 text-white shadow-[0_0_22px_rgba(168,85,247,0.14)]">
                    <PanelLeft className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className={`truncate whitespace-nowrap text-[14px] font-medium text-white ${textClass}`}>
                      Sidebar boshqaruvi
                    </p>
                    <p className={`truncate whitespace-nowrap text-[12px] text-white/55 ${textClass}`}>
                      {sidebarMode === "expanded"
                        ? "Har doim ochiq"
                        : sidebarMode === "collapsed"
                        ? "Har doim yopiq"
                        : "Avto"}
                    </p>
                  </div>
                </button>

                {controlOpen && (
                  <div className="absolute bottom-full left-0 z-[80] mb-3 w-[220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1222]/92 shadow-[0_24px_60px_rgba(0,0,0,0.48)] backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_24%)]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                    <div className="relative border-b border-white/10 px-4 py-3">
                      <p className="text-[13px] font-medium text-white/85">
                        Sidebar boshqaruvi
                      </p>
                    </div>

                    <div className="relative p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSidebarMode("expanded");
                          setControlOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-[14px] text-white/80 transition hover:bg-white/6"
                      >
                        <span>Har doim ochiq</span>
                        {sidebarMode === "expanded" && (
                          <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSidebarMode("collapsed");
                          setControlOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-[14px] text-white/80 transition hover:bg-white/6"
                      >
                        <span>Har doim yopiq</span>
                        {sidebarMode === "collapsed" && (
                          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSidebarMode("auto");
                          setControlOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-[14px] text-white/80 transition hover:bg-white/6"
                      >
                        <span>Avto (hover)</span>
                        {sidebarMode === "auto" && (
                          <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.45)]" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}