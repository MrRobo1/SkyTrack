"use client";

import * as React from "react";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent text-white px-4 py-2 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="image d'avion sur fond blanc"
          width={50}
          height={50}
        />
      </div>

      {/* Navigation Items */}
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-8">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-lg font-medium hover:underline"
              href="#"
            >
              Stat
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-lg font-medium hover:underline"
              href="#"
            >
              My flight
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-lg font-medium hover:underline"
              href="#"
            >
              Add flight
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Avatar Section */}
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
