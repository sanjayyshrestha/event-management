import { getRole } from '@/actions/user'
import { EventFormPage } from '@/components/EventForm'
import { Role } from '@/types/status';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateEventPage =async () => {
  const role:Role=await getRole();
  if(role!=='ADMIN' && role!=='ORGANIZER') redirect('/')
  return (
    <div>
      <EventFormPage event={null}/>
    </div>
  )
}

export default CreateEventPage