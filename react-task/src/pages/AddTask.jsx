import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {url} from '../api'

const AddTask = () => {
    const [inputs,setInputs] = useState({
        title:  "",
        desc : "",
    });
   
    const navigate = useNavigate()
    
    const handleAddTask = async (e) =>{
        e.preventDefault()
        setInputs({title: '', desc : ''})
        
        try {
               await axios.post(`${url}/api/task/create`,{
                title:inputs.title,
                desc: inputs.desc,
            })
            toast.success('Task added successfully..')          
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

 
 
  return (
   <div className='mt-20 max-w-xl mx-auto'>
    <form  onSubmit={handleAddTask}>
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
        <label htmlFor="email" className='text-base mb-2 text-gray-800'>Description</label>
        <input
          className="bg-gray-200 py-2 px-3 border-2 outline-none"  
          type="text" 
          placeholder="Enter description"
          value={inputs.desc}
          onChange={(e)=>setInputs({...inputs, desc:e.target.value})} />

    </div>
  
    <br />
     
    <button className='bg-blue-600 font-bold py-2 px-10 rounded-md text-white' type="submit">Submit</button>
    </form>
   </div>
  )
}

export default AddTask