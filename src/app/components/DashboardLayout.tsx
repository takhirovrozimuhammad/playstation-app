import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      {/* Main background */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.10),transparent_22%),linear-gradient(180deg,#050816_0%,#07101f_100%)]" />

      {/* Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjLTIuMjEgMC00LTEuNzktNC00czEuNzktNCA0LTQgNCAxLjc5IDQgNC0xLjc5IDQtNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <Sidebar />

      {/* Main content never moves */}
      <div className="relative flex min-h-screen flex-col pl-[95px]">
        <Header />
        <main className="flex-1 pt-[144px] p-4 md:p-6">
          <Outlet />
        </main> 
      </div>
    </div> 
  );
}