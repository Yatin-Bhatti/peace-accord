import React, { useState } from 'react'
import "../../styles/Email.css"
import { useDispatch } from 'react-redux';
import { addRegisEmail,submitText } from '../../redux';
import { useNavigate } from 'react-router-dom';
function Email() {
  const [email, setEmail] = useState("");
  const [showInvalid,setShowInvalid]=useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }
  const handleRegister=()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===""||!emailRegex.test(email)){
      setShowInvalid(true)
      return;
    }
    else{
      dispatch(addRegisEmail(email))
      dispatch(submitText("New Registration"))
      navigate("/password")
    }
  }
  const handleFocus=()=>{
    setShowInvalid(false)
  }

  return (
    <div className="emailBody">
      <div className="emailContainer">
      <input className="emailInput" spellCheck="false" placeholder="Enter email" onChange={handleEmail}
       onKeyDown={e =>{ if (e.key === 'Enter') {
        e.preventDefault(); 
        handleRegister(); 
      }}}
      onFocus={handleFocus}
      />
  
      <button className="emailButton" onClick={handleRegister}>Register</button>
      </div>
      <div className="invalidEmailCont">
        {showInvalid&&<p className="emailInvalid">Please enter a valid email.</p>}
        </div>
      </div>
  )
}

export default Email