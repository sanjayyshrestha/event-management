import React from "react";
import { Calendar, MapPin, Users, Filter, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Events } from "@/app/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isBooked, toggleBooking } from "@/actions/event";
import BookingButton from "./BookingButton";

import EventAdminControls from "./EventAdminControls";

export default function DiscoverEvents({
  events,
  user,
}: {
  events: Events;
  user: {
    id: string;
    name: string;
    role: string;
  };
}) {

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              Discover Events
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Find and book amazing events near you
            </p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Grid3x3 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Select */}
            <div className="w-full sm:w-48">
              <Select defaultValue="all">
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Select */}
            <div className="w-full sm:w-52">
              <Select defaultValue="all-dates">
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-dates">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {events.map(async (event) => {
            const isFull = event._count.bookings >= event.capacity;
            const isBookingDone = await isBooked(event.id);
            return (
              <Card
                key={event.id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg sm:text-xl leading-tight">
                      {event.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="capitalize shrink-0 text-xs px-2 py-1"
                    >
                      {event.category.name}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-2.5 pb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 shrink-0" />
                    <span>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: "short", // "Mon"
                        year: "numeric",
                        month: "short", // "Oct"
                        day: "numeric", // "18"
                      })}{" "}
                      •{" "}
                      {event.time
                        ? new Date(event.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // shows AM/PM
                          })
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 shrink-0" />
                    <span>
                      {event._count.bookings} / {event.capacity} seats available
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {user?.role === "USER" ? (
                    <BookingButton
                      isFull={isFull}
                      isBookingDone={isBookingDone}
                      eventId={event.id}
                    />
                  ) : <EventAdminControls eventId={event.id}/>}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
