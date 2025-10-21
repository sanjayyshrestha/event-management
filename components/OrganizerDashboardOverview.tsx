"use client";

import {
  CalendarDays,
  Users,
  DollarSign,
  Star,
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

// Mock data — replace with real data

const myEvents = [
  {
    id: 1,
    name: "React Conference 2024",
    date: "Oct 25, 2024",
    time: "10:00 AM",
    location: "New York",
    attendees: 240,
    revenue: "$4,800",
  },
  {
    id: 2,
    name: "Design Thinking Workshop",
    date: "Nov 1, 2024",
    time: "2:00 PM",
    location: "San Francisco",
    attendees: 95,
    revenue: "$1,900",
  },
  {
    id: 3,
    name: "Product Launch Meetup",
    date: "Nov 10, 2024",
    time: "6:00 PM",
    location: "Chicago",
    attendees: 320,
    revenue: "$6,400",
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

export default function OrganizerDashboardOverview({organizerDashboardInfo}:{
  organizerDashboardInfo:OrganizerDashboardInfo
}) {
const { totalEvents,totalAttendees,upcomingEvents}=organizerDashboardInfo
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

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Organizer Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor your events, revenue, and performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
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
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
            return (
              <Card
                key={stat.title}
                className="border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
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
        </div>

        {/* My Events & Top Performing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Events List */}
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-4">
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
              <div className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors group flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                        {format(new Date(event.date), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                         {event.time ? formatTime(String(event.time)) : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                
                        <p className="text-xs text-gray-500">
                          {event._count.bookings} attendees
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit event</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Events */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Top Performing Events
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Based on attendees & revenue
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {topPerformingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
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
                      <span>{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-sm text-gray-600">
                  View all events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
