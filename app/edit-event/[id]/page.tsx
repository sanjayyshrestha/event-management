

import { getSpecificEvent } from '@/actions/event'
import { EventFormPage } from '@/components/EventForm'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import type { Events } from '@/app/page'
import { getRole } from '@/actions/user'
import { Role } from '@/types/status'
type Event=Events[number]
const EditEventPage = async ({params}:{
  params:Promise<{id:string}>
}) => {
  const role:Role=await getRole();
  if(role!=='ADMIN' && role!=='ORGANIZER') redirect('/')
  const {id:eventId}=await params
  const event=await getSpecificEvent(eventId);
  if(!event) notFound()
  return (
    <div>
      <EventFormPage event={event} />
    </div>
  )
}

export default EditEventPage