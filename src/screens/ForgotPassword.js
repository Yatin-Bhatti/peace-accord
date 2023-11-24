import React, { useEffect, useState } from 'react'
import "../styles/ForgotPassword.css"
import { useNavigate } from 'react-router';

function ForgotPassword() {
    const [valid,setValid]=useState(true);
    const[email,setEmail]=useState("");
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setEmail(e.target.value);
    }
 
    const handleSubmit=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log("submit was called")
        if (email.trim() !== '' && emailRegex.test(email)) {
          navigate("/forgotpasswordnotice")
          setValid(true)
        } else {
        
          
          setValid(false);
        }
    }

  return (
    <div className="forgotBody">
        <div className="forgotCont">
            <div className="join">
        <input className='forgotInput' spellCheck="false"
          onChange={handleChange} value={email}
          onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSubmit(); 
          }}}
          maxLength={10000} placeholder="Enter email to reset password" />
          
          
        <button className="forgotSubmit" onClick={handleSubmit} >Submit</button>
        </div>
        <div className='invaidCont'>
        {!valid && <p className="invalid" >Please enter a valid email.</p>}
        </div>
        </div>
        </div>
  )
}

export default ForgotPassword