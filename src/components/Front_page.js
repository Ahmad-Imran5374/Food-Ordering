import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Front_page() {
    const [items,setitems]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get_items')
        .then(result=>{
            console.log(result.data)
            setitems(result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div>
        <div className='flex justify-around bg-slate-400 h-20'>
            <div> 
            <p className='mt-5 font-bold text-lg'>Friend's food</p>
            </div>
            <div> 
            <button className='px-5 bg-red-500 mt-2 rounded-lg  text-white py-4' > <Link to='/signin'>login</Link></button>
            <button className='ml-5 bg-red-500 px-5 rounded-lg text-white py-4'> <Link to='/create_account'>signup </Link></button>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-24 bg-rose-100">
    {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 h-48">
            <img src={require(`../images/${item.file}`)} className="w-24 h-24 mx-auto"></img>
            <div className="text-center">
                <p className="text-lg font-semibold">{item.item}</p>
                <p className="text-sm">Price: {item.price}</p>
            </div>
        </div>
    ))}
</div>

    </div>
  )
}
