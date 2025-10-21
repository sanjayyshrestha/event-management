'use client'

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PendingBookings } from "@/app/(organizer)/organizer/dashboard/user-bookings/page"
import { approveBooking, rejectBooking } from "@/actions/organizer.action"
import toast from "react-hot-toast"
// import { getPendingBookings, approveBooking, rejectBooking } from "@/actions/booking" // you'll make these
// import { toast } from "sonner" // or your preferred toast lib

export default function PendingBookingsPage({pendingBookings}:{
  pendingBookings:PendingBookings
}) {

  const [loading, setLoading] = useState(false)


  const handleAction = async (bookingId: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await approveBooking(bookingId)
        toast.success("Booking approved successfully")
      } else {
        await rejectBooking(bookingId)
        toast.error("Booking rejected")
      }

      // Optimistic update
      // setBookings((prev) => prev.filter((b) => b.id !== bookingId))
    } catch (error) {
      console.error(error)
      toast.error("Action failed. Please try again.")
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading pending bookings...</div>

  if (pendingBookings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        🎉 All caught up! No pending bookings right now.
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Pending Bookings</h1>
      <p className="text-sm text-muted-foreground">Review and manage attendee requests awaiting your approval.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pendingBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                {booking.event.title}
              </CardTitle>
              <Badge variant="secondary" className="capitalize">
                {booking.event.title}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>User:</strong> {booking.user.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Date:</strong> {new Date(booking.event.date).toLocaleDateString('en-US')}
              </p>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleAction(booking.id, "approve")}
                  className="flex-1"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button
                  onClick={() => handleAction(booking.id, "reject")}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
