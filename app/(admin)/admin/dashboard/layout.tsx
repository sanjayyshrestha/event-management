import { getRole } from '@/actions/user'
import Sidebar from '@/components/Sidebar'
import { Role } from '@/types/status'
import { redirect } from 'next/navigation'
import React from 'react'

const DashBoardLayout = async({children}:{
  children:React.ReactNode
}) => {
  const role:Role=await getRole()
  if(role!=='ADMIN') redirect('/')
  return (
     <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}

export default DashBoardLayout