import React, { useEffect, useState,useRef } from 'react'
import "../styles/Login.css"
import { submitEmailLogin, submitPasswordLogin,login, loginRequest } from '../redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { TweenMax,Power3 } from 'gsap';
import { Helmet } from 'react-helmet';
function Login({ submitEmailLogin, submitPasswordLogin }) {
  const dispatch=useDispatch();
  const loginData=useSelector((state)=>state.login)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyPassword,setEmptyPassword]=useState(false);
  const [valid,setValid]=useState(true);
  let containerRef=useRef(null)
  const navigate = useNavigate()
  const handleEmail = (e) => {
   submitEmailLogin(e.target.value)
  }
  const handlePassword = (e) => {
    submitPasswordLogin(e.target.value)
  }
  const handleFocus=()=>{
    
    setValid(true)
  }
  const handlePassFocus=()=>{
    setEmptyPassword(false)
  }
  
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
    useEffect(() => {
      
      const params = new URLSearchParams(window.location.search);
      console.log(params)
      
     const is_redirected_from_email= params.get("is_redirected_from_email")
     console.log(is_redirected_from_email)
    }, []);
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (email.trim() !== "" && password.trim() !== "" && emailRegex.test(email)) {
    //   submitEmailLogin(email);
    //   submitPasswordLogin(password);
    //   dispatch(loginRequest());
    //   navigate("/review")
    // } else if(!emailRegex.test(email)){
    //   setValid(false)
    // }
  const handleSubmit = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(loginData.Login_email)&&loginData.Login_password.length===0){
      setValid(false)
      setEmptyPassword(true)
      return
    }
    else if(!emailRegex.test(loginData.Login_email)&&loginData.Login_password.length>0){
      setValid(false)
      return
    }
    else if(loginData.Login_password.length===0){
      setEmptyPassword(true)
      return
    }
    // if(loginData.Login_password.length===0){
    //   setEmptyPassword(true)
    //   return
    // }

    const { Login_email: email, Login_password: password } = loginData;
    dispatch(loginRequest(email,password,navigate))
  }
  return (
    <div ref={el=>{containerRef=el}}  className="logBody">
       <Helmet>
        <title>Log In</title>
        <meta
        name="description"
        content="Users can login to their account."
        />
        <meta
        name="keywords" content="Login, Log, In"
        />
      </Helmet>
      <div className="logCont">
        <input className='inputCustomm' spellCheck="false"
        onFocus={handleFocus}
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
        type="password"
        onFocus={handlePassFocus}
          onChange={handlePassword}
          onKeyDown={e =>{ if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSubmit(); 
          }}}
          maxLength={10000} placeholder="Enter Password" />
          
        <button className="submitButtonn" value={email} onClick={handleSubmit}>Login</button>
        {emptyPassword&&<p className="invalidPass">Please enter password</p>}
      </div>
      <div className={`linkStyle ${emptyPassword ? 'withMargin' : ''}`} >
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