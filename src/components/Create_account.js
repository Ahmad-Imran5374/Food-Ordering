import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Create_account() {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [phone,setphone]=useState("")
    const [adress,setadress]=useState("")
    const [gender,setgender]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()

    const submit=(e)=>{
        e.preventDefault()
        let g=document.getElementById("gender").value
        //console.log(g)
        setgender(g)
        console.log(name,phone,email,adress,g,password)
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (phone.length!=11){
            alert("enter valid phone number")
        }
        else if(!emailPattern.test(email))
        {
            alert("enter valid email adress")
        }
        else if(password.length!=8)
        {
            alert("your password must contain only 8 letters")
        }
        else 
        {
        axios.post("http://localhost:3001/create_account",{name,email,phone,adress,g,password})
        .then(result=>{
            if (result.data=="error")
            {
                console.log(result)
                alert("you have already account")
            }
            else
            {
                navigate('/signin')
                console.log(result)
            }
        })
        .catch(err=>{
            console.log(err)
        })
     }
    }
  return (
    <div>
        <div class='flex justify-center items-center h-screen bg-neutral-200'>
    <div class="w-full max-w-md">
        <h1 class="text-center text-4xl">Create your account</h1>
        <form class="mt-4" onSubmit={submit}>
            <div class="mb-4">
                <label for="name" class="block mb-2">Name</label>
                <input type='text' id="name" placeholder='Enter complete name' class="w-full px-3 py-2 border rounded-md" onChange={(e)=>setname(e.target.value)}></input>
            </div>
            <div class="mb-4">
                <label for="email" class="block mb-2">Email</label>
                <input type='email' id="email" placeholder='Enter valid email' class="w-full px-3 py-2 border rounded-md" onChange={(e)=>setemail(e.target.value)}></input>
            </div>
            <div class="mb-4">
                <label for="passwoord" class="block mb-2">Password</label>
                <input type='password' id="password" placeholder='Enter 8 digit password' class="w-full px-3 py-2 border rounded-md" onChange={(e)=>setpassword(e.target.value)}></input>
            </div>
            <div class="mb-4">
                <label for="phone" class="block mb-2">Phone</label>
                <input type='type' id="phone" placeholder='Enter your phone number' class="w-full px-3 py-2 border rounded-md" onChange={(e)=>setphone(e.target.value)}></input>
            </div>
            <div class="mb-4">
                <label for="address" class="block mb-2">Current Address</label>
                <input type='text' id="address" placeholder='Enter your address' class="w-full px-3 py-2 border rounded-md" onChange={(e)=>setadress(e.target.value)}></input>
            </div>
            <div class="mb-4"> 
                <label for="gender" class="block mb-2">Choose Gender:</label>
                <select name="gender" id="gender" class="w-full px-3 py-2 border rounded-md ">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button type='submit' class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
    </div>
</div>
    </div>
  )
}

