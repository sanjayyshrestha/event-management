'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/event";
import toast from "react-hot-toast";

const EventAdminControls = ({eventId}:{
  eventId:string
}) => {
  const router = useRouter();
  const [isDeleting,setIsDeleting]=useState(false)
  const handleDelete=async()=>{
    if(isDeleting) return;
    try {
      setIsDeleting(true)
      const result=await deleteEvent(eventId)
      if(result.success){
        toast.success(result.message)
      }
    } catch (error) {
      console.log('Error deleting event : ',error)
    }finally{
      setIsDeleting(false)
    }
  }
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => router.push(`/edit-event/${eventId}`)}
        variant="outline"
        className="flex-1"
      >
        Edit
      </Button>
      <Button disabled={isDeleting}  onClick={handleDelete} variant="destructive" className="flex-1">
        {isDeleting?"Deleting...":"Delete"}
      </Button>
    </div>
  );
};

export default EventAdminControls;
