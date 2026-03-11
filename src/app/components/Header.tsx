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
    <header className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-xl border-b border-purple-500/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search clients, bookings, rooms..."
              className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 ml-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs border-2 border-slate-900">
                {unreadNotifications}
              </Badge>
            )}
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-slate-800/50 text-slate-300"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-200">Receptionist</p>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-slate-900 border-slate-800"
            >
              <DropdownMenuLabel className="text-slate-300">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="text-slate-300 focus:bg-slate-800 focus:text-slate-100"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="text-slate-300 focus:bg-slate-800 focus:text-slate-100"
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:bg-slate-800 focus:text-red-300"
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
