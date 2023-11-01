import React, { useEffect, useState } from 'react'
import "../styles/NewPassword.css"
function NewPassword() {
    const [firstField,setFirstField]=useState("");
    const [secondField,setSecondFeild]=useState("");
    const [valid,setValid]=useState(true)
    const firstChange=(e)=>{
        setFirstField(e.target.value)
    }
    const secondChange=(e)=>{
        setSecondFeild(e.target.value)
    }
    const handleSubmit=()=>{
        
        if(firstField.trim()===secondField.trim()){
            setValid(true)
        }
        else 
        {
            setValid(false);
        }
    }

  return (
    <div className="newPassBody">
        <div className="newCont">
        <div style={{marginBottom:"30px"}}>
        <input className='newInput' spellCheck="false"
         value={firstField} onChange={firstChange}
         maxLength={10000} placeholder="Enter new password" />
        </div>
        <div className="reInput">
         <input className='newInput' spellCheck="false"
         value={secondField} onChange={secondChange}
          maxLength={10000} placeholder="Enter new password again" />
          
          
        <button className="newSubmit" onClick={handleSubmit}>Reset</button>
        </div>
        <div style={{marginLeft:"16px",marginTop:"5px"}}>
        {!valid && <p  >Passwords must match</p>}
        </div>
        </div>
        </div>
  )
}

export default NewPassword