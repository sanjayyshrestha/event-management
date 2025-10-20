'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
const EventOrganizerControl = ({eventId}:{
  eventId:string
}) => {
  const router=useRouter()
  return (
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={()=>{
                      router.push(`/edit-event/${eventId}`)
                    }}>Edit Event</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
  )
}

export default EventOrganizerControl