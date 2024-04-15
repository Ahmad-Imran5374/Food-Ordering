// Sign.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useName } from '../NameContext';

export default function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setName, setEmail: setContextEmail, setUserId,setadress,setphone } = useName();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signin', { email, password });
      const userData = response.data;
      if (userData!=="not found") {
        //alert(userData)
        setName(userData.name);
        setContextEmail(userData.email);
        setUserId(userData._id);
        setadress(userData.adress)
        setphone(userData.phone)
        navigate('/dashboard');
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-slate-400'>
      <div className='bg-slate-900 w-auto rounded-xl'>
        <form className='h-[450px] items-center justify-center mt-24' onSubmit={handleSubmit}>
          <div className='w-full max-w-d'>
            <h1 className='text-white ml-28 mb-10 font-serif text-2xl'>Login your account</h1>
            <div className='mb-8 ml-3 mr-3'>
              <label htmlFor='email' className='block mb-2 text-white'>
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter your email'
                className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4 ml-3 mr-3'>
              <label htmlFor='password' className='block mb-2 text-white'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Enter your password'
                className='w-96 px-3 py-4 border rounded-md hover:bg-slate-500'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white font-bold px-2 py-4 rounded flex items-center justify-center ml-32 w-40 ease-in-out hover:bg-blue-600 hover:text-gray-100'
            >
              Login
            </button>
            <p className='text-white ml-6 mt-3 text-sm'>
              Do you already have an account? <Link to='/create_account' className='text-blue-600'>Create account</Link>
            </p>
            <p className='ml-28 text-blue-500'>
              <Link to='/forget_password'>Forgot Password?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

