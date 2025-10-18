'use client'
import React from "react";
import { Button } from "./ui/button";
import { toggleBooking } from "@/actions/event";
import toast from "react-hot-toast";

const BookingButton = ({
  isFull,
  isBookingDone,
  eventId
}: {
  isFull: boolean;
  isBookingDone: boolean;
  eventId:string
}) => {
  
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const result=await toggleBooking(eventId)
      if(result.success){
        toast.success(result.message)
      }
    } catch (error) {
      console.log('Error in toggling : ',error)
    }
  }
  return (
    <form onSubmit={handleSubmit} >
      {isBookingDone ? (
        <Button variant="outline" className="w-full">
          Cancel Booking
        </Button>
      ) : (
        <Button
          className="w-full shadow-md hover:shadow-lg transition-shadow"
          disabled={isFull}
        >
          {isFull ? "Fully Booked" : "Book Now"}
        </Button>
      )}
    </form>
  );
};

export default BookingButton;
