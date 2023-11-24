import React, { useEffect, useState } from 'react'
import "../styles/Login.css"
import { submitEmailLogin, submitPasswordLogin,login, loginRequest } from '../redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
function Login({ submitEmailLogin, submitPasswordLogin }) {
  const dispatch=useDispatch();
  const loginData=useSelector((state)=>state.login)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid,setValid]=useState(true);
  const navigate = useNavigate()
  const handleEmail = (e) => {
   submitEmailLogin(e.target.value)
  }
  const handlePassword = (e) => {
    submitPasswordLogin(e.target.value)
  }

  const handleSubmit = () => {
    const { Login_email: email, Login_password: password } = loginData;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (email.trim() !== "" && password.trim() !== "" && emailRegex.test(email)) {
    //   submitEmailLogin(email);
    //   submitPasswordLogin(password);
    //   dispatch(loginRequest());
    //   navigate("/review")
    // } else if(!emailRegex.test(email)){
    //   setValid(false)
    // }
    console.log(email,password)
    dispatch(loginRequest(email,password,navigate))
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
    submitPasswordLogin: (password) => dispatch(submitPasswordLogin(password)),
    login:()=>dispatch(login())
  }
}

export default connect(null, mapDispatchToProps)(Login)