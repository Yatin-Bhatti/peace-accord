import React,{useRef,useEffect} from 'react'
import "../styles/ForgotPasswordNotice.css"
import { useNavigate } from 'react-router'
import { Transition } from "react-transition-group";


function ForgotPasswordNotice() {
  




    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/login")
    }
   
  return (
    <div className="noticeBody">
        <div className="noticeCont">
       
        <p className="noticestyle" > 
        Check your email for a link to reset password.</p>
        {/* {
          "Check your email for a link to reset password.".split(" ").map((word)=>{
            return word===" "?<span>&nbsp;</span>:<span>{word}</span>
          })
        } */}
        <button className="noticeButton" onClick={handleClick} >Back to login</button>
        </div>
        </div>
  )
}

export default ForgotPasswordNotice