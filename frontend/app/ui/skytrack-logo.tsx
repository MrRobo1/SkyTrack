import Image from "next/image";

export default function SkytrackLogo() {
  return (
    <div className="relative h-12 w-12 bg-white rounded-sm shadow-xs shadow-white">
      <Image
        src="/LogoSkyTrack.png"
        alt="Logo avion en papier"
        fill
        className="object-contain"
      />
    </div>
  );
}
