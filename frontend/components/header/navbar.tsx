"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

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
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-50">
            <ul className="flex flex-col">
              <li
                className="p-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <span className="block text-sm font-medium">Profile</span>
                <p className="text-xs text-gray-500">View your profile</p>
              </li>
              <li
                className="p-3 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                <span className="block text-sm font-medium">Log out</span>
                <p className="text-xs text-gray-500">
                  Sign out of your account
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
