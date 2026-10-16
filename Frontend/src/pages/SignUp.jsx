import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

        useEffect(() => {

            if (localStorage.getItem("signup")) {
                navigate("/")
            }

        }, [navigate])

    const handleSignUp = async (elem) => {

        elem.preventDefault()

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, userData, {
            withCredentials: true,
            validateStatus: () => true
        })
        console.log(res)
        
        if (res.status === 201) {
            // alert('Successfully Signup')
            localStorage.setItem("signup", JSON.stringify({username: userData.username, email: userData.email}))

            navigate("/")
        }
        else if (res.status === 409) {
            alert('User Already Exist Please Login !')

            navigate("/login")
        }
        else {
            alert('Please Enter All Details')
        }
    }

    return (
        <div className='h-screen w-full flex items-center justify-center bg-[#1e1e9e86]'>
            <div className='h-auto w-100 flex flex-col items-center justify-center bg-[#dadae7be] p-7 rounded-2xl'>
                <h1 className='text-[27px] font-bold text-center mb-5 text-[#000057c7]'>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className='h-auto w-75'>
                        <h1 className='text-[17px] font-semibold p-1  text-[#000057c7]'>Username</h1>
                        <input 
                            className='h-12 w-75 bg-[#19199d15] p-2 pl-3 mb-3 border-none outline-none rounded-xl'
                            type="text" 
                            name='username'
                            placeholder='Enter Full Name'
                            value={userData.username}
                            onChange={(elem) => setUserData({...userData, username: elem.target.value})}
                        />
                        <h1  className='text-[17px] font-semibold pl-1  text-[#000057c7]'>Email</h1>
                        <input 
                            className='h-12 w-75 bg-[#19199d15] p-2 pl-3 mb-3 border-none outline-none rounded-xl'
                            type="text" 
                            name='email'
                            placeholder='Enter Email'
                            value={userData.email}
                            onChange={(elem) => setUserData({...userData, email: elem.target.value})}
                        />
                        <h1  className='text-[17px] font-semibold pl-1  text-[#000057c7]'>Password</h1>
                        <input 
                            className='h-12 w-75 bg-[#19199d15] p-2 pl-3 mb-7 border-none outline-none rounded-xl'
                            type="text" 
                            name='password'
                            placeholder='Enter Password'
                            value={userData.password}
                            onChange={(elem) => setUserData({...userData, password: elem.target.value})}
                        />
                    </div>
                    <div className='text-center'>
                        <button 
                            type='submit' 
                            className='text-[17px] px-31 py-2 bg-[#000057c7] text-white mb-3 rounded-2xl transition-transform duration-300 hover:scale-107'>
                        SignUp</button>
                    </div>
                </form>
                <div className='h-auto w-75'>
                    <p className='text-[#000057c7] font-semibold pl-1'><Link to={"/login"}>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp