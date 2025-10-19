import { isBooked } from '@/actions/event';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users } from 'lucide-react';
import BookingButton from './BookingButton';
import EventAdminControls from './EventAdminControls';
import type { Events } from "@/app/page";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
const EventCard = ({events,user}:{
  events:Events;
  user:{
    name:string
    role:string 
    id:string
  }
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {events.map(async (event) => {
            const isFull = event._count.bookings >= event.capacity;
            const isBookingDone = await isBooked(event.id);
            const userBooking=event.bookings[0];
            const bookingstatus=userBooking?.status
            return (
              <Card
                key={event.id}
                className=" hover:shadow-lg transition-shadow"
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
                      {event.capacity-event._count.bookings} / {event.capacity} seats available
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {user?.role === "ADMIN" ? (
                    <EventAdminControls eventId={event.id}/>
                    
                  ) :  <BookingButton
                     status={bookingstatus}
                      user={user}
                      isFull={isFull}
                      isBookingDone={isBookingDone}
                      eventId={event.id}
                    />}
                </CardFooter>
              </Card>
            );
          })}
    </div>
  )
}

export default EventCard