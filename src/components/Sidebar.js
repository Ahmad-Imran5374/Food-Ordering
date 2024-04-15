import React from 'react';
import { FaHome, FaCog, FaPoll, FaRegEnvelope, FaRegFileAlt } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebartoggle }) => {
  return (
    <div className={`${sidebartoggle ? "w-64" : "hidden"} bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2 mb-4'> 
        <h1 className='text-2xl text-white font-bold'>Customer Dashboard</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>

      <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <IoIosLogOut className='inline-block w-6 h-6 mr-2 -mt-2 ' />
            <Link to='/signin'>LogOut </Link> 
          </a>
        </li>


        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaHome className='inline-block w-6 h-6 mr-2 -mt-2' />
            Home
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaRegFileAlt className='inline-block w-6 h-6 mr-2 -mt-2' />
            Blogs
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaRegEnvelope className='inline-block w-6 h-6 mr-2 -mt-2' />
            Inbox
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaPoll className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/reports'>Reports </Link> 
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaCog className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/settings'> Settings</Link> 
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
