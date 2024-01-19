import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import "../styles/NewPassword.css"
import { hideLoader, showLoader } from '../redux';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
function NewPassword() {
    const [firstField,setFirstField]=useState("");
    const [secondField,setSecondFeild]=useState("");
    const [valid,setValid]=useState(true);
    const [token, setToken] = useState('');
    const [uidb64, setUidb64] = useState('');
    const [success,setSuccess]=useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
      
      const params = new URLSearchParams(window.location.search);
      console.log(params)
      
      const tokenValue = params.get('token');
      const uidb64Value = params.get('uidb64');
  
    
      setToken(tokenValue);
      setUidb64(uidb64Value);
      if (!tokenValue || !uidb64Value) {
       
        navigate('/login');
      }
    }, []); 
    // useEffect(()=>{
    //   console.log(success)
    // },[success])
    const callNewPassword=async()=>{
      const payload={
        password:firstField,
        token:token,
        uidb64:uidb64
      }
      // console.log(payload)
      try {
        dispatch(showLoader())
         const response = await fetch("https://peace-accord-api-0d93a6880046.herokuapp.com/account/password-reset-complete", {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(payload),
         });
   
        //  console.log(response)
         if (response.ok) {
          startTransition(() => {
            setFirstField("");
            setSecondFeild("");
            setSuccess(true);
          });
         } else {
         
           alert("Something went wrong !");
           
         }
       } catch (error) {
        alert("Something went wrong !");
        
       }finally{
         dispatch(hideLoader())
       }
    }
   
    const firstChange=(e)=>{
        setFirstField(e.target.value)
    }
    const secondChange=(e)=>{
        setSecondFeild(e.target.value)
    }
    const handleSubmit=()=>{
      if(firstField===""||secondField===""){
        return
      }
        if(firstField.trim()===secondField.trim()){
            setValid(true)
            callNewPassword();
        }
        else 
        {
            setValid(false);
        }
    }

  return (
    <div className="newPassBody">
       {token!==""?( !success?<div className="newCont">
        <div style={{marginBottom:"30px"}}>
        <input className='newInput' spellCheck="false" type="password"
         value={firstField} onChange={firstChange}
         onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSubmit(); 
          }}}
         maxLength={10000} placeholder="Enter new password" />
        </div>
        <div className="reInput">
         <input className='newInput' spellCheck="false" type="password"
         value={secondField} onChange={secondChange}
         onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSubmit(); 
          }}}
          maxLength={10000} placeholder="Enter new password again" />
          
          
        <button className="newSubmit" onClick={handleSubmit}>Reset</button>
        </div>
        <div style={{marginLeft:"16px",marginTop:"5px"}}>
        {!valid && <p  >Passwords must match</p>}
        </div>
        </div>:
        <div className="successMessageCont">
          <p className="mess_style">Password successfully reset, You can now go login with new password</p>
          </div>
        ):null}
        </div>
  )
}

export default NewPassword