interface LastFlightCardProps {
  registration: string;
  departure: string;
  arrival: string;
  distanceNm: number;
  flightTime: string;
}

export default function LastFlightCard({
  registration,
  departure,
  arrival,
  distanceNm,
  flightTime,
}: LastFlightCardProps) {
  return (
    <div className="bg-white rounded-md shadow-md p-4 space-x-4 w-full max-w-xl">
      <h2 className="text-lg font-bold text-black">Last flight</h2>
      <div className="flex p-4 items-center">
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            className="w-32 h-20 object-cover rounded-md"
          />
        </div>

        {/* Informations du vol */}
        <div className="text-gray-600 flex flex-col space-y-1">
          <span className="font-semibold">
            Flight registration {registration}
          </span>
          <span>
            {departure} to {arrival}
          </span>
          <span>{distanceNm} Nm</span>
          <span>{flightTime}</span>
        </div>
      </div>
    </div>
  );
}
