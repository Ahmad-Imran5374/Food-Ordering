import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
export default function UpdateItems() {
  const { id: initialId, name: initialName, price: initialPrice, details: initialDetails, file: initialFile } = useParams();

  // Initialize state with initial values from URL parameters
  const [item, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [details, setDetails] = useState(initialDetails);
  const [file, setFile] = useState(initialFile);
  const [id, setId] = useState(initialId);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(window.confirm("are you sure to update item"))
    {
    axios.put('http://localhost:3001/update_items/'+id,{item,details,price,file})
    .then(result=>{
      alert("you item  has been updated sucessfully")
    }).catch(err=>{
      alert("error while updating")
    })
  }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Item Details</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input id="name" type='text' value={item} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
          <input id="price" type='number' value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Details:</label>
          <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type='submit' className='w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Submit</button>
      </form>
    </div>
  );
}
