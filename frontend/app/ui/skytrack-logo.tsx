import Image from "next/image";

type SkyTrackLogoProps = {
  size?: number;
};

export default function SkytrackLogo({ size = 80 }: SkyTrackLogoProps) {
  return (
    <div className="relative shadow-xs" style={{ width: size, height: size }}>
      <Image
        src="/LogoSkyTrackWhite.png"
        alt="Logo avion"
        fill
        className="object-contain"
      />
    </div>
  );
}
