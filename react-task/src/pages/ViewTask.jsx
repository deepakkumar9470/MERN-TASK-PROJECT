import React,{useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../api';



const ViewTask = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [data,setData] = useState({})

    useEffect(()=>{
        const fetchSingleTask = async ()=>{
          try {
            const res = await axios.get(`${url}/api/task/${params.id}`)
            setData(res.data.task)
          } catch (error) {
            console.log(error)
          }
        }
        fetchSingleTask()
    },[params.id])
  return (
    <div className="flex items-center justify-center">
        <div className="bg-gray-200 w-[400px] h-[300px] shadow-md p-3 gap-2 flex items-center justify-center flex-col mt-20">
        <h1 className='text-2xl font-bold text-gray-700'>{data.title}</h1>
        <p className='text-xl font-bold text-gray-500'>{data.desc}</p>
        <Link className='mt-10 text-base font-semibold' to="/">Go Back</Link>
        </div>
    </div>
  )
}

export default ViewTask