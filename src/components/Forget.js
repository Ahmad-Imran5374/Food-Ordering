import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Forget() {
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const navigate=useNavigate()

    const submit=(e)=>{
        e.preventDefault()
        if(password.length!=8)
        {
            alert("enter good password")
        }
        if(email.length==0)
        {
            alert("enter your email")
        }
        axios.put('http://localhost:3001/update_password',{email,password})
        .then(result=>{
            console.log(result.data)
            alert("your password has been updated sucessfully")
            navigate('/signin')
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
        <h1 className='text-white ml-24 mb-10 font-serif text-2xl '>Enter your Credentials</h1> 
            <div className='mb-8 ml-3 mr-3'>
                <label htmlFor='email' className='block mb-2 text-white'>Email</label>
                <input type='email' id="email" placeholder='enter your email' className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500 ' onChange={(e)=>setemail(e.target.value)}></input>
            </div>
            <div className='mb-4 ml-3 mr-3'>
                <label htmlFor='password' className='block mb-2 text-white'>Password</label>
                <input type='password' id="password" placeholder='enter your password' className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500' onChange={(e)=>setpassword(e.target.value)}></input>
            </div>
            <button type='submit' className='bg-blue-500 text-white font-bold px-2 py-4 rounded flex items-center justify-center ml-32 w-40 ease-in-out hover:bg-blue-600 hover:text-gray-100'>Reset Password</button> 
        </div> 
    </form>
</div>
</div>
    </div>
  )
}
