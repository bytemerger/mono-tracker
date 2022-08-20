import React, { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEY_FOR_TOKEN } from '../libs/Constants'
import { AppContext } from '../store'

interface props{
  children: React.ReactNode
}
function RequireAuth ({ children }: props) {
  const {state, dispatch} = useContext(AppContext)
  let token = state.user.token
  const [error, setError] = useState<string>()
  const navigate = useNavigate()

  if (!token) {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_FOR_TOKEN)) {
      token = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_TOKEN)!
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