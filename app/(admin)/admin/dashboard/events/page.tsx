

import { getAllEvents } from '@/actions/event';
import { getLoggedInUser } from '@/actions/user';
import { Events } from '@/app/page';
import DiscoverEvents from '@/components/Event';
import React from 'react'

const AdminEventPage =async () => {
  const user = await getLoggedInUser();
  const events: Events= await getAllEvents();
  return (
    <div>
      <DiscoverEvents events={events} user={user} />
    </div>
  )
}

export default AdminEventPage


