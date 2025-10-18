'use server'

import { prisma } from "@/lib/prisma"


export async function getDbUserId(){
  return 'justfordemopurpose'
}

export async function createEvent(formData:FormData){
const title=formData.get('title') as string
const description=formData.get('description') as string
const category=formData.get('category') as string
const capacity=formData.get('capacity') as string
const date=formData.get('date') as string
const time=formData.get('time') as string
const location=formData.get('location') as string

const creatorId=await getDbUserId()
await prisma.event.create({
data:{
  title,
  description,
  capacity:Number(capacity),
  date:new Date(date),
  time:new Date(time),
  location,
  categoryId:'1',
  createdById:creatorId
}
})
}


export async function getAllEvents(){
 const events= await prisma.event.findMany({
    include:{
      category:{
        select:{
          name:true
        }
      }
    }
  })

  return events;
}