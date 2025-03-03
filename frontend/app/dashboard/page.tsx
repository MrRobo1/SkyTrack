import DashboardStatsContainer from "@/app/dashboard/DashboardStatsContainer";
import LastFlightContainer from "@/app/dashboard/LastFlightContainer";

export default async function Page() {
  return (
    <div className="min-h-screen text-white items-center">
      <div className="pt-16 container mx-auto p-4 space-y-6">
        <DashboardStatsContainer />
      </div>

      <div className="pt-16 container mx-auto p-4 space-y-6">
        <LastFlightContainer />
      </div>
    </div>
  );
}
