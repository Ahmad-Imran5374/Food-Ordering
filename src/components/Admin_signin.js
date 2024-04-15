import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export default function Admin_signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const Submit_form = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signin', { email, password })
            .then(result => {
                if (result.data !== "not found") {
                    if (result.data.role === "admin") {
                        navigate('/admin_dashboard')
                    } else {
                        alert("Only admin can access");
                    }
                } else {
                    alert("Invalid login credentials");
                }
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Admin Sign In</h2>
                <form onSubmit={Submit_form}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password:</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                </form>
            </div>
        </div>
    );
}
