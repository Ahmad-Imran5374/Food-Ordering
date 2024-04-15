import React from 'react'
import { Link } from 'react-router-dom'

export default function NOT_found() {
  return (
    <div>
      <h1 className='decoration-red-500 text-center'>404 ERROR PAGE NOT FOUND</h1>
      <Link to='/'>Back</Link>
    </div>
  )
}
