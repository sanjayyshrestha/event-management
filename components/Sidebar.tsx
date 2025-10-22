"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  CalendarDays,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Menu,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Role } from "@/types/status";

type SidebarProps = {
  role?: Role;
  onLogout?: () => void;
};

export default function Sidebar({ role = "ADMIN", onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Role-based nav link definitions
  const navLinks =
    role === "ADMIN"
      ? [
          {
            name: "Overview",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            description: "Dashboard overview",
          },
          {
            name: "Events",
            href: "/admin/dashboard/events",
            icon: Users,
            description: "Manage events",
          },
          {
            name: "Users",
            href: "/admin/dashboard/users",
            icon: Users,
            description: "Manage users",
          },
          {
            name: "User Bookings",
            href: "/admin/dashboard/user-bookings",
            icon: CalendarDays,
            description: "View all user bookings",
          },
          {
            name: "Create Event",
            href: "/admin/dashboard/create-event",
            icon: PlusCircle,
            description: "Add new event",
          },
        ]
      : [
          {
            name: "Overview",
            href: "/organizer/dashboard",
            icon: LayoutDashboard,
            description: "Your dashboard overview",
          },
          {
            name: "My Events",
            href: "/organizer/dashboard/my-events",
            icon: CalendarDays,
            description: "Manage your hosted events",
          },
          {
            name: "My Bookings",
            href: "/organizer/dashboard/my-bookings",
            icon: ClipboardList,
            description: "View your event bookings",
          },
          {
            name: "Pending Approvals",
            href: "/organizer/dashboard/user-bookings",
            icon: CheckCircle2,
            description: "Approve or reject attendee requests",
          },
          {
            name: "Create Event",
            href: "/organizer/dashboard/create-event",
            icon: PlusCircle,
            description: "Host a new event",
          },
        ];

  const isActive = (href: string) => {
    if (!pathname) return false;

    if (href === "/admin/dashboard" || href === "/organizer/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = () => {
    if (onLogout) return onLogout();
    console.log(
      "Logout clicked — implement onLogout prop to perform real logout"
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-[60] lg:hidden"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar - Fixed on mobile, Sticky on desktop */}
      <aside
        aria-hidden={!open && "true"}
        className={cn(
          // Mobile: Fixed positioning with slide animation
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300",
          "lg:transform-none", // Remove transform on desktop
          
          // Desktop: Sticky positioning
          "lg:sticky lg:top-0 lg:left-auto lg:z-40",
          "lg:h-screen", // Full viewport height on desktop
          
          // Common styles
          "flex flex-col bg-white border-r border-gray-200",
          "w-[min(92vw,20rem)] lg:w-64",

          // Mobile slide animation
          open
            ? "translate-x-0 shadow-lg lg:shadow-none"
            : "-translate-x-full lg:translate-x-0"
        )}
        role="navigation"
      >
        <div className="p-6 pb-4 border-b border-gray-100 flex-shrink-0 min-w-0">
          <div className="flex items-center gap-2 mb-1 min-w-0">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 capitalize truncate">
              {role} Panel
            </h1>
          </div>
          <p className="text-xs text-gray-500 ml-10 truncate">
            Manage your {role === "ADMIN" ? "platform" : "events"}
          </p>
        </div>

        <Separator className="mb-2 flex-shrink-0" />

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overscroll-contain">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block"
                aria-current={active ? "page" : undefined}
              >
                <div
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}

                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-200 flex-shrink-0",
                      active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />

                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "text-sm font-medium truncate",
                        active ? "text-white" : "text-gray-900"
                      )}
                    >
                      {link.name}
                    </div>
                    <div
                      className={cn(
                        "text-xs truncate transition-opacity",
                        active
                          ? "text-gray-300 opacity-90"
                          : "text-gray-500 opacity-0 group-hover:opacity-100"
                      )}
                    >
                      {link.description}
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-all duration-200",
                      active
                        ? "text-white opacity-100 translate-x-0"
                        : "text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </Button>

          {/* User info */}
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {role === "ADMIN" ? "AD" : "OR"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {role === "ADMIN" ? "Admin User" : "Organizer User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {role === "ADMIN"
                    ? "admin@eventhub.com"
                    : "organizer@eventhub.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}