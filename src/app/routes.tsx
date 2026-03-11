import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { RoomsPage } from "./pages/RoomsPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ActiveSessionsPage } from "./pages/ActiveSessionsPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { CalendarPage } from "./pages/CalendarPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "rooms", Component: RoomsPage },
      { path: "bookings", Component: BookingsPage },
      { path: "clients", Component: ClientsPage },
      { path: "sessions", Component: ActiveSessionsPage },
      { path: "payments", Component: PaymentsPage },
      { path: "calendar", Component: CalendarPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
