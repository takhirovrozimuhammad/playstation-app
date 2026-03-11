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
const COLLAPSED_WIDTH = 88;
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
    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    isExpanded
      ? "opacity-100 translate-x-0"
      : "pointer-events-none opacity-0 -translate-x-1.5",
  ].join(" ");

  const arrowClass = [
    "ml-auto shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1.5",
  ].join(" ");

  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed left-0 top-0 z-50 h-screen"
      style={{
        width: `${sidebarWidth}px`,
        transition: "width 420ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
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
      <div className="relative h-full overflow-visible border-r border-cyan-300/20 bg-[rgba(7,16,31,0.72)] backdrop-blur-[24px] shadow-[10px_0_40px_rgba(0,0,0,0.28)]">
        {/* glass layers */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_22%,rgba(255,255,255,0.01)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_center,rgba(56,189,248,0.08),transparent_25%)]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />

        {/* inner top gloss */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

        {/* neon right line */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-fuchsia-400/80 via-cyan-300/90 to-blue-500/80 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />

        {/* glow blobs */}
        <div className="absolute -left-14 top-4 h-28 w-28 rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute -left-8 bottom-16 h-32 w-32 rounded-full bg-cyan-500/12 blur-3xl" />

        <div className="relative flex h-full flex-col overflow-hidden">
          {/* top logo */}
          <div className="px-3 pb-2.5 pt-3.5">
            <div className="flex h-[56px] items-center gap-3 rounded-[20px] border border-white/12 bg-white/[0.08] px-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.03),0_8px_24px_rgba(0,0,0,0.20)]">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/12 bg-[linear-gradient(135deg,rgba(217,70,239,0.22),rgba(56,189,248,0.14))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_20px_rgba(168,85,247,0.18)]">
                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-white/10 to-transparent" />
                <Gamepad2 className="relative h-[18px] w-[18px] text-white" />
              </div>

              <div className="min-w-0 flex-1 overflow-hidden">
                <h2 className={`truncate whitespace-nowrap text-[15px] font-semibold text-white ${textClass}`}>
                  Ridzhan SASS
                </h2>
                <p className={`truncate whitespace-nowrap text-[11px] text-white/62 ${textClass}`}>
                  Admin panel
                </p>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="flex-1 px-2.5 py-1">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  title={item.label}
                  className={({ isActive }) =>
                    [
                      "relative flex h-[48px] items-center gap-3 overflow-hidden rounded-[18px] border px-3",
                      "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "border-cyan-300/28 bg-[linear-gradient(90deg,rgba(217,70,239,0.16),rgba(56,189,248,0.14))] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(34,211,238,0.10)]"
                        : "border-white/[0.04] bg-white/[0.03] text-white/72 hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <>
                          <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-fuchsia-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.75)]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.08),transparent_36%),radial-gradient(circle_at_right,rgba(34,211,238,0.08),transparent_30%)]" />
                        </>
                      )}

                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px]">
                        <item.icon
                          className={[
                            "h-[17px] w-[17px] transition-all duration-300",
                            isActive
                              ? "text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]"
                              : "text-white/78",
                          ].join(" ")}
                        />
                      </div>

                      <span
                        className={[
                          "relative z-10 min-w-0 flex-1 truncate whitespace-nowrap text-[13px] font-medium",
                          textClass,
                        ].join(" ")}
                      >
                        {item.label}
                      </span>

                      <ChevronRight
                        className={[
                          "relative z-10 h-[14px] w-[14px]",
                          arrowClass,
                          isActive ? "text-cyan-200" : "text-white/32",
                        ].join(" ")}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* sidebar control */}
          <div className="p-3 pt-2.5" ref={controlRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setControlOpen((prev) => !prev)}
                title="Sidebar boshqaruvi"
                className="flex h-[54px] w-full items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.07] px-3 text-left backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.03),0_10px_26px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.09]"
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,70,239,0.20),rgba(56,189,248,0.16))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_18px_rgba(34,211,238,0.10)]">
                  <PanelLeft className="h-[18px] w-[18px]" />
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className={`truncate whitespace-nowrap text-[13px] font-medium text-white ${textClass}`}>
                    Sidebar boshqaruvi
                  </p>
                  <p className={`truncate whitespace-nowrap text-[11px] text-white/60 ${textClass}`}>
                    {sidebarMode === "expanded"
                      ? "Har doim ochiq"
                      : sidebarMode === "collapsed"
                      ? "Har doim yopiq"
                      : "Avto"}
                  </p>
                </div>
              </button>

              {controlOpen && (
                <div className="absolute left-0 bottom-[calc(100%+12px)] z-[120] w-[220px] overflow-hidden rounded-[18px] border border-white/12 bg-[rgba(24,27,35,0.92)] backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02)_24%,rgba(255,255,255,0.01)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.10),transparent_36%)]" />

                  <div className="relative border-b border-white/8 px-4 py-3">
                    <p className="text-[12px] font-medium text-white/72">
                      Sidebar control
                    </p>
                  </div>

                  <div className="relative p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSidebarMode("expanded");
                        setControlOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-[13px] text-white/84 transition-all duration-200 hover:bg-white/[0.05]"
                    >
                      <span>Expanded</span>
                      {sidebarMode === "expanded" && (
                        <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSidebarMode("collapsed");
                        setControlOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-[13px] text-white/84 transition-all duration-200 hover:bg-white/[0.05]"
                    >
                      <span>Collapsed</span>
                      {sidebarMode === "collapsed" && (
                        <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSidebarMode("auto");
                        setControlOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-[13px] text-white/84 transition-all duration-200 hover:bg-white/[0.05]"
                    >
                      <span>Expand on hover</span>
                      {sidebarMode === "auto" && (
                        <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}