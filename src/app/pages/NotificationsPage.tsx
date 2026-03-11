import { useState } from "react";
import { notifications as initialNotifications } from "../data/mockData";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "info":
        return "border-blue-500/30 bg-blue-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "success":
        return "border-green-500/30 bg-green-500/5";
      case "error":
        return "border-red-500/30 bg-red-500/5";
      default:
        return "border-slate-500/30 bg-slate-500/5";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-slate-400">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50"
        >
          Mark All as Read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Info</p>
              <p className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.type === "info").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-yellow-500/20 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-slate-400">Warnings</p>
              <p className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.type === "warning").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Success</p>
              <p className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.type === "success").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-red-500/20 p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-sm text-slate-400">Errors</p>
              <p className="text-2xl font-bold text-white">
                {notifications.filter((n) => n.type === "error").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-12 text-center">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-slate-900/40 backdrop-blur-xl rounded-xl border shadow-lg p-4 transition-all hover:border-purple-500/40 ${
                getNotificationStyles(notification.type)
              } ${!notification.read ? "border-l-4" : ""}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${
                          !notification.read ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-flex items-center justify-center w-2 h-2 bg-cyan-400 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 whitespace-nowrap">
                      {format(notification.timestamp, "MMM dd, HH:mm")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
