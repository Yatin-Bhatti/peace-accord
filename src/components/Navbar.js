import React,{useState} from 'react'
import {Link,NavLink} from "react-router-dom"
import "../styles/NavbarStyles.css"
function Navbar() {
    const[menuOpen,setMenuOpen]=useState(false)
  return (
    <nav >
    <Link to="/review" className="logo">PEACE ACCORD</Link>
    <div className="menu" onClick={()=>setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
    </div>
        <ul className={menuOpen?"open":""}>
        <li>
          <NavLink to="/review">Review</NavLink>
        </li>
        <li >
          <NavLink to="/list">LIST</NavLink>
        </li>
        <li >
          <NavLink to="/sign">SIGN</NavLink>
        </li>
        <li >
          <NavLink to="/demographics">DEMOGRAPHICS</NavLink>
        </li>
        <li >
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
            <NavLink to="/login">LOG IN</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar