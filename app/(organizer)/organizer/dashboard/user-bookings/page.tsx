

import { getPendingBookings } from '@/actions/organizer.action'
import PendingBookingsPage from '@/components/OrganizerBookingTable'
import React from 'react'
export type PendingBookings=Awaited<ReturnType<typeof getPendingBookings>>
export type PendingBooking=PendingBookings[number]
const OrganizerBookingTablePage = async () => {
  const pendingBookings=await getPendingBookings()
  return (
    <div>
      <PendingBookingsPage pendingBookings={pendingBookings}/>
    </div>
  )
}

export default OrganizerBookingTablePage