import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout(props) {
    const nav = useNavigate();
  return (
    <div>
      <button onClick={()=>{localStorage.removeItem("user");props.setLogin(false)}}>Logout</button>

    </div>
  )
}
