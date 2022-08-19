import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Signup from '../pages/signup'
// import RequireAuth from './requireAuth'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/dashboard' element={
            //<RequireAuth>
              <Dashboard />
            //</RequireAuth>
        }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router