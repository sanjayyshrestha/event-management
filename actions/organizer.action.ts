'use server'

import { prisma } from "@/lib/prisma";
import { getLoggedInUserId } from "./user"
import { revalidatePath } from "next/cache";

export async function getMyEvents(){
 const userId=await getLoggedInUserId();

const myEvents= await prisma.event.findMany({
  where:{createdById:userId},
  include:{
    _count:{
      select:{
        bookings:{
          where:{
            status:'CONFIRMED'
          }
        }
      }
    }
  }
 })
 return myEvents
}

export async function getPendingBookings(){
  const myId=await getLoggedInUserId();

  const pendingBookings=await prisma.booking.findMany({
    where:{
      status:'PENDING',
      event:{
        createdById:myId
      }
    },
    include:{
      user:true,
      event:true
    }
  })
  return pendingBookings
}

export async function approveBooking(bookingId:string){
  await prisma.booking.update({
    where:{id:bookingId},
    data:{
      status:'CONFIRMED'
    }
  })
  revalidatePath('/organizer/dashboard/user-bookings')
}

export async function rejectBooking(bookingId:string){
  await prisma.booking.update({
    where:{id:bookingId},
    data:{
      status:'CANCELLED'
    }
  })
   revalidatePath('/organizer/dashboard/user-bookings')
}

export async function getDataForOrganizerDashboard(){
const myId=await getLoggedInUserId();
 const [totalEvents,totalAttendees,upcomingEvents] =await prisma.$transaction([
    prisma.event.count({
      where:{
        createdById:myId
      }
    }),

    prisma.booking.count({
      where:{
        event:{
          createdById:myId
        },
        status:'CONFIRMED'
      }
    }),

    prisma.event.findMany({
      where:{
        createdById:myId
      },
      take:3,
      orderBy:{
        date:'asc'
      },
      include:{
        _count:{
          select:{
            bookings:{
              where:{
                status:'CONFIRMED'
              }
            }
          }
        }
      }
    })
  ])

  return {
    totalEvents,totalAttendees,upcomingEvents
  }
}