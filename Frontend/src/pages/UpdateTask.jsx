import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTask = () => {

    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
                withCredentials: true,
                validateStatus: () => true
            })
            setTitle(res.data.task.title)
            setCaption(res.data.task.caption)
        }
        fetchTask()
    }, [id])
    

    const handleSubmit = async (elem) => {
        elem.preventDefault()

        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-tasks/${id}`, {title, caption}, {
            withCredentials: true,
            validateStatus: () => true
        })

        navigate('/')
    }


    return (
        <div className='h-screen w-full flex items-center justify-center bg-[#1e1e9e86]'>
            <div className='h-auto w-100 flex flex-col items-center justify-center bg-[#dadae7be] p-7 rounded-2xl'>
                <h1 className='text-[27px] font-bold text-center mb-8 text-[#000057c7]'>Update Task</h1>
                <form onSubmit={handleSubmit} action="">
                    <div className='h-auto w-75'>
                        <h1 className='text-[17px] font-semibold p-1  text-[#000057c7]'>Title</h1>
                        <input 
                        className='w-75 bg-[#19199d15] p-2 pl-3 mb-5 border-none outline-none rounded-xl'
                        type="text" 
                        name='title'
                        placeholder='Add Title'
                        value={title}
                        onChange={(elem) => setTitle(elem.target.value)}
                    />
                    <h1  className='text-[17px] font-semibold pl-1  text-[#000057c7]'>Caption</h1>
                    <textarea 
                        className='w-75 bg-[#19199d15] mb-8 p-2 pl-3 border-none outline-none rounded-xl scrollbar-none'
                        name="caption" 
                        id="" 
                        placeholder='Add Caption'
                        value={caption}
                        onChange={(elem) => setCaption(elem.target.value)}
                    ></textarea>
                    </div>
                    <div className='text-center'>
                        <button 
                            type='submit' 
                            className='text-[17px] px-10 py-2 bg-[#000057c7] text-white mb-3 rounded-3xl transition-transform duration-300 hover:scale-107'>
                        Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateTask