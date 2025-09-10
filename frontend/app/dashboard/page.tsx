import DashboardStatsContainer from "@/app/dashboard/DashboardStatsContainer";
import LastFlightContainer from "@/app/dashboard/LastFlightContainer";
import TitleDash from "@/app/dashboard/TitleDash";
import WeatherWidget from "@/app/ui/dashboard/WeatherWidget";

export default async function Page() {
  return (
    <div className="min-h-screen text-white">
      <div className="w-full max-w-5xl mx-auto pt-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <TitleDash />
          <WeatherWidget />
        </div>
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
