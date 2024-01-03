import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import { url } from '../api';

const EditTask = () => {
      const [inputs,setInputs] = useState({
        title:  "",
        desc : "",
    });


    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(()=>{
        const fetchCurrentTask = async ()=>{
          try {
            const res = await axios.get(`${url}/api/task/${params.id}`)
            console.log(res)
            setInputs(res.data.task)
          } catch (error) {
            console.log(error)
          }
        }
        fetchCurrentTask()
    },[params.id])

    const handleEditTask = async (e) =>{
      e.preventDefault()
      setInputs({title: '', desc : ''})
      
      try {
          await axios.put(`${url}/api/task/${params.id}`,{
              title:inputs.title,
              desc: inputs.desc,
          })
          toast.success('Task updated successfully..')
          navigate('/')
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <div className='mt-20 max-w-xl mx-auto'>
    <form  onSubmit={handleEditTask}>
    <div className='flex flex-col'>
        <label htmlFor="name" className='text-base mb-2 text-gray-800'>Title</label>
        <input
          className="bg-gray-200 py-2 px-3 border-2 outline-none"  
          type="text" 
          placeholder="Enter title"
          value={inputs.title}
          onChange={(e)=>setInputs({...inputs, title:e.target.value})} />
    </div>
    <br />
    <div className='flex flex-col'>
        <label htmlFor="email" className='text-base mb-2 text-gray-800'>desc</label>
        <input
          className="bg-gray-200 py-2 px-3 border-2 outline-none"  
          type="text" 
          placeholder="Enter desc"
          value={inputs.desc}
          onChange={(e)=>setInputs({...inputs, desc:e.target.value})} />

    </div>
    <br />
    
    <button className='bg-blue-600 font-bold py-2 px-10 rounded-md text-white' type="submit">Submit</button>
    </form>
   </div>
  )
}

export default EditTask