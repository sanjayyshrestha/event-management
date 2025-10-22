import { getAllEvents } from "@/actions/event";
import { getLoggedInUser, getRole } from "@/actions/user";

import DiscoverEvents from "@/components/Event";
import Link from "next/link";
import { redirect } from "next/navigation";

export type Events = Awaited<ReturnType<typeof getAllEvents>>;

export default async function Home() {
  const user = await getLoggedInUser();
  const role=await getRole()
  const events: Events = await getAllEvents();
 
  return (
    <div>
    <DiscoverEvents events={events} user={user} />
    </div>
  );
}
