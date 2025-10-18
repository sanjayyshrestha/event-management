import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session=await auth()
  if(!session?.user) redirect('/login');
  console.log(session?.user)
  return (
   <div>
    Home page
   </div>
  );
}
