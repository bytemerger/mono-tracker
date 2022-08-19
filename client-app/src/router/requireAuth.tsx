import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN } from '../types/constants'
import { useAppSelector } from '../types/hook.type'

interface props{
  children: React.ReactNode
}
function RequireAuth ({ children }: props) {
  let token = useAppSelector((state) => state.user.token)
  const [error, setError] = useState<string>()
  const navigate = useNavigate()

  if (!token) {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
      token = localStorage.getItem(LOCAL_STORAGE_TOKEN)!
    }
  }
  if (!token) {
    setTimeout(() => {
      setError('error')
    }, 2000)
    return <div className='text-white/70'>Please login!!!! you will be redirected to login....{error && <Navigate to='/' />}</div>
  }
  return (
    <>
      {children}
    </>
  )
}
export default RequireAuth