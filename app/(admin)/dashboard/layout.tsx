import Sidebar from '@/components/Sidebar'
import React from 'react'

const DashBoardLayout = ({children}:{
  children:React.ReactNode
}) => {
  return (
    <div>
      <Sidebar/>
      <main>{children}</main>
    </div>
  )
}

export default DashBoardLayout