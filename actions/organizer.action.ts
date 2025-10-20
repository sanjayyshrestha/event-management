'use server'

import { prisma } from "@/lib/prisma";
import { getLoggedInUserId } from "./user"

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