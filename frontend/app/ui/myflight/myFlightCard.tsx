import Image from "next/image";
import { FC } from "react";
import { MdiInformationVariantBox } from "@/app/ui/icons/InfoIcon";

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
    <div className="bg-blue-100 rounded-xl shadow-md p-4 w-80 transform transition-transform duration-300 hover:scale-105">
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
          <MdiInformationVariantBox />
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
