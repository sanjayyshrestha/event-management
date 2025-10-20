"use client";

import { Calendar, Clock, Users, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyEvents } from "@/app/(organizer)/organizer/dashboard/my-events/page";
import { formatTime } from "@/lib/formaDateTime";

// Mock data - replace with real fetch
const myEvents = [
  {
    id: 1,
    title: "Tech Summit 2024",
    description: "A conference about the latest tech trends.",
    date: "2025-10-21",
    time: "14:00",
    attendees: 234,
  },
  {
    id: 2,
    title: "Design Workshop",
    description: "Hands-on workshop for UI/UX designers.",
    date: "2025-10-22",
    time: "10:00",
    attendees: 89,
  },
  {
    id: 3,
    title: "Marketing Conference",
    description: "Discussing new marketing strategies and tools.",
    date: "2025-10-23",
    time: "09:00",
    attendees: 456,
  },
];

export default function OrganizerMyEvents({myEvents}:{
  myEvents:MyEvents
}) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Events</h1>
          <p className="text-sm text-gray-500 mt-1">
            All events you have created
          </p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
          + Create Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myEvents.map((event) => (
          <Card
            key={event.id}
            className="border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                {event.title}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {event.time ? formatTime(String(event.time)) : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{event._count.bookings} attendees</span>
              </div>
              <div className="flex justify-end mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-70 hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  {/* TODO: EDIT,VIEW AND DELETE EVENT  */}
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Event</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
