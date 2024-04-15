import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function() {
    let [items,setitems]=useState([])
    let [search,setsearch]=useState()
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

    const submit=(e)=>{
        e.preventDefault()
        let filter_items=items.filter(item=>{
            const searcht=search.toLowerCase()
            const itemt=item.item.toLowerCase()
            return searcht==itemt
        })
        console.log(filter_items)
        setitems(filter_items)
    }
  return (
    <div>
        <form onSubmit={submit}>
            <input type='search' placeholder='search items here' className='bg-red w-64 ml-96 border-solid border-2 border-indigo-600' onChange={(e)=>setsearch(e.target.value)}></input>
            <button type='submit' className='bg-blue-300'>search</button>
        </form>
        <p className='text-center font-bold text-2xl mt-4'>Manue</p>
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
