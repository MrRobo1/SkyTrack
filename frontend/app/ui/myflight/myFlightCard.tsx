import Image from "next/image";
import { FC } from "react";

interface MyFlightCardProps {
  airplaneName: string;
  departure: string;
  arrival: string;
  distance: number;
  duration: string;
}

const MyFlightCard: FC<MyFlightCardProps> = ({
  airplaneName,
  departure,
  arrival,
  distance,
  duration,
}) => {
  return (
    <div className="bg-blue-100 rounded-xl shadow-md p-4 w-80">
      <div className="relative w-full h-40 mb-3">
        <Image
          src="/Transavia-B737.jpeg"
          className="object-cover rounded-md"
          alt="A Image of the airplane"
          fill
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-base text-gray-800">
          {airplaneName}
        </h2>
        <span className="text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M18 9A8.001 8.001 0 012.39 6.208 1 1 0 013.51 4.79a6.001 6.001 0 0011.278-1.345 1 1 0 10-1.944-.476A4.001 4.001 0 019 7v.055a1 1 0 00.6.928l.814.407a2 2 0 011.04 1.73V13a2 2 0 01-2 2 1 1 0 000 2 4 4 0 004-4v-2.88a4 4 0 00-2.08-3.46L11.6 6.605A2.001 2.001 0 0110 4.945V4a1 1 0 10-2 0v.055A6.001 6.001 0 004.223 2.68 1 1 0 102.276 2.68 8.001 8.001 0 0118 9z" />
          </svg>
        </span>
      </div>
      <p className="text-gray-700">
        {departure} to {arrival}
      </p>
      <p className="text-gray-700">Distance {distance} Nm</p>
      <p className="text-gray-700">Duration {duration}</p>
    </div>
  );
};

export default MyFlightCard;
