import { getRole } from '@/actions/user'
import { EventFormPage } from '@/components/EventForm'
import { redirect } from 'next/navigation';
import React from 'react'

const CreateEventPage =async () => {
  const role=await getRole();
  if(role!=='ADMIN') redirect('/')
  return (
    <div>
      <EventFormPage event={null}/>
    </div>
  )
}

export default CreateEventPage