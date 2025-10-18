

import { getSpecificEvent } from '@/actions/event'
import { EventFormPage } from '@/components/EventForm'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import type { Events } from '@/app/page'
import { getRole } from '@/actions/user'
type Event=Events[number]
const EditEventPage = async ({params}:{
  params:Promise<{id:string}>
}) => {
  const role=await getRole();
  if(role!=='ADMIN') redirect('/')
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