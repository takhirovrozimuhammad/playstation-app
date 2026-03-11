import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group min-h-screen bg-slate-950 text-white">

      {/* background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#030a1c_100%)]" />

      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <main
        className="
        min-h-screen
        pl-[104px]
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:pl-[260px]
        "
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}