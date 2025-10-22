"use client";

import {
  CalendarDays,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  MapPin,
  Calendar,
  Clock,
  PlusCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizerDashboardInfo } from "@/app/(organizer)/organizer/dashboard/page";
import { format } from "date-fns";
import { formatTime } from "@/lib/formaDateTime";

export default function OrganizerDashboardOverview({
  organizerDashboardInfo,
}: {
  organizerDashboardInfo: OrganizerDashboardInfo;
}) {
  const { totalEvents, totalAttendees, upcomingEvents } = organizerDashboardInfo;

  const stats = [
    {
      title: "My Events",
      value: totalEvents,
      change: "+8.3%",
      trend: "up",
      icon: CalendarDays,
      description: "vs last month",
    },
    {
      title: "Total Attendees",
      value: totalAttendees,
      change: "+5.7%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
  ];

  const topPerformingEvents = [
    {
      id: 1,
      name: "Startup Pitch Night",
      attendees: 340,
      revenue: "$6,900",
      location: "Los Angeles",
    },
    {
      id: 2,
      name: "UI/UX Masterclass",
      attendees: 270,
      revenue: "$5,400",
      location: "New York",
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Organizer Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor your events, revenue, and performance.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
              <PlusCircle className="w-4 h-4" />
              Create New Event
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
            return (
              <Card
                key={stat.title}
                className="border-gray-200 hover:shadow-sm transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-semibold text-gray-900 mt-1 mb-2">
                        {stat.value}
                      </h3>
                      <div className="flex items-center gap-1">
                        <TrendIcon
                          className={`w-4 h-4 ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Events Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    My Upcoming Events
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage and track your upcoming events
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  View all
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => (
                  <li
                    key={event.id}
                    className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors group flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                        {event.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(event.date), "MMM dd, yyyy")}
                        </span>
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(String(event.time))}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {event._count.bookings} attendees
                        </p>
                      </div>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Top Performing Events */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Top Performing Events
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Based on attendees & revenue
              </p>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {topPerformingEvents.map((event) => (
                  <li
                    key={event.id}
                    className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.name}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">
                        {event.attendees} attendees
                      </p>
                      <p className="text-xs text-gray-700 font-semibold">
                        {event.revenue}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  View all events
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
