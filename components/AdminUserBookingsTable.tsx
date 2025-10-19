'use client'
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Booking, Bookings } from "@/app/(admin)/user-bookings/page";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { updateBookingStatus } from "@/actions/event";
const AdminUserBookingsTable = ({ bookings }: { bookings: Booking[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
 const [selectedBooking,setSelectedBooking]=useState<Bookings[number] | null>(null)
 const [editingBooking,setEditingBooking]=useState<Bookings[number] | null>(null)
 const [isEditingBooking,setIsEditingBooking]=useState(false)
 const [status,setStatus]=useState<'CONFIRMED' | 'PENDING' | 'CANCELLED'>('PENDING')

 const handleEditSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   if(!editingBooking) return
         try {
          setIsEditingBooking(true)
           await updateBookingStatus(editingBooking.id, status);
          setEditingBooking(null);
         } catch (error) {
          console.log('Error while editing : ',error)
         }finally{
          setIsEditingBooking(false)
         }
 }
  if (!bookings) return <div>No booking </div>;
  return (
    <Card className="shadow-md rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Bookings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.user.name}</TableCell>
                  <TableCell>{booking.user.email}</TableCell>
                  <TableCell>{booking.event.title}</TableCell>
                  <TableCell>
                   {new Date(booking.event.date).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell>{booking.event.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={()=>setSelectedBooking(booking)} size="sm" variant="outline">
                        View
                      </Button>
                      
                      <Button onClick={()=>setEditingBooking(booking)} size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          
        </div>
      </CardContent>
     {selectedBooking && (
  <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Booking Details</DialogTitle>
      </DialogHeader>

      <div className="space-y-2 text-sm">
        <p><strong>User:</strong> {selectedBooking.user.name}</p>
        <p><strong>Email:</strong> {selectedBooking.user.email}</p>
        <p><strong>Event:</strong> {selectedBooking.event.title}</p>
        <p><strong>Date:</strong> {new Date(selectedBooking.event.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {selectedBooking.status}</p>
        <p><strong>Booked On:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
      </div>
    </DialogContent>
  </Dialog>
)}

{editingBooking && (
  <Dialog open={!!editingBooking} onOpenChange={() => setEditingBooking(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Booking</DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleEditSubmit}
        className="space-y-4"
      >
        <select
          className="w-full border rounded-md p-2"
          defaultValue={editingBooking.status}
          onChange={(e) => setStatus(e.target.value as "PENDING" | "CONFIRMED" | "CANCELLED")}
        >
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <Button disabled={isEditingBooking} type="submit" className="w-full">
          {isEditingBooking?"Saving...":"Save Changes"}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
)}
    </Card>
  
  );
};


export default AdminUserBookingsTable;
