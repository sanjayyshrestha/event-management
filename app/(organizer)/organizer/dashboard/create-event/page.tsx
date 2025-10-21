import { getAllCategories } from '@/actions/category';
import { getRole } from '@/actions/user'
import { EventFormPage } from '@/components/EventForm'
import { Role } from '@/types/status';
import { redirect } from 'next/navigation';
import React from 'react'

export type CategoryType=Awaited<ReturnType<typeof getAllCategories>>
const CreateEventPage =async () => {
  const categories=await getAllCategories()
  const role:Role=await getRole();
  if(role!=='ADMIN' && role!=='ORGANIZER') redirect('/')
  return (
    <div>
      <EventFormPage event={null} categories={categories}/>
    </div>
  )
}

export default CreateEventPage