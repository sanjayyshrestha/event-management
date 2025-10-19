"use client";

import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signout } from "@/actions/user";


interface MobileNavProps {
  user?: {
    name?: string;
    role?: "ADMIN" | "USER" | "ORGANIZER";
  } | null;
}

export default function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baseLinks = [{ name: "Events", href: "/" }];
  const userLinks = [...baseLinks, { name: "My Bookings", href: "/my-bookings" }];
  const adminLinks = [
    ...baseLinks,
    {name:'User bookings',href:'/user-bookings'},
    { name: "User Management", href: "/users" },
    { name: "Create Event", href: "/create-event" },
  ];
  const organizerLinks = [
    ...baseLinks,
    
    { name: "My Events", href: "/organizer/my-events" },
    { name: "Create Event", href: "/organizer/create-event" },
  ];

  const linksToShow =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "ORGANIZER"
      ? organizerLinks
      : user?.role === "USER"
      ? userLinks
      : baseLinks;

      const handleSignOut=async()=>{
        try {
          console.log('sign out button is clicked')
          await signout()
        } catch (error) {
          console.log('Error in sign out : ',error)
        }
      }
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 animate-slide-down">
          <div className="px-4 py-5 space-y-3">
            {/* Links */}
            {linksToShow.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* User Section */}
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {user.name || "User"}
                  </span>
                </div>

                {/* Sign Out Button */}
                {/* TODO: better approach to handle logout if any */}
                <form action={async()=>{
                  await signout()

                }}>
                  <Button
                    size="sm"
                    variant="outline"
                    type="submit"
                    
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Welcome, Guest</span>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
