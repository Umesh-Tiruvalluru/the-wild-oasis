import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Filter from "@/components/Filter";

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <Filter
          field="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </div>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
