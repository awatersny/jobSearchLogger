import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <ul id='nav'>
      <li><h1>Job Search Logger</h1></li>
      <li><Link className='link' to="/jobs">Previous Applications</Link></li>
      <li><Link className='link' to="/companies">Companies You've Applied To</Link></li>
      <li><Link className='link' to="/jobs/new">Log New Application</Link></li>
      <li><Link className='link' to="/login">Login</Link></li>
      <li><Link className='link' to="/register">Register</Link></li>
    </ul>
  )
}

