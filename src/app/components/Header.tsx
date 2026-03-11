import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Settings,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";
import {
  SIDEBAR_MODE_KEY,
  COLLAPSED_WIDTH,
  EXPANDED_WIDTH,
  type SidebarMode,
} from "./Sidebar";

const THEME_KEY = "ridzhan_theme";

type ThemeMode = "light" | "dark";

export function Header() {
  const navigate = useNavigate();
  const [unreadNotifications] = useState(3);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("auto");

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      applyTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: ThemeMode = prefersDark ? "dark" : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    const syncSidebarMode = () => {
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
    };

    syncSidebarMode();

    window.addEventListener("ridzhan-sidebar-mode-change", syncSidebarMode);
    window.addEventListener("storage", syncSidebarMode);

    return () => {
      window.removeEventListener("ridzhan-sidebar-mode-change", syncSidebarMode);
      window.removeEventListener("storage", syncSidebarMode);
    };
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_KEY, mode);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const inputOffset = useMemo(() => {
    if (sidebarMode !== "expanded") return 0;
    return EXPANDED_WIDTH - (COLLAPSED_WIDTH + 1);
  }, [sidebarMode]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[78px]">
      <div className="relative h-full overflow-visible border-b border-slate-200/70 bg-white/70 backdrop-blur-3xl transition-colors duration-300 dark:border-cyan-400/15 dark:bg-[#07101f]/58">
        {/* base layer */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.82))] dark:bg-[linear-gradient(180deg,rgba(7,16,31,0.96),rgba(7,16,31,0.78))]" />

        {/* glass gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(168,85,247,0.10),transparent_16%),radial-gradient(circle_at_right,rgba(59,130,246,0.10),transparent_16%),linear-gradient(90deg,rgba(168,85,247,0.06),rgba(59,130,246,0.04),rgba(34,197,94,0.05))] dark:bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.10),transparent_16%),radial-gradient(circle_at_right,rgba(34,211,238,0.10),transparent_16%),linear-gradient(90deg,rgba(168,85,247,0.10),rgba(59,130,246,0.08),rgba(34,211,238,0.10))]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-[0.045] dark:[background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

        {/* lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent dark:via-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-violet-400/30 via-cyan-400/20 to-blue-400/30 dark:from-fuchsia-400/30 dark:via-cyan-300/30 dark:to-blue-400/30" />

        <div className="relative flex h-full items-center justify-between gap-4 px-4 md:px-6">
          {/* Search */}
          <div className="min-w-0 flex-1">
            <div
              className="max-w-[520px] transition-[margin-left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ marginLeft: `${inputOffset}px` }}
            >
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-violet-500/0 via-violet-400/20 to-cyan-400/20 opacity-0 blur-sm transition duration-300 group-focus-within:opacity-100 dark:from-fuchsia-500/0 dark:via-fuchsia-400/20 dark:to-cyan-400/20" />

                <div className="relative overflow-hidden rounded-[20px] border border-slate-300/70 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 group-focus-within:border-violet-400/40 group-focus-within:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.18)] dark:group-focus-within:border-fuchsia-400/30 dark:group-focus-within:bg-white/[0.08]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/30 dark:from-white/[0.05] dark:via-transparent dark:to-white/[0.03]" />
                  <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-violet-500/8 to-transparent dark:from-fuchsia-500/8" />

                  <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-600 dark:text-slate-400 dark:group-focus-within:text-cyan-300" />

                  <Input
                    type="text"
                    placeholder="Search clients, bookings, rooms..."
                    className="relative z-10 h-[42px] border-0 bg-transparent pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-500 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="ml-3 flex shrink-0 items-center gap-2 md:gap-3">
            {/* Theme toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="group relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-300/70 bg-white/60 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-slate-400/70 hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.16)] dark:hover:border-white/15 dark:hover:bg-white/[0.08] dark:hover:text-white"
              title={theme === "dark" ? "Kun rejimi" : "Tun rejimi"}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/20 dark:from-white/[0.05] dark:via-transparent dark:to-white/[0.03]" />
              {theme === "dark" ? (
                <Sun className="relative z-10 h-[18px] w-[18px] text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <Moon className="relative z-10 h-[18px] w-[18px] text-violet-600 transition-transform duration-300 group-hover:-rotate-12 dark:text-cyan-300" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="group relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-300/70 bg-white/60 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-slate-400/70 hover:bg-white/80 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.16)] dark:hover:border-white/15 dark:hover:bg-white/[0.08] dark:hover:text-white"
              onClick={() => navigate("/notifications")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/20 dark:from-white/[0.05] dark:via-transparent dark:to-white/[0.03]" />
              <Bell className="relative z-10 h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-105" />

              {unreadNotifications > 0 && (
                <Badge className="absolute -right-1 -top-1 z-20 flex h-5 min-w-5 items-center justify-center rounded-full border border-white/70 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 px-1 text-[10px] font-semibold text-white shadow-[0_0_16px_rgba(168,85,247,0.35)] dark:border-[#07101f]">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative h-auto rounded-[20px] border border-slate-300/70 bg-white/60 px-2.5 py-1.5 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-slate-400/70 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_24px_rgba(0,0,0,0.16)] dark:hover:border-white/15 dark:hover:bg-white/[0.08]"
                >
                  <div className="relative flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
                        Receptionist
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1.5">
                        <Sparkles className="h-3 w-3 text-cyan-600 dark:text-cyan-300" />
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                          Admin
                        </p>
                      </div>
                    </div>

                    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-400 shadow-[0_0_24px_rgba(168,85,247,0.24)]">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/18 to-transparent" />
                      <User className="relative z-10 h-[18px] w-[18px] text-white" />
                    </div>

                    <ChevronDown className="hidden h-4 w-4 text-slate-500 transition duration-300 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-white sm:block" />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="z-[9999] w-64 overflow-hidden rounded-[24px] border border-slate-300/70 bg-white/95 p-1.5 text-slate-800 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-3xl dark:border-white/10 dark:bg-[#0b1220]/95 dark:text-slate-200 dark:shadow-[0_24px_60px_rgba(0,0,0,0.52)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_24%)]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent dark:via-white/25" />

                  <div className="relative">
                    <DropdownMenuLabel className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.20)]">
                          <User className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Receptionist
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Admin account
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-white/10" />

                    <DropdownMenuItem
                      onClick={() => navigate("/settings")}
                      className="mt-1 cursor-pointer rounded-2xl px-3 py-2.5 text-slate-700 outline-none transition focus:bg-slate-100 focus:text-slate-900 dark:text-slate-300 dark:focus:bg-white/[0.06] dark:focus:text-slate-100"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/settings")}
                      className="cursor-pointer rounded-2xl px-3 py-2.5 text-slate-700 outline-none transition focus:bg-slate-100 focus:text-slate-900 dark:text-slate-300 dark:focus:bg-white/[0.06] dark:focus:text-slate-100"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Preferences</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/notifications")}
                      className="cursor-pointer rounded-2xl px-3 py-2.5 text-slate-700 outline-none transition focus:bg-slate-100 focus:text-slate-900 dark:text-slate-300 dark:focus:bg-white/[0.06] dark:focus:text-slate-100"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-white/10" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer rounded-2xl px-3 py-2.5 text-red-500 outline-none transition focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-white/[0.06] dark:focus:text-red-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}