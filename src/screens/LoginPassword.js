import React, { useState } from 'react'
import "../styles/LoginPassword.css"
import { connect } from 'react-redux'
import { submitPasswordLogin } from '../redux'
function LoginPassword({submitPasswordLogin}) {
    const[password,setPassword]=useState("")
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit=()=>{
        if(password.trim()!==""){
            submitPasswordLogin(password)
        }
    }
  return (
    <div className="logPassBody">
        <div className="logPassCont">
        <input className='inputCustom' spellCheck="false" 
       onChange={handlePassword}
    maxLength={10000} placeholder="Enter Password"/>
    <button className="submitButton" value={password} onClick={handleSubmit}>Submit</button>
        </div>
        </div>
  )
}
const mapDispatchToProps=dispatch=>{
    return{
        submitPasswordLogin:(password)=>dispatch(submitPasswordLogin(password))
    }
}

export default connect(null,mapDispatchToProps)( LoginPassword)