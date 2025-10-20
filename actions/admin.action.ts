'use server'

import { prisma } from "@/lib/prisma"

export async function getDataForAdminDashboard(){
 
 const [totalUsers,totelBookings,recentBookings,upcomingEvents]= 
 await prisma.$transaction([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.booking.findMany({
      orderBy:{createdAt:'desc'},
      take:4,
      include:{
        user:{
          select:{
            name:true
          }
        },
        event:{
          select:{
            title:true,
            time:true,
            date:true
          }
        }
      }
    }),
    prisma.event.findMany({
      where:{date:{gt:new Date()}},
      take:3,
      include:{
        _count:{
          select:{
            bookings:true
          }
        }
      },
      orderBy:{date:'asc'}
    })
  ])

  return {totalUsers,totelBookings,recentBookings,upcomingEvents};
}