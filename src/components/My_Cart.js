import React, { useEffect, useState } from 'react'
import { useName } from '../NameContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
export default function My_Cart() {
  let { cart,setcart ,cartCount,setcartCount} = useName()
  let [total,settotal]=useState(0)
  let [confirm,setconfirm]=useState('false')
  let {name,email,phone}=useName()
  const message="your order has been confirmed sucessfully . Thank you for providing us oppoutunity to serve you enjoy your meal"
  const subject="Order sucessfull"


  const navigate=useNavigate()
  useEffect(() => {
    console.log("cart page")
    console.log(cart)
    let sum=0
    cart.forEach(element => {
      sum+=element.quantity*element.price
    });
    setconfirm(true)
    settotal(sum)
  }, [cart])


   const confirm_order=(total1)=>{
    console.log(cart)
    const itemsName=[]
    cart.map(item=>{
      itemsName.push({item:item.item,quantity:item.quantity})
    })
    console.log("items array details")
    console.log(itemsName)
    axios.post('http://localhost:3001/add_orders',{name,email,phone,total1,itemsName})
    .then(result=>{
      if(result!=="error")
      {
        total=0
        console.log(result)
        alert("your order has been confirmed suceesfully")
        axios.post('http://localhost:3001/sendEmail',{email,subject,message})
        .then(result=>{
          console.log("email sent suceffuly")
        })
        .catch(err=>{
          console.log(err)
        })

        setcart([])
        settotal(0)
        setcartCount(0)
        navigate('/success')
      }
    })
    .catch(err=>{
      alert("error")
    })
   }

  const quantity_fun = (index, action) => {
    let updatedCart = [...cart];
    if (action === "dec" && updatedCart[index].quantity > 1 ) {
      updatedCart[index].quantity--;
    } else if (action === "inc" && updatedCart[index].quantity<10) {
      updatedCart[index].quantity++;
    }
    setcart(updatedCart);
  }
  
  // removing item from cart

  const remove_item=(index)=>{
    let updatedCart=[...cart]
    updatedCart.splice(index,1)
    setcart(updatedCart)
    let a=cartCount
    a--
    setcartCount(a)
    //alert(cartCount)
  }
  // showing total bill
  return (
    <div>
      {cart && cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="flex items-center w-full my-2">
            <img src={require(`../images/${item.file}`)} alt={item.item} className="w-24 h-24 mr-4" />
            <div>
              <p className="text-lg font-semibold">{item.item}</p>
              <p className="text-sm">Price: {item.price} {item.weight}</p>
              <p className="text-sm">Category: {item.category}</p>
              <RiDeleteBin6Line  className='ml-36 text-2xl' onClick={()=>remove_item(index)}/>
              <button className='w-7 bg-red-700 text-white font-bold text-2xl' onClick={()=>quantity_fun(index,"dec")} >-</button>
              <p className='inline-block'>quantity: {item.quantity}</p>
              <button className='w-7 bg-gray-700 text-white font-bold text-2xl' onClick={()=>quantity_fun(index,"inc")} >+</button>
            </div>
           
          </div>
        ))
      ) : (
        <h1>Your cart is empty</h1>
      )}
      <p>Total {total} Rs</p>
      <button className='bg-blue-500' onClick={()=>confirm_order(total)}>confirm order</button>
    </div>
  )
}
