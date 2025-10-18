import { getUserBookings } from '@/actions/event'
import { getLoggedInUser } from '@/actions/user';
import EventCard from '@/components/EventCard';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

const MyBookings =async() => {
  const bookedEvent=await getUserBookings();
  const user=await getLoggedInUser()
  console.log(bookedEvent)
  if(!user) return (
    <Card className="py-12">
              <CardContent className="text-center text-muted-foreground">
                <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>You haven't logged in</p>
                <p className="text-sm mt-2">Sign to get started</p>
              </CardContent>
            </Card>
  )
  return (
    <>
    {
      bookedEvent.length>0? 
      <EventCard events={bookedEvent} user={user} />:
      (
         <Card className="py-12">
              <CardContent className="text-center text-muted-foreground">
                <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>You haven't booked any events yet</p>
                <p className="text-sm mt-2">Browse events to get started</p>
              </CardContent>
            </Card>
      )
    }
    </>
  )
}

export default MyBookings