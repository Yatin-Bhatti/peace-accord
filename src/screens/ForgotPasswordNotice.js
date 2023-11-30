import React from 'react'
import "../styles/ForgotPasswordNotice.css"
import { useNavigate } from 'react-router'
function ForgotPasswordNotice() {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/login")
    }
  return (
    <div className="noticeBody">
        <div className="noticeCont">
        <p className="noticestyle"> Check your email for a link to reset password.</p>
        <button className="noticeButton" onClick={handleClick} >Back to login</button>
        </div>
        </div>
  )
}

export default ForgotPasswordNotice