import { getDataForOrganizerDashboard } from '@/actions/organizer.action'
import OrganizerDashboardOverview from '@/components/OrganizerDashboardOverview'
import React from 'react'

export type OrganizerDashboardInfo=Awaited<ReturnType <typeof getDataForOrganizerDashboard>>
const Home = async () => {
  
  const organizerDashboardInfo=await getDataForOrganizerDashboard()
  return (
    <div>
        <OrganizerDashboardOverview organizerDashboardInfo={organizerDashboardInfo}/>
    </div>
  )
}

export default Home