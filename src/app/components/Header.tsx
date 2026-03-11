import { useState } from "react";
import { Bell, Search, User, LogOut } from "lucide-react";
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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07101f]/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              type="text"
              placeholder="Search clients, bookings, rooms..."
              className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] pl-10 text-slate-100 placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl focus:border-fuchsia-400/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-fuchsia-400/15"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="ml-2 flex items-center gap-2 md:ml-4 md:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#07101f] bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-0 text-[10px] text-white shadow-[0_0_14px_rgba(168,85,247,0.28)]">
                {unreadNotifications}
              </Badge>
            )}
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-3 rounded-2xl px-2 py-1 text-slate-300 hover:bg-white/[0.05]"
              >
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-slate-200">Receptionist</p>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(168,85,247,0.22)]">
                  <User className="h-5 w-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl border border-white/10 bg-[#0b1220]/95 text-slate-200 backdrop-blur-xl"
            >
              <DropdownMenuLabel className="text-slate-300">
                My Account
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="cursor-pointer text-slate-300 focus:bg-white/[0.06] focus:text-slate-100"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="cursor-pointer text-slate-300 focus:bg-white/[0.06] focus:text-slate-100"
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-400 focus:bg-white/[0.06] focus:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}