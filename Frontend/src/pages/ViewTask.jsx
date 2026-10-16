import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewTask = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const fetchTasks = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {withCredentials: true})

            setTasks(res.data.tasks)
        }
        fetchTasks()
    }, [])



    const deleteTask = async (id) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
            withCredentials: true,
            validateStatus: () => true
        })

        setTasks(tasks.filter((task) => task._id !== id))
    }



    const selectAll = (event) => {
        // console.log(event.target.checked)
        if (event.target.checked) {
            const items = tasks.map((item) => item._id)
            // console.log(items)
            setSelectedTask(items)
        }
        else {
            setSelectedTask([])
        }
    }



    const selectSingleTask = (id) => {
        if (selectedTask.includes(id)) {
            const items = selectedTask.filter((item) => item != id)
            setSelectedTask(items)
        }
        else {
            setSelectedTask([id, ...selectedTask])
        }
    }



    const deleteMultipleTask = async () => {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/multiple-tasks`, {
                data: selectedTask,
                withCredentials: true,
                validateStatus: () => true
            })

            setSelectedTask([]);
            
            setTasks(tasks.filter(task => !selectedTask.includes(task._id)))
        }
    
    return (
        <div className='h-[90vh] w-full p-5 bg-[#1e1e9e86]'>
            {tasks && tasks.length > 0 ? <>
            <h1 className='text-[25px] font-bold text-center text-[#1a1414db]'>Task Lists</h1>
            <ul className='flex items-center justify-center gap-3 mt-10'>
                <li className='h-15 w-25 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>
                    <input 
                        type="checkbox" 
                        className='h-4 w-4'
                        onChange={selectAll}
                        checked={tasks.length > 0 && selectedTask.length === tasks.length}
                    /></li>
                <li className='h-15 w-25 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>S.No</li>
                <li className='h-15 w-55 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>Title</li>
                <li className='h-15 w-155 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>Caption</li>
                <li className='h-15 w-70 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>Action</li>
            </ul>
            {tasks.map((task, index) => {
                return(
                    <ul key={index} className='flex items-center justify-center gap-3 mt-5'>
                        <li className='h-15 w-25 p-2 bg-[#1b133eb8] text-[#cbcbcb] flex items-center justify-center rounded-2xl text-[18.5px] font-semibold'>
                            <input 
                                type="checkbox"
                                onChange={() => selectSingleTask(task._id)}
                                checked={selectedTask.includes(task._id)}
                                className='h-4 w-4'
                            /></li>
                        <li 
                            className='h-15 w-25 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold'>{index+1}</li>
                        <li 
                            className='h-15 w-55 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold'>{task.title}</li>
                        <li 
                            className='h-15 w-155 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold'>{task.caption}</li>
                        <li
                            onClick={() => deleteTask(task._id)} 
                            className='h-15 w-34 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold cursor-pointer hover:bg-[#ae0014dc] hover:text-[#cbcbcb]'>Delete</li>
                            <li
                            onClick={() => navigate(`/update/${task._id}`)} 
                            className='h-15 w-34 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold cursor-pointer hover:bg-[#04b029bc] hover:text-[#cbcbcb]'>Update</li>
                    </ul>
                )
            })}
            {selectedTask.length > 0 && (
                <div className='flex items-center justify-center mt-15'>
                    <button
                        onClick={deleteMultipleTask}
                        className='h-15 w-55 p-2 bg-[#dadae7be] text-[#00005ac9] flex items-center justify-center rounded-2xl text-[18px] font-semibold cursor-pointer hover:bg-[#ae0014dc] hover:text-[#cbcbcb]'
                    >Delete All</button>
                </div>
            )}
            </> : <div className='h-[90vh] w-full flex items-center justify-center'><h1 className='text-xl font-bold text-[#000083a0]'>No Tasks</h1></div>}
        </div>
    )
}

export default ViewTask