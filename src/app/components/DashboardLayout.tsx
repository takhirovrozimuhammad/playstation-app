import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar, { SIDEBAR_MODE_KEY } from "./sidebar";
import { Header } from "./Header";

type SidebarMode = "expanded" | "collapsed" | "auto";

const COLLAPSED_OFFSET = 95;
const EXPANDED_OFFSET = 248;

export function DashboardLayout() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("auto");

  useEffect(() => {
    const syncSidebarMode = () => {
      const saved = localStorage.getItem(SIDEBAR_MODE_KEY) as SidebarMode | null;

      if (
        saved === "expanded" ||
        saved === "collapsed" ||
        saved === "auto"
      ) {
        setSidebarMode(saved);
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

  const contentOffset =
    sidebarMode === "expanded" ? EXPANDED_OFFSET : COLLAPSED_OFFSET;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* Main background */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_22%),linear-gradient(180deg,#050816_0%,#07101f_100%)]" />

      {/* Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0NzU1NjkiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjLTIuMjEgMC00LTEuNzktNC00czEuNzktNCA0LTQgNCAxLjc5IDQgNC0xLjc5IDQtNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 dark:opacity-30" />

      <Sidebar />

      {/* Main content */}
      <div
        className="relative flex min-h-screen flex-col transition-[padding-left] duration-300 ease-out"
        style={{ paddingLeft: `${contentOffset}px` }}
      >
        <Header />
        <main className="flex-1 px-4 pb-4 pt-[144px] md:px-6 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}