import React, { useState, useEffect } from 'react';
import { useName } from '../NameContext';
import axios from 'axios';

export default function Update_profile() {
    const { userId, setUserId } = useName();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState(' ');
    const [old_password, setOldPassword] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/profile/' + userId)
            .then(result => {
                const userData = result.data;
                setName(result.data.name);
                setEmail(result.data.email);
                setPhone(result.data.phone);
                setAddress(result.data.adress);
                setOldPassword(result.data.password);
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);

    const update_profile = (name, email, address, phone, password) => {
        axios.put('http://localhost:3001/update_profile/' + userId, { name, email, address, phone, password })
            .then(result => {
                console.log(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateUser = (e) => {
        e.preventDefault();

        if (password.trim() === '') {
            if (window.confirm('Are you sure you want to update without changing the password?')) {
                update_profile(name, email, address, phone, old_password);
            }
        } else if (password.length !== 8) {
            alert("Please write an 8-digit password");
        } else {
            if (window.confirm('Are you sure you want to update with a new password?')) {
                update_profile(name, email, address, phone, password);
            }
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Update your profile</h1>
            <form onSubmit={updateUser}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
                    <input type='text' id="name" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border rounded-md' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <input type='email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border rounded-md' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                    <input type='number' id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full px-3 py-2 border rounded-md' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="address">Address:</label>
                    <input type='text' id="address" value={address} onChange={(e) => setAddress(e.target.value)} className='w-full px-3 py-2 border rounded-md' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input type='password' id="password" onChange={(e) => setPassword(e.target.value)} placeholder='Write 8 digit password for update' className='w-full px-3 py-2 border rounded-md' />
                </div>
                <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
            </form>
        </div>
    );
}
