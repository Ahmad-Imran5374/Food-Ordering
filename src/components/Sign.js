import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sign() {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
const submit=(e)=>{
    e.preventDefault()
    console.log(password,email,"signin page")
    axios.post('http://localhost:3001/signin',{email,password})
    .then(result=>{
        //alert(result.data)
        if(result.data=="found")
        {
            navigate('/dashboard')
        }
        else{
            alert("invalid login credentilas ")
        }
        console.log(result.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

  return (
    <div>
        <div className='h-screen flex items-center justify-center  bg-slate-400'>
        <div className=' bg-slate-900 w-auto  rounded-xl'> 
    <form className=' h-[450px] items-center justify-center mt-24 ' onSubmit={submit}> 
        <div className='w-full max-w-d '> 
        <h1 className='text-white ml-28 mb-10 font-serif text-2xl '>Login your account</h1> 
            <div className='mb-8 ml-3 mr-3'>
                <label htmlFor='email' className='block mb-2 text-white'>Email</label>
                <input type='email' id="email" placeholder='enter your email' className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500 ' onChange={(e)=>setemail(e.target.value)}></input>
            </div>
            <div className='mb-4 ml-3 mr-3'>
                <label htmlFor='password' className='block mb-2 text-white'>Password</label>
                <input type='password' id="password" placeholder='enter your password' className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500' onChange={(e)=>setpassword(e.target.value)}></input>
            </div>
            <button type='submit' className='bg-blue-500 text-white font-bold px-2 py-4 rounded flex items-center justify-center ml-32 w-40 ease-in-out hover:bg-blue-600 hover:text-gray-100'>Login</button>
            <p className='text-white ml-6 mt-3 text-sm'>Do you have already account? <Link to='/create_account' className='text-blue-600'>Create account</Link>  </p> 
        </div> 
    </form>
</div>
</div>
    </div>
  )
}
