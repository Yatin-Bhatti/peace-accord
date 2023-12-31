import React,{useEffect, useState} from 'react'
import {Link,NavLink} from "react-router-dom"
import "../styles/NavbarStyles.css"
import {Union} from "../icons/Union"
import { connect, useSelector,useDispatch } from 'react-redux'
import { closeRegistrationFlow } from '../redux'

function Navbar({Login_email,login_password}) {
const[loginHeading,setLoginHeading]=useState("LOG IN");
const[clickable,setClickable]=useState(true)
const[burger_class,setBurgerClass]=useState("burger-bar unclicked");
const loginProcess=useSelector((state)=>state.loginProcess);
const dispatch=useDispatch();
useEffect(()=>{
if(loginProcess.user!==null){
  setLoginHeading(`${loginProcess.user}:0`)
  setClickable(false)
}
else if(loginProcess.user===null){
  setLoginHeading("LOG IN")
  setClickable(true)
}

},[loginProcess])

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
    const handleLogoClick=()=>{
      dispatch(closeRegistrationFlow())
      setBurgerClass("burger-bar unclicked")
      setMenuOpen(false)
    }
    
  return (
    <nav >
      <div className='iconAndBurger' >
    <Link to="/" onClick={handleLogoClick} className="logo" style={{display:"flex",flexDirection:"row"}}>
      <div className="icon">
      <Union/>
      </div>
      PEACE ACCORD</Link>
    <div className="contain">
    <div className="burger_menu" onClick={updateMenu}>
      <div className={burger_class} onClick={updateMenu}></div>
      <div className={burger_class} onClick={updateMenu}></div>
      <div className={burger_class} onClick={updateMenu}></div>
      </div>
    </div>
    </div>
    
        <ul className={menuOpen?"open":""}>
        <li onClick={updateMenu} >
          <NavLink to="/review">REVIEW</NavLink>
        </li>
        <li onClick={updateMenu} >
          <NavLink to="/list">LIST</NavLink>
        </li>
        <li onClick={updateMenu} >
          <NavLink to="/sign">SIGN</NavLink>
        </li>
        <li onClick={updateMenu} >
          <NavLink to="/data">DATA</NavLink>
        </li>
        <li onClick={updateMenu} >
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        {clickable?<li  onClick={updateMenu}>
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