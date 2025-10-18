// components/Navbar.tsx (Server Component)
import React from "react";
import { Calendar, Moon, User } from "lucide-react";
import MobileNav from "./MobileNav";
import { getLoggedInUser } from "@/actions/user";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  const user = await getLoggedInUser();
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              EventHub
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/my-bookings"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              My Bookings
            </Link>
            {user?.role === "ADMIN" && (
              <Link
                href="/create-event"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Create Event
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                {user?.image?<Image src={user.image} height={20} width={20} alt="User image" className="rounded-full" />:<User className="w-5 h-5 text-white" />}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {user?.name}
              </span>
            </div>
          </div>

          <div className="md:hidden">
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
