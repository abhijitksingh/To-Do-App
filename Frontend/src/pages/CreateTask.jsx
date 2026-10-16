import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateTask = () => {

    const navigate = useNavigate()

    const handleSubmit = (elem) => {
        elem.preventDefault()

        const formData = new FormData(elem.target)

        const createData = async () => {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-tasks`, formData, {withCredentials: true})

            // console.log(res)
            
            if (res.status === 201) {
                alert('Successfully Add Task!')
                
                navigate('/')
            }
            else {
                alert('Post Not Successfully')
            }
        }
        createData()
    }
    
    return (
        <div className='h-screen w-full flex items-center justify-center bg-[#1e1e9e86]'>
            <div className='h-auto w-100 flex flex-col items-center justify-center bg-[#dadae7be] p-7 rounded-2xl'>
                <h1 className='text-[27px] font-bold text-center mb-8 text-[#000057c7]'>Create Task</h1>
                <form onSubmit={handleSubmit} action="">
                    <div className='h-auto w-75'>
                        <h1 className='text-[17px] font-semibold p-1  text-[#000057c7]'>Title</h1>
                        <input 
                        className='w-75 bg-[#19199d15] p-2 pl-3 mb-5 border-none outline-none rounded-xl'
                        type="text" 
                        name='title'
                        placeholder='Add Title' 
                    />
                    <h1  className='text-[17px] font-semibold pl-1  text-[#000057c7]'>Caption</h1>
                    <textarea 
                        className='w-75 bg-[#19199d15] mb-8 p-2 pl-3 border-none outline-none rounded-xl'
                        name="caption" 
                        id="" 
                        placeholder='Add Caption'
                    ></textarea>
                    </div>
                    <div className='text-center'>
                        <button 
                            type='submit' 
                            className='text-[17px] px-10 py-2 bg-[#000057c7] text-white mb-3 rounded-3xl transition-transform duration-300 hover:scale-107'>
                        Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask