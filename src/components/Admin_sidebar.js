import React, { useState } from 'react';
import { FaHome, FaCog, FaShoppingCart, FaPlus, FaHeart } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ sidebartoggle }) => {
  const [showOrdersOptions, setShowOrdersOptions] = useState(false);
  const [id1,set1]=useState(1)
  const [id2,set2]=useState(2)
  const [id3,set3]=useState(3)
  
  const toggleOrdersOptions = () => {
    setShowOrdersOptions(!showOrdersOptions);
  };

  return (
    <div className={`${sidebartoggle ? 'w-64' : 'hidden'} bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2 mb-4'>
        <h1 className='text-2xl text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <IoIosLogOut className='inline-block w-6 h-6 mr-2 -mt-2 ' />
            <Link to='/signin'>LogOut</Link>
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaHome className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/'>Home</Link>
          </a>
        </li>
        {/* Removed FaUserGroup */}
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <button onClick={toggleOrdersOptions}>
            <FaShoppingCart className='inline-block w-6 h-6 mr-2 -mt-2' />
            Orders
          </button>
          {showOrdersOptions && (
            <ul className='ml-6 mt-1'>
              <li>
                <Link to={`/admin_orders/${id1}`}>Daily Orders</Link>
              </li>
              <li>
                <Link to={`/admin_orders/${id2}`}>Weekly Orders</Link>
              </li>
              <li>
                <Link to={`/admin_orders/${id3}`}>Monthly Orders</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <AiOutlineAppstoreAdd className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/admin_items'>Products</Link>
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaPlus className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/add_newitem'>Add new item</Link>
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href=''>
            <FaCog className='inline-block w-6 h-6 mr-2 -mt-2' />
            <Link to='/settings'>Settings</Link>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;