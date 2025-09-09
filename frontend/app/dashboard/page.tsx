import DashboardStatsContainer from "@/app/dashboard/DashboardStatsContainer";
import LastFlightContainer from "@/app/dashboard/LastFlightContainer";

export default async function Page() {
  return (
    <div className="min-h-screen text-white">
      <div className="flex flex-col items-center pt-16 space-y-10">
        <div className="w-full max-w-5xl p-2">
          <DashboardStatsContainer />
        </div>

        <div className="w-full max-w-5xl p-2">
          <LastFlightContainer />
        </div>
      </div>
    </div>
  );
}
