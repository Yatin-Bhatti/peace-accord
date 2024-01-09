import React, { lazy, useEffect, useState,useRef } from 'react'
import "../styles/ForgotPassword.css"
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../redux';
import { TweenMax,Power3 } from 'gsap';
const ForgotPasswordNotice = lazy(() => import('./ForgotPasswordNotice'));
function ForgotPassword() {
    const [valid,setValid]=useState(true);
    const[email,setEmail]=useState("");
    const[redirect,setRedirect]=useState(false)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let containerRef=useRef(null)
    useEffect(()=>{

      TweenMax.to(
        containerRef,
        0.8,
        {
          opacity:1,
          y:-20,
          ease:Power3.easeOut
        }
      )
        
      },[])
    const handleChange=(e)=>{
        setEmail(e.target.value);
    }
 
    const callpassEmail=async()=>{
      const payload={
        email:email,
        redirect_url:"https://peace-accord-f1b931eca321.herokuapp.com/newpassword"
      }
      try {
        dispatch(showLoader())
         const response = await fetch("https://peace-accord-api-0d93a6880046.herokuapp.com/account/request_reset_email", {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
            //  'Authorization': `Bearer ${accessToken.access}`,
           },
           body: JSON.stringify(payload),
         });
   
         
        
         if (response.ok) {
           setEmail("")
           window.location.href="/forgotpasswordnotice"
           
         } else if(response.status===400){
          alert("Please enter the registered email");
         }
         
         else {
         
           alert("Something went wrong !");
           
         }
       } catch (error) {
        alert("Something went wrong !");
        
       }finally{
         dispatch(hideLoader())
        
       }
    }
 
    const handleSubmit=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() !== '' && emailRegex.test(email)) {
          callpassEmail();
          
          setValid(true)
        } else {
        
          
          setValid(false);
        }
    }

  return (
    <div className="forgotBody">
        <div className="forgotCont" ref={el=>{containerRef=el}}>
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