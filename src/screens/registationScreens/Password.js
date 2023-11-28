import React,{useState} from 'react'
import "../../styles/Password.css"
import { submitPassword,addRegisPassword } from '../../redux'
import { useNavigate } from 'react-router';
import { connect, useSelector } from 'react-redux'
import { useEffect } from 'react';
function Password({submitPassword,addRegisPassword}) {
    const[password,setPassword]=useState("")
    const navigate=useNavigate();
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