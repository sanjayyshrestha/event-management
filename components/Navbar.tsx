// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import MobileNav from "./MobileNav";
import { getLoggedInUser, signout } from "@/actions/user";
import { Button } from "./ui/button";

export default async function Navbar() {
  const user = await getLoggedInUser();

  // Define navigation items by role
  const baseLinks = [{ name: "Events", href: "/" }];

  const userLinks = [
    ...baseLinks,
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const adminLinks = [
    ...baseLinks,
    {name:'Dashboard',href:'/admin/dashboard'},
    
  ];

  const organizerLinks = [
    ...baseLinks,
    { name:'Dashboard',href:'/organizer/dashboard' },
   
  ];

  const linksToShow =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "ORGANIZER"
      ? organizerLinks
      : user?.role === "USER"
      ? userLinks
      : baseLinks;

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              EventHub
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {linksToShow.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        height={40}
                        width={40}
                        alt="User avatar"
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                </div>
                <form action={signout}>
                  <Button
                    variant="outline"
                    size="sm"
                    type="submit"
                    className="hover:bg-gray-100"
                  >
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
