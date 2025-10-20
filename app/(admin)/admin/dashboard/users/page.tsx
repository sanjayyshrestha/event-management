
import { getAllUsers, getLoggedInUserId, getRole } from '@/actions/user'
import AdminUserList from '@/components/AdminUserList'
import { redirect } from 'next/navigation';
import React from 'react'

export type Users=Awaited<ReturnType<typeof getAllUsers>>
const AdminUserPage =async  () => {
  const role=await getRole();
  const curretAdminId=await getLoggedInUserId();
  const users=await getAllUsers()
  console.log(role)
  if(role!=='ADMIN') redirect('/')
  return (
    <div>
      <AdminUserList users={users} curretAdminId={curretAdminId} />
    </div>
  )
}

export default AdminUserPage