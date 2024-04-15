import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBars, FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { useName } from '../NameContext';
export default function({ sidebartoggle, setsidebartoggle }) {
  const {name,setname}=useName()
    return (
        <div>
            <nav className='bg-gray-800 h-24 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars
          className='text-white me-4 cursor-pointer'
          onClick={() => setsidebartoggle(!sidebartoggle)}
        />
        <span className='text-white font-semibold'>Friend's Food Point Admin</span>

      </div>
      <div className='flex items-center gap-x-5'>
        <p className='text-white mr-9'>Hellow {name}</p>
      </div>
    </nav>
     <p className='text-center font-bold text-2xl mt-4'>Menu</p>
        </div>
    )
}
