import React,{useEffect, useState} from 'react'
import {Link,NavLink} from "react-router-dom"
import "../styles/NavbarStyles.css"
import {Union} from "../icons/Union"
import { connect } from 'react-redux'
function Navbar({Login_email,login_password}) {
const[loginHeading,setLoginHeading]=useState("LOG IN");
const[clickable,setClickable]=useState(true)
const[burger_class,setBurgerClass]=useState("burger-bar unclicked");
useEffect(()=>{
if(login_password!==""&&Login_email!==""){
  setLoginHeading("Yatin : 3")
  setClickable(false)
}
},[login_password,Login_email])

    const[menuOpen,setMenuOpen]=useState(false)

    const updateMenu=()=>{
      if(!menuOpen){
        setBurgerClass("burger-bar clicked");
      }
      else{
        setBurgerClass("burger-bar unclicked");
      }
      setMenuOpen(!menuOpen)
    }
  return (
    <nav >
      {/* <div style={{display:"flex",flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}> */}
      <div className='iconAndBurger' >
    <Link to="/" onClick={()=>setMenuOpen(false)} className="logo" style={{display:"flex",flexDirection:"row"}}>
      <div className="icon">
      <Union/>
      </div>
      PEACE ACCORD</Link>
    {/* <div className="menu" onClick={()=>setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
    </div> */}
    <div className="contain">
    <div className="burger_menu" onClick={updateMenu}>
      <div className={burger_class} onClick={updateMenu}></div>
      <div className={burger_class} onClick={updateMenu}></div>
      <div className={burger_class} onClick={updateMenu}></div>
      </div>
    </div>
    </div>

        <ul className={menuOpen?"open":""}>
        <li onClick={()=>setMenuOpen(!menuOpen)} >
          <NavLink to="/review">REVIEW</NavLink>
        </li>
        <li onClick={()=>setMenuOpen(!menuOpen)} >
          <NavLink to="/list">LIST</NavLink>
        </li>
        <li onClick={()=>setMenuOpen(!menuOpen)} >
          <NavLink to="/sign">SIGN</NavLink>
        </li>
        <li onClick={()=>setMenuOpen(!menuOpen)} >
          <NavLink to="/data">DATA</NavLink>
        </li>
        <li onClick={()=>setMenuOpen(!menuOpen)} >
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        {clickable?<li  onClick={()=>setMenuOpen(!menuOpen)}>
            <NavLink to="/login">{loginHeading}</NavLink>
        </li>:<li>
            <NavLink>{loginHeading}</NavLink>
        </li>}
      </ul>
    </nav>
  )
}
const mapStateToProps=state=>{
  return {
    Login_email:state.login.Login_email,
    login_password:state.login_password
  }
}

export default connect(mapStateToProps,null) (Navbar)