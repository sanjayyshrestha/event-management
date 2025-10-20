
import { getDataForAdminDashboard } from '@/actions/admin.action';
import { getRole } from '@/actions/user'
import AdminDashboardOverview from '@/components/AdminDashboardOverview';
import OrganizerDashboardOverview from '@/components/OrganizerDashboardOverview';
import { Role } from '@/types/status';
import React from 'react'

export type AdminDashboardInfo =Awaited<ReturnType<typeof getDataForAdminDashboard>>
const OverviewPage = async () => {
  const role:Role=await getRole();
  const adminDashboardInfo =await getDataForAdminDashboard()
  return (
    <div>
    <AdminDashboardOverview adminDashboardInfo={adminDashboardInfo }/>
    </div>
  )
}

export default OverviewPage