"use client";

import { 
  Users, 
  CalendarDays, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/formaDateTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDashboardInfo } from "@/app/(admin)/admin/dashboard/page";
import {format} from 'date-fns'
// Mock data - replace with real data


export default function AdminDashboardOverview({adminDashboardInfo }:{
  adminDashboardInfo : AdminDashboardInfo
}) {
  const {totalUsers,totelBookings,recentBookings,upcomingEvents}=adminDashboardInfo
  const stats = [
  {
    title: "Total Users",
    value: totalUsers,
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Total Bookings",
    value:totelBookings,
    change: "+8.2%",
    trend: "up",
    icon: CalendarDays,
    description: "vs last month"
  },

];
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 days
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
                <TrendingUp className="w-4 h-4" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
            
            return (
              <Card key={stat.title} className="border-gray-200 hover:shadow-md transition-shadow duration-200">
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
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Recent Bookings
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest booking activity
                  </p>
                </div>
                <Button  variant="ghost" size="sm" className="text-gray-600">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.user.name}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              booking.status === "CONFIRMED"
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-2">
                          {booking.event.title}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(booking.event.date), "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.event.time ? formatTime(String(booking.event.time)) : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                       
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
                            <DropdownMenuItem>Contact user</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Cancel booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Upcoming Events
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Next 7 days
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span className="text-xs font-medium">
                          {format(new Date(event.date), "MMM")}
                        </span>
                        <span className="text-lg font-bold leading-none">
                          {format(new Date(event.date), "dd")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {event.title}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>{event._count.bookings} attendees</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
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