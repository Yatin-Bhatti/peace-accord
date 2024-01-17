import React,{useRef,useEffect} from 'react'
import "../styles/ForgotPasswordNotice.css"
import { useNavigate } from 'react-router'
import { Transition } from "react-transition-group";
import { Helmet } from 'react-helmet';


function ForgotPasswordNotice() {
  




    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/login")
    }
   
  return (
    <div className="noticeBody">
      <Helmet>
        <title>Check Your Email</title>
        <meta
        name="description"
        content="The user is prompted to check email."
        />
        <meta
        name="keywords" content="Check email, email, reset"
        />
      </Helmet>
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