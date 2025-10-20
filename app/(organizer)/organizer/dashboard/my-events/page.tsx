

import { getMyEvents } from '@/actions/organizer.action'
import OrganizerMyEvents from '@/components/OrganizerMyEvent'
import React from 'react'

export type MyEvents=Awaited<ReturnType<typeof getMyEvents>>
const MyEventPage = async () => {

  const myEvents=await getMyEvents()
  return (
    <div>
      <OrganizerMyEvents myEvents={myEvents}/>
    </div>
  )
}

export default MyEventPage