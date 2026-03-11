import { useState } from "react";
import {
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Settings,
  Sparkles,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";

export function Header() {
  const navigate = useNavigate();
  const [unreadNotifications] = useState(3);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-[82px]">
      <div className="relative h-full border-b border-cyan-400/15 bg-[#07101f]/58 backdrop-blur-3xl">
         {/* base dark layer */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,31,0.96),rgba(7,16,31,0.78))]" />

        {/* glass / cyber gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(217,70,239,0.10),transparent_16%),radial-gradient(circle_at_right,rgba(34,211,238,0.10),transparent_16%),linear-gradient(90deg,rgba(168,85,247,0.10),rgba(59,130,246,0.08),rgba(34,211,238,0.10))]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* top and bottom light lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-fuchsia-400/30 via-cyan-300/30 to-blue-400/30" />

        <div className="relative flex h-full items-center justify-between gap-4 pl-[120px] pr-4 md:pr-6">
          {/* Search area */}
          <div className="flex-1">
            <div className="max-w-[520px]">
              <div className="group relative">
                <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-400/20 to-cyan-400/20 opacity-0 blur-sm transition duration-300 group-focus-within:opacity-100" />

                <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 group-focus-within:border-fuchsia-400/30 group-focus-within:bg-white/[0.08]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] via-transparent to-white/[0.03]" />
                  <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-fuchsia-500/8 to-transparent" />

                  <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-cyan-300" />

                  <Input
                    type="text"
                    placeholder="Search clients, bookings, rooms..."
                    className="relative z-10 h-[44px] border-0 bg-transparent pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-3 flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="group relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
              onClick={() => navigate("/notifications")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.03]" />
              <Bell className="relative z-10 h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-105" />

              {unreadNotifications > 0 && (
                <Badge className="absolute -right-1 -top-1 z-20 flex h-5 min-w-5 items-center justify-center rounded-full border border-[#07101f] bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 px-1 text-[10px] font-semibold text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group h-auto rounded-[20px] border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                >
                  <div className="relative flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold leading-none text-slate-100">
                        Receptionist
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1.5">
                        <Sparkles className="h-3 w-3 text-cyan-300" />
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Admin
                        </p>
                      </div>
                    </div>

                    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-400 shadow-[0_0_24px_rgba(168,85,247,0.24)]">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/18 to-transparent" />
                      <User className="relative z-10 h-4.5 w-4.5 text-white" />
                    </div>

                    <ChevronDown className="hidden h-4 w-4 text-slate-400 transition duration-300 group-hover:text-white sm:block" />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1220]/95 p-1.5 text-slate-200 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_24%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative">
                  <DropdownMenuLabel className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.20)]">
                        <User className="h-5 w-5 text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          Receptionist
                        </p>
                        <p className="text-xs text-slate-400">Admin account</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="mt-1 cursor-pointer rounded-2xl px-3 py-2.5 text-slate-300 outline-none transition focus:bg-white/[0.06] focus:text-slate-100"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="cursor-pointer rounded-2xl px-3 py-2.5 text-slate-300 outline-none transition focus:bg-white/[0.06] focus:text-slate-100"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/notifications")}
                    className="cursor-pointer rounded-2xl px-3 py-2.5 text-slate-300 outline-none transition focus:bg-white/[0.06] focus:text-slate-100"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-white/10" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-2xl px-3 py-2.5 text-red-400 outline-none transition focus:bg-white/[0.06] focus:text-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}