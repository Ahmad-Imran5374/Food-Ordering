import axios from 'axios';
import React, { useState } from 'react';

export default function AddItemsAdmin() {
    const [item, setItem] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('item', item);
        formData.append('details', details);
        formData.append('price', price);
        formData.append('file', file);

        axios.post('http://localhost:3001/add_newitem', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result.data);
            alert('Your new item has been added successfully');
        })
        .catch(err => {
            console.log(err);
            alert('An error occurred while adding the item');
        });
    };

    return (
        <div>
            <div className='flex items-center justify-center h-screen bg-slate-400'>
                <div className='w-full max-w-md'>
                    <p className='text-center text-4xl'>Add your new items</p>
                    <form className="mt-4" onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="item" className='block mb-2 text-xl'>Item Name</label>
                            <input type='text' id="name" placeholder='Enter item name' className="w-full px-3 py-2 border rounded-md" onChange={(e) => setItem(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="item" className='block mb-2 text-xl'>Item Details</label>
                            <textarea rows='5' cols='20' id="details" placeholder="Enter item's detail" className="w-full px-3 py-2 border rounded-md" onChange={(e) => setDetails(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className='block mb-2 text-xl'>Item price</label>
                            <input type='number' id="price" placeholder='Enter item price' className="w-full px-3 py-2 border rounded-md" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className='block mb-2 text-2xl font-bold'>Upload image</label>
                            <input type="file" id="myFile" name="filename" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <button type='submit' className="w-60 ml-20 bg-blue-500 text-white font-bold py-2 px-4 rounded">Add item</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
