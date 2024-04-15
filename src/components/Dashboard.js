import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBars, FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { useName } from '../NameContext';
export default function({ sidebartoggle, setsidebartoggle }) {
    let [items, setItems] = useState([])
    let [records, setrecords] = useState([])
    let {name,email,userid,adress,phone,cart,setcart,cartCount,setcartCount}=useName()

    useEffect(() => {
        axios.get('http://localhost:3001/get_items')
        .then(result => {
            console.log(result.data)
            setItems(result.data)
            setrecords(result.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    }, [])


    const Filter=(event)=>{
        setrecords(items.filter(f=>f.item.toLowerCase().includes(event.target.value)))
    }

    const Addto_Cart=(item)=>{
      const found=cart.find(element=>element.item==item.item)
      if (found!==undefined)
      {
        alert("you have already added this item in the cart! please see cart")
      }
      else
      {
      setcart((prevCart) => [...prevCart, item]);
      setcartCount(cartCount+1)
      console.log(cart,"cart")
      }

    }
    return (
        <div>
            
            <nav className='bg-gray-800 h-24 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars
          className='text-white me-4 cursor-pointer'
          onClick={() => setsidebartoggle(!sidebartoggle)}
        />
        <span className='text-white font-semibold'>Friend's Food Point</span>

      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65 mr-96'>
          <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch /></button>
          </span>
          <input type='text' className='w-full px-4 py-1 pl-12 rounded shadow outline-none' onChange={Filter} />
        </div>
        {/* <div className='text-white'><FaBell className='w-6 h-6' /></div> */}
        {/* <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-6 h-6 mt-1' />
            <div className='z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href="">Profile</a></li>
                <li><a href=''>Setting</a></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
            </div>
          </button>
        </div> */}
        <div className='flex'>
        <Link className='text-white' to={{ pathname: '/cart', state: { cartData: cart } }}>Go to Cart</Link>
        <TiShoppingCart className='text-white text-3xl'/>
          <p className='text-white w-6 h-6  text-center bg-red-400 rounded-full inline-block -ml-2'>{cartCount}</p>
        </div>
        <p className='text-white mr-9'>Hellow {name}</p>
      </div>
    </nav>

            <p className='text-center font-bold text-2xl mt-4'>Menu</p>
            <div className="grid grid-cols-3 gap-4 mt-24 bg-rose-100">
                {records.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 h-60">
                            <img src={require(`../images/${item.file}`)} alt={item.item} className="w-24 h-24 mx-auto" />
                            <div className="text-center">
                                <p className="text-lg font-semibold">{item.item}</p>
                                <p className="text-sm">Price: {item.price} {item.weight}</p>
                                <p className="text-sm">category: {item.category}</p>

                                <button className='bg-red-600 w-36 mt-4 rounded-2xl h-10 mb-8 text-white font-bold' onClick={()=>Addto_Cart(item)}>Add To Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
