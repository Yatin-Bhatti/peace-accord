import React, { useState } from 'react'
import "../styles/Login.css"
import { submitEmailLogin, submitPasswordLogin } from '../redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
function Login({ submitEmailLogin, submitPasswordLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid,setValid]=useState(true);
  const navigate = useNavigate()
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() !== "" && password.trim() !== "" && emailRegex.test(email)) {
      submitEmailLogin(email);
      submitPasswordLogin(password);
      navigate("/review")
    } else if(!emailRegex.test(email)){
      setValid(false)
    }
  }
  return (
    <div className="logBody">
      <div className="logCont">
        <input className='inputCustomm' spellCheck="false"
          onChange={handleEmail}
          onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
           handleSubmit();
          }}}
          maxLength={10000} placeholder="Enter Email" />
        {!valid && <p className="InvalidAlertt">Please enter a valid email address.</p>}

      </div>
      <div className="passCont">
        <input className='inputCustommm' spellCheck="false"
          onChange={handlePassword}
          onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSubmit(); 
          }}}
          maxLength={10000} placeholder="Enter Password" />
        <button className="submitButtonn" value={email} onClick={handleSubmit}>Login</button>
      </div>
      <div className="linkStyle" >
        <a href="/forgotpassword">Forgot Password</a>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    submitEmailLogin: (email) => dispatch(submitEmailLogin(email)),
    submitPasswordLogin: (password) => dispatch(submitPasswordLogin(password))
  }
}

export default connect(null, mapDispatchToProps)(Login)