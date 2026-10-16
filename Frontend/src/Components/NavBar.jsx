import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate()

    const isUserLoggedIn = localStorage.getItem("login") || localStorage.getItem("signup")

    const handleLogout = async () => {

        const res = await axios.post('http://localhost:3000/logout', {}, {withCredentials: true})

        // console.log(res)

        if (res.status === 200) {

            localStorage.removeItem("login")
            localStorage.removeItem("signup")

            // localStorage.clear()

            alert('Logout Successfully')

            navigate('/login')
        }

    }

    return (
        <nav>
            <div className='flex justify-between p-5 px-13 bg-[#0d0d8394] text-[#1a1414db]'>
                <h1 className='text-2xl font-bold'>To Do App</h1>
                {isUserLoggedIn ? (
                    <ul className='flex gap-10'>
                    <li className='hover:text-gray-800 font-semibold'><Link to="/">List</Link></li>
                    <li className='hover:text-gray-800 font-semibold'><Link to="/add">Add Task</Link></li>
                    <li className='hover:text-gray-800 font-semibold'><button onClick={handleLogout}>Logout</button></li>
                </ul>
                ):(
                    <ul className='flex gap-10'>
                        <li className='hover:text-gray-800 font-semibold'><Link to="/login">Login</Link></li>
                        <li className='hover:text-gray-800 font-semibold'><Link to="/signup">Signup</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default NavBar