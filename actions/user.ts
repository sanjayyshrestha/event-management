'use server'

import { auth, signIn } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(formData:FormData){

  const name=formData.get('name') as string
  const email=formData.get('email') as string
  const password=formData.get('password') as string

  if(!email || !password || !name){
    throw new Error("All field are required")
  }

  const existingUser=await prisma.user.findUnique({
    where:{
      email
    }
  })

  if(existingUser) throw new Error("User already registered")

    const hashedPassword=await bcrypt.hash(password,10)
    await prisma.user.create({
      data:{
        name,
        email,
        password:hashedPassword
      }
    })

   
}

export const login=async(formData:FormData)=>{
  const email=formData.get('email') as string;
  const password=formData.get('password') as string;

  try {

    await signIn('credentials',{
      redirect:false,
      callbackUrl:'/',
      email,
      password
    })

  } catch (error) {
    const err=error as Error
    console.log(err.cause)
  }

  redirect('/')
}


export async function getLoggedInUser(){
  const session=await auth();
  const user=session?.user
  return user;
}

export async function getLoggedInUserId(){
  const session=await auth();
  const userId=session?.user.id;
  return userId
}

export async function getRole(){
  const session=await auth();
  const role=session?.user.role
  return role;
}


export async function signInWithGoogle(){
  await signIn('google')
}

export async function getUserBookingList(){
  
 const userBookings= await prisma.booking.findMany({
  
    include:{
      user:{
        select:{
          name:true,
          email:true
        }
      },
      event:{
        select:{
          title:true,
          date:true,
          location:true,
        }
      }
    }
  })

  return userBookings
}