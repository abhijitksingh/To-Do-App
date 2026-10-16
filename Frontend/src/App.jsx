import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import ViewTask from './pages/ViewTask'
import CreateTask from './pages/CreateTask'
import UpdateTask from './pages/UpdateTask'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Protected from './pages/Protected'

const App = () => {
  return (
    <div className=''>
      <NavBar />
      <Routes>
        <Route path='/add' element={<Protected><CreateTask /></Protected>} />
        <Route path='/' element={<Protected><ViewTask /></Protected>} />
        <Route path='/update/:id' element={<UpdateTask />} />
        <Route path='/signup' element= {<SignUp />} />
        <Route path='/login' element= {<Login />} />
      </Routes>
    </div>
  )
}

export default App