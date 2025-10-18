import { getAllEvents } from "@/actions/event";
import { getLoggedInUser, getLoggedInUserId } from "@/actions/user";
import { auth } from "@/auth";
import DiscoverEvents from "@/components/Event";

import { EventFormPage } from "@/components/EventForm";
import Image from "next/image";
import { redirect } from "next/navigation";


 export type Events=Awaited<ReturnType<typeof getAllEvents>>


export default async function Home() {
  const user=await getLoggedInUser()
 
  if(!user) redirect('/login');
  const events:Events=await getAllEvents()
  console.log(events[0])
  return (
   <div>
    <DiscoverEvents events={events} user={user}/>
   </div>
  );
}
