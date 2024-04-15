import React from 'react'
import { useName } from '../NameContext'

export default function Success() {
  const {name,setname}=useName()
  return (
    <div>
      <h1>Dear {name} Your  order has been sucessfully confirmed</h1>
    </div>
  )
}
