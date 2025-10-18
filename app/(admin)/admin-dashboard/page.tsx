import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminOnly = async () => {
  const session=await auth()

  if(session?.user?.role!=='ADMIN') redirect('/')
  return (
    <div>AdminOnly</div>
  )
}

export default AdminOnly