import React from 'react'
import { useName } from '../NameContext'
import { Link } from 'react-router-dom'
export default function Settings() {
    const{name,setname}=useName()
  return (
    <div>
      <p>sttings</p>
      <Link to='/update_profile'>update profile</Link>
    </div>
  )
}
