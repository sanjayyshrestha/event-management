"use client";
import React from "react";
import { Button } from "./ui/button";
import { toggleBooking } from "@/actions/event";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Status } from "@/types/status";
import { Clock, Lock, X } from "lucide-react";

const BookingButton = ({
  status,
  isFull,
  isBookingDone,
  eventId,
  user,
}: {
  status: Status;
  isFull: boolean;
  isBookingDone: boolean;
  eventId: string;
  user: {
    name: string;
  };
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) redirect("/login");
    try {
      const result = await toggleBooking(eventId);
      if (result.success) {
        toast(result.message);
      }
    } catch (error) {
      console.log("Error in toggling : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {!user ? (
        <Button
          disabled
          variant="outline"
          className="w-full h-11 bg-white border-gray-300 text-gray-900 font-medium hover:bg-white cursor-not-allowed"
        >
          <Lock className="w-4 h-4 mr-2" />
          Login to Book
        </Button>
      ) : !isBookingDone ? (
        <Button
          disabled={isFull}
          type="submit"
          className={`w-full h-11 font-medium transition-all ${
            isFull
              ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
          }`}
        >
          {isFull ? "Fully Booked" : "Book Now"}
        </Button>
      ) : (
        <>
          {status === "PENDING" && (
            <Button
              variant="outline"
              disabled
              className="w-full h-11 bg-amber-50 border-amber-200 text-amber-900 font-medium hover:bg-amber-50 cursor-default"
            >
              <Clock className="w-4 h-4 mr-2" />
              Pending Approval
            </Button>
          )}
          {status === "CONFIRMED" && (
            <Button
            variant='outline'
              type="submit"
              className="w-full h-11 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            >
              Cancel Booking
            </Button>
          )}
          {status === "CANCELLED" && (
            <div className="flex flex-col">
            <Button
          disabled={isFull}
          type="submit"
          className={`w-full h-11 font-medium transition-all ${
            isFull
              ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
          }`}
        >
          {isFull ? "Fully Booked" : "Book Now"}
        </Button>
        <p className="text-sm  italic text-red-400 mt-2 ">You previously cancelled this booking</p>
        </div>
        
          )}

        </>
      )}
    </form>
  );
};

export default BookingButton;
