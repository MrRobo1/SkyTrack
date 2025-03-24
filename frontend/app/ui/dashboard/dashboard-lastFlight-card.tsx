import Image from "next/image";
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
    <div className="bg-white rounded-md shadow-md p-6 space-x-4 w-full max-w-xl">
      <h2 className="text-lg font-bold text-black">Last flight</h2>
      <div className="flex p-4 items-center space-x-6">
        <Image
          src="/Transavia-B737.jpeg"
          width={180}
          height={400}
          className="rounded-md"
          alt="A Image of the airplane"
        />

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
