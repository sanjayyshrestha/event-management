"use client";
import React from "react";
import { Button } from "./ui/button";
import { toggleBooking } from "@/actions/event";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const BookingButton = ({
  isFull,
  isBookingDone,
  eventId,
  user
}: {
  isFull: boolean;
  isBookingDone: boolean;
  eventId: string;
  user:{
    name:string
  }
}) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!user) redirect('/login')
    try {
      const result = await toggleBooking(eventId);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.log("Error in toggling : ", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {!isBookingDone || !user  ? (
        <Button
          className="w-full shadow-md hover:shadow-lg transition-shadow"
          disabled={isFull}
        >
          {isFull ? "Fully Booked" : "Book Now"}
        </Button>
        
      ) : (
      <Button variant="outline" className="w-full">
          Cancel Booking
        </Button>
        
      )}
    </form>
  );
};

export default BookingButton;
