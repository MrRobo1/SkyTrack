import DashboardStatsContainer from "@/app/dashboard/DashboardStatsContainer";

export default async function Page() {
  return (
    <div className="min-h-screen text-white">
      <div className="pt-16 container mx-auto p-4 space-y-6">
        <DashboardStatsContainer />
      </div>

      <div>
        <h1>Last flight</h1>
      </div>
    </div>
  );
}
