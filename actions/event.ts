"use server";

import { prisma } from "@/lib/prisma";
import { getLoggedInUserId, getRole } from "./user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Role } from "@/types/status";

export async function createEvent(formData: FormData) {
  const creatorId = await getLoggedInUserId();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId=formData.get('category') as string
  const capacity = formData.get("capacity") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const dateTimeString = `${date}T${time}:00`; // "2025-10-24T10:00:00" or "2025-10-24T22:00:00"
const dateTime = new Date(dateTimeString);
  await prisma.event.create({
    data: {
      title,
      description,
      capacity: Number(capacity),
      date: new Date(date),
      time:dateTime,
      location,
      categoryId: "1",
      createdById: creatorId,
    },
  });
  
  
}

export async function getAllEvents() {
  const userId=await getLoggedInUserId();
  const events = await prisma.event.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      bookings:{
        where:{userId},
        select:{
          status:true
        }
      },
      _count:{
        select:{
          bookings:true
        }
      }
    },
  });

  return events;
}

export  async function getSpecificEvent(eventId:string){
 const event=await prisma.event.findUnique({
  where:{id:eventId},
  include:{
    category:{
     select:{
      name:true
     }
    
    },
     bookings: {
      select: { status: true }, // include the bookings array with only status
    },
    _count:{
      select:{
        bookings:true
      }
    }
  },
  
 })

 return event;
}

export async function updateEvent(formData:FormData,eventId:string){
   const role: Role = await getRole();
  const userId = await getLoggedInUserId(); // fetch the current user ID

  if (role !== "ADMIN" && role !== "ORGANIZER") {
    throw new Error("Unauthorized");
  }

  // Fetch the event to check ownership
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { createdById: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Organizer can only edit their own event
  if (role === "ORGANIZER" && event.createdById !== userId) {
    throw new Error("Unauthorized: You cannot edit someone else's event");
  }
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId=formData.get('category') as string
  const capacity = formData.get("capacity") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const dateTimeString = `${date}T${time}:00`; // "2025-10-24T10:00:00" or "2025-10-24T22:00:00"
const dateTime = new Date(dateTimeString);
  await prisma.event.update({
    where:{id:eventId},
    data:{
      title,
      description,
      capacity: Number(capacity),
      date: new Date(date),
      time:dateTime,
      location,
      categoryId: "1",
    }
  })
}

export async function isBooked(eventId: string){
  const userId=await getLoggedInUserId()
  const booking = await prisma.booking.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  return !!booking; // true if booking exists
}

export async function toggleBooking(eventId:string){
  const userId=await getLoggedInUserId();
  const existingBooking=await prisma.booking.findUnique({
    where:{
      userId_eventId:{
        userId,
        eventId
      }
    }
  })

  if(existingBooking){
    await prisma.booking.delete({
      where:{
        userId_eventId:{
          userId,
          eventId
        }
      }
    })
    revalidatePath('/')
    return {
      success:true,
      message:"Booking cancelled successfully"
    }
  }else{
    await prisma.booking.create({
      data:{
        eventId,
        userId
      }
    })
revalidatePath('/')
     return {
      success:true,
      message:"Your booking is pending approval. You will be notified once it's confirmed."
    }
  }
  
}


export async function deleteEvent(eventId:string){
  const role=await getRole();
  if(role!=='ADMIN') throw new Error("Unauthorized")

    await prisma.event.delete({
      where:{id:eventId}
    })
    revalidatePath('/')
    return {
      success:true,
      message:"Event deleted successfully"
    }
}

export async function getUserBookings(){
  const userId=await getLoggedInUserId();

const userBookings= await prisma.event.findMany({
  where:{
    bookings:{
      some:{
        userId,
        status:{
         in:['CONFIRMED','PENDING']
        }
      }
    }
  },
  include: {
      category: {
        select: {
          name: true,
        },
      },
      _count:{
        select:{
          bookings:true
        }
      },
            bookings:{
        where:{userId},
        select:{
          status:true
        }
      },
    },
 })
 return userBookings
}

export async function updateBookingStatus(bookingId:string,status:'CONFIRMED' | 'PENDING' | 'CANCELLED'){
  await prisma.booking.update({
    where:{id:bookingId},
    data:{
      status
    }
  })

  revalidatePath('/user-bookings')
}