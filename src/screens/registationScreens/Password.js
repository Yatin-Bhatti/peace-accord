import React,{useState,useRef} from 'react'
import "../../styles/Password.css"
import { submitPassword,addRegisPassword } from '../../redux'
import { useNavigate } from 'react-router';
import { connect, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { TweenMax,Power3 } from 'gsap';
function Password({submitPassword,addRegisPassword}) {
    const[password,setPassword]=useState("")
    const navigate=useNavigate();
    let containerRef=useRef(null)
    const submitData=useSelector((state)=>state.submit);
    const [showInvalid,setShowInvalid]=useState(false);
 
    const handleFocus=()=>{
        console.log("called")
    }
    const handleChange=(e)=>{
        setPassword(e.target.value)
    }
    const handleClick=()=>{
   

      if(password.length<6){
        setShowInvalid(true)
        return
      }

      if(password.trim()!==""&&submitData.text!==""&&submitData.text!==""){
        // submitPassword(password);
        addRegisPassword(password);
        navigate("/name")
        
      }
      else{
        alert("Your registration was interrupted, please enter Submission and email address before proceeding")
        navigate("/")
      }
    }
    useEffect(()=>{

      TweenMax.to(
        containerRef,
        0.8,
        {
          opacity:1,
          x:-20,
          ease:Power3.easeOut
        }
                  )
        
      },[])
  return (
    <div className="passBody">
        <div className="passContainer" ref={el=>{containerRef=el}}>
         
        <input className="passInput" type="password" spellCheck="false" value={password} onFocus={handleFocus} 
         onKeyDown={e =>{ if (e.key === 'Enter') {
          e.preventDefault(); 
          handleClick(); 
        }}}
        onChange={handleChange} placeholder="Please enter password"/>
        
      
        <button className="button" onClick={handleClick}>Submit</button>

        </div>
        <div className="invalidCont">
        {showInvalid&&<p className="passInvalid">Password must have atleast 6 characters</p>}
        </div>
        </div>
  )
}

const mapStateToProps=state=>{
    return {
      password:state.submit.password
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      submitPassword:(password)=>dispatch(submitPassword(password)),
      addRegisPassword:(password)=>dispatch(addRegisPassword(password))
      
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)( Password)