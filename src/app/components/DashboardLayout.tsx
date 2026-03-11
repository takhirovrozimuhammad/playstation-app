import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar, {
  SIDEBAR_MODE_KEY,
  COLLAPSED_WIDTH,
  EXPANDED_WIDTH,
  type SidebarMode,
} from "./Sidebar";
import { Header } from "./Header";

const CONTENT_OFFSET_COLLAPSED = COLLAPSED_WIDTH + 1;
const CONTENT_OFFSET_EXPANDED = EXPANDED_WIDTH;

export function DashboardLayout() {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("auto");

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

  const contentOffset =
    sidebarMode === "expanded"
      ? CONTENT_OFFSET_EXPANDED
      : CONTENT_OFFSET_COLLAPSED;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* Main background */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_22%),linear-gradient(180deg,#050816_0%,#07101f_100%)]" />

      {/* Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0NzU1NjkiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjLTIuMjEgMC00LTEuNzktNC00czEuNzktNCA0LTQgNCAxLjc5IDQgNC0xLjc5IDQtNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 dark:opacity-30" />

      <Sidebar />

      {/* Main content */}
      <div
        className="relative flex min-h-screen flex-col transition-[padding-left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ paddingLeft: `${contentOffset}px` }}
      >
        <Header />

        <main className="flex-1 pt-[81px] md:px-6 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}