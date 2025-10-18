

import { getSpecificEvent } from '@/actions/event'
import { EventFormPage } from '@/components/EventForm'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Events } from '@/app/page'
type Event=Events[number]
const EditEventPage = async ({params}:{
  params:Promise<{id:string}>
}) => {
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