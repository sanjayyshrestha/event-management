

import { getLoggedInUser } from '@/actions/user'
import { Login } from '@/components/Login'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = async () => {
  const user=await getLoggedInUser()
  if(user) redirect('/')
  return (
  <div>

    <Login/>
  </div>
  
  )
}

export default LoginPage