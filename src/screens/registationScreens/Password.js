import React,{useState} from 'react'
import "../../styles/Password.css"
import { submitPassword } from '../../redux'
import { useNavigate } from 'react-router';
import { connect, useSelector } from 'react-redux'
import { useEffect } from 'react';
function Password({submitPassword}) {
    const[password,setPassword]=useState("")
    const navigate=useNavigate();
    const submitData=useSelector((state)=>state.submit);
 useEffect(()=>{
  if(submitData.text==""||submitData.email==""){
    navigate("/")
  }
 },[])
 
    const handleFocus=()=>{
        console.log("called")
    }
    const handleChange=(e)=>{
        setPassword(e.target.value)
    }
    const handleClick=()=>{
      if(password.trim()!==""&&submitData.text!==""&&submitData.text!==""){
        submitPassword(password);
       
        navigate("/name")
        
      }
      else{
        alert("Your registration was interrupted, please enter Submission and email address before proceeding")
        navigate("/")
      }
    }
  return (
    <div className="passBody">
        <div className="passContainer">
        <input className="passInput" spellCheck="false" value={password} onFocus={handleFocus} 
         onKeyDown={e =>{ if (e.key === 'Enter') {
          e.preventDefault(); 
          handleClick(); 
        }}}
        onChange={handleChange} placeholder="Please enter password"/>
        <button className="button" onClick={handleClick}>Submit</button>
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
     
      
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)( Password)