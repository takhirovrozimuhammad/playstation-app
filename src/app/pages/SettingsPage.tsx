import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import {
  Settings,
  User,
  Bell,
  Palette,
  DollarSign,
  Shield,
  Gamepad2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    sessionEnding: true,
    newBooking: true,
    paymentReceived: true,
    roomCleaning: false,
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage system preferences and configuration</p>
      </div>

      {/* Settings sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4 sticky top-6">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-cyan-400 bg-slate-800/50"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300">
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300">
                <Gamepad2 className="w-4 h-4 mr-3" />
                Rooms & Pricing
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300">
                <DollarSign className="w-4 h-4 mr-3" />
                Payment Methods
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300">
                <Palette className="w-4 h-4 mr-3" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300">
                <Shield className="w-4 h-4 mr-3" />
                Security
              </Button>
            </div>
          </div>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile settings */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Profile Settings</h2>
                <p className="text-sm text-slate-400">
                  Manage your account information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-slate-300">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    defaultValue="Admin"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-slate-300">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    defaultValue="User"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@ridzhan.com"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-300">
                  Role
                </Label>
                <Input
                  id="role"
                  defaultValue="Receptionist"
                  disabled
                  className="bg-slate-800/50 border-slate-700 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Notification settings */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-600/20">
                <Bell className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Notification Preferences
                </h2>
                <p className="text-sm text-slate-400">
                  Choose what notifications you receive
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="notif-session" className="text-slate-200">
                    Session Ending Soon
                  </Label>
                  <p className="text-sm text-slate-500">
                    Alert when sessions are about to end
                  </p>
                </div>
                <Switch
                  id="notif-session"
                  checked={notifications.sessionEnding}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, sessionEnding: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="notif-booking" className="text-slate-200">
                    New Bookings
                  </Label>
                  <p className="text-sm text-slate-500">
                    Get notified of new booking requests
                  </p>
                </div>
                <Switch
                  id="notif-booking"
                  checked={notifications.newBooking}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newBooking: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="notif-payment" className="text-slate-200">
                    Payment Received
                  </Label>
                  <p className="text-sm text-slate-500">
                    Alert when payments are processed
                  </p>
                </div>
                <Switch
                  id="notif-payment"
                  checked={notifications.paymentReceived}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, paymentReceived: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor="notif-cleaning" className="text-slate-200">
                    Room Cleaning
                  </Label>
                  <p className="text-sm text-slate-500">
                    Notify when rooms require cleaning
                  </p>
                </div>
                <Switch
                  id="notif-cleaning"
                  checked={notifications.roomCleaning}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, roomCleaning: checked })
                  }
                />
              </div>
            </div>
          </div>

          {/* Pricing settings */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-600/20">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Pricing Configuration
                </h2>
                <p className="text-sm text-slate-400">Set hourly rates for rooms</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ps5-premium" className="text-slate-300">
                    PS5 Premium (SAR/hour)
                  </Label>
                  <Input
                    id="ps5-premium"
                    type="number"
                    defaultValue="75"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ps5-standard" className="text-slate-300">
                    PS5 Standard (SAR/hour)
                  </Label>
                  <Input
                    id="ps5-standard"
                    type="number"
                    defaultValue="60"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ps4-rate" className="text-slate-300">
                    PS4 Classic (SAR/hour)
                  </Label>
                  <Input
                    id="ps4-rate"
                    type="number"
                    defaultValue="40"
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-slate-300">
                    Currency
                  </Label>
                  <Select defaultValue="sar">
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                      <SelectItem value="sar">SAR - Saudi Riyal</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Security settings */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-600/20">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Security</h2>
                <p className="text-sm text-slate-400">
                  Manage password and security settings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-300">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
