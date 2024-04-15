// NameContext.js
import React, { createContext, useContext, useState } from 'react';

const NameContext = createContext();

export function NameProvider({ children }) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [userId, setUserId] = useState('');
  let [adress,setadress]=useState()
  let [phone,setphone]=useState()
  let [cart,setcart]=useState([])
  let [cartCount,setcartCount]=useState(0)
  return (
    <NameContext.Provider
      value={{name,setName,email,setEmail,userId,setUserId,adress,setadress,phone,setphone,cart,setcart,
      cartCount,
      setcartCount}}>
      {children}
    </NameContext.Provider>
  );
}

export function useName() {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useName must be used within a NameProvider');
  }
  return context;
}
