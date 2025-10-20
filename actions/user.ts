'use server'

import { auth, signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Role } from "@/types/status"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
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
 const user=await getLoggedInUser();
 return user.role
}


export async function signInWithGoogle(){
  await signIn('google')
}

export async function signout(){
  await signOut();
  redirect('/login')
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

export async function getAllUsers(){

  const users=await prisma.user.findMany({
    include:{
      _count:{
        select:{
          bookings:true
        }
      }
    }
  })

  return users;
}


export async function updateUserRole(
  userId: string,
  role: Role,
  currentUserId: string
) {
  // Step 0: Validate role
  const validRoles: Role[] = ["USER", "ADMIN", "ORGANIZER"];
  if (!validRoles.includes(role)) throw new Error("Invalid role");

  // Step 1: Get the user making the request
  const currentUser = await prisma.user.findUnique({where:{id:currentUserId}});
  if (!currentUser || currentUser.role !== "ADMIN") {
    console.log(currentUser)
    throw new Error("Unauthorized");
  }

  // Step 2: Check if target user exists
  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!targetUser) throw new Error("User not found");

  // Step 3: Protect last admin from being demoted
  if (targetUser.role === "ADMIN" && role !== "ADMIN") {
    const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });
    if (totalAdmins === 1) {
      throw new Error("Cannot demote yourself as the last admin");
    }
  }

  // Step 4: Update role
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  // Step 5: Revalidate UI path if using server-side cache or static props
  revalidatePath("/users");

  // Step 6: Handle self-demotion: force logout
  if (userId === currentUserId && role !== "ADMIN") {
    // Return flag for frontend to logout
    return { selfDemoted: true };
  }

  return { success: true };
}
