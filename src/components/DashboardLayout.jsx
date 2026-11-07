import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 md:ml-72 p-3 md:p-8">{children}</main>
    </div>
  );
}

export default DashboardLayout;
