import { getAllCategories } from '@/actions/category';
import { getRole } from '@/actions/user'
import { EventFormPage } from '@/components/EventForm'
import { Role } from '@/types/status';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateEventPage =async () => {
  const role:Role=await getRole();
  const categories=await getAllCategories()
  if(role!=='ADMIN' && role!=='ORGANIZER') redirect('/')
  return (
    <div>
      <EventFormPage event={null} categories={categories}/>
    </div>
  )
}

export default CreateEventPage