"use client";

import Link from "next/link";
import { GridiconsStatsAlt2 } from "@/app/ui/icons/StatIcon";
import { MdiAirplaneSearch } from "@/app/ui/icons/MyFlightIcon";
import { MdiAirplanePlus } from "@/app/ui/icons/AddFlightIcon";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Stat", href: "/dashboard", icon: GridiconsStatsAlt2 },
  { name: "My flight", href: "/dashboard/flight", icon: MdiAirplaneSearch },
  {
    name: "Add flight",
    href: "/dashboard/addflight",
    icon: MdiAirplanePlus,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
