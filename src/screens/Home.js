import React, { useState, useRef, useEffect, useCallback } from 'react'
import { submitText, submitEmail,addRegisEmail,showLoader,hideLoader } from '../redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { openRegistrationFlow } from '../redux';
import "../styles/Home.css"
import { connect,useDispatch,useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
function Home(props) {
  const [text, setText] = useState('');
  const [email, setEmail] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [valid, setValid] = useState(true);
  const [isFocused, setIsFocused] = useState(true);
  const [token,setToken]=useState(null);
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [charCount, setCharCount] = useState(text.length);
  const registerFlow=useSelector((state)=>state.registerFlow.isRegistrationFlowOpen)
  const accessToken=useSelector((state)=>state.loginProcess.token);
  const submissionText=useSelector((state)=>state.submit.text);
  const[showSubInvalid,setShowSubInvalid]=useState(false);
let user;
  const boxStyle = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(()=>{
   setToken(localStorage.getItem("authTokens")?localStorage.getItem("authTokens"):null)
    
  },[])
  useEffect(()=>{
    console.log(registerFlow)
  },[registerFlow])
  const setFormattedContent = useCallback(
    (text) => {
      let words = text.split(" ").filter(Boolean);
      if (words.length > 300) {
        setText(
          words.slice(0, 300).join(" "),

        );
      } else {
        setText(text);
      }
    },
    [setText]
  );

  const handleChange = (e) => {
    setIsFocused(true)
    const input = e.target;
    if (input.value.length <= 300) {
      
      setText(input.value)
      setCharCount(input.value.length);
    }
    input.style.height = "";
    input.style.height = Math.min(input.scrollHeight - 3, 200) + 'px';
    const inputValue = e.target.value;


  };
  useEffect(() => {
    
    props.submitText(text);
  }, [text, props.submitText]);
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  const handleFocus = () => {
    // setIsFocused(true);
    setShowSubInvalid(false)
  };
  const mailFocus = () => {
    setValid(true);
  }
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSubmit = async() => {
    if(token===null){
   
      setOpen(true);
    }
    else{
      const decoded = jwtDecode(accessToken.access);
      const userId =decoded.user_id;
      const currentDate = new Date().toISOString();
      const payload = {
        Submission_text: submissionText,
        date_posted: currentDate,
        user: userId,
      };
      try {
       dispatch(showLoader())
        const response = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/create_submission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.access}`,
          },
          body: JSON.stringify(payload),
        });
  
        console.log(response)
        if (response.ok) {
          
          alert('Submission successful');
          props.submitText("")
          setText("");
        
        } else {
        
          console.error('Submission failed:', response.statusText);
          
        }
      } catch (error) {
        console.error('Error during submission:', error);
       
      }finally{
        dispatch(hideLoader())
      }
    }
  };
  const handleSignin=()=>{
    navigate("/login")
    setOpen(false)
  }
  const handleSignup=()=>{
    if(text.trim!==""){
      props.submitText(text)
    dispatch(openRegistrationFlow())
    setIsFocused(false)
    setOpen(false)
    }
  }

  const handleRegister = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(submissionText===""&&(email.trim() === '')){
      
      setValid(false)
      setShowSubInvalid(true)
      return
    }
    else if(submissionText===""&&!emailRegex.test(email)){
      
      setValid(false)
      setShowSubInvalid(true)
      return
    }
    else if (submissionText===""){
      setShowSubInvalid(true)
      return
    }

    if (email.trim() !== '' && emailRegex.test(email)) {

      // props.submitEmail(email);
      props.addRegisEmail(email);
      navigate("/password")
    } else {


      setValid(false);
    }
  };

  return (
    <div className="revBody">
      <div className={`revContainer ${ registerFlow ? 'containerWithMargin' : ''}`}>
        <div className='inputDiv'>
          <textarea 
          className={`inputCustom ${text.length === 0 ? 'noScroll' : ''}`}
           value={text} spellCheck="false" onChange={handleChange}
            onFocus={handleFocus}
            //  onBlur={handleBlur} 

            maxLength={300} placeholder="What is required for peace?" />
            <div className="wordStyle">
          <p >{`${charCount}/300`}</p>
          
          </div>
          {showSubInvalid&&<p className="submissionInvalid">Please enter a submission</p>}
        </div>
        <div className="buttonContainer">
          {isFocused && (<button className='submitButtton marginButton decMargin'

            onClick={handleSubmit}
          >Submit</button>)}

        </div>
      </div>
      {registerFlow && <div className="mailBody">
        
        <div className='mailCont'>
          <textarea className={`inputCustom addTopMargin ${email.length === 0 ? 'noScroll' : ''}`} spellCheck="false"
            onChange={handleEmail}
            onKeyDown={e =>{ if (e.key === 'Enter') {
              e.preventDefault(); 
              handleRegister(); 
            }}}
            onFocus={mailFocus}
            maxLength={10000} placeholder="Enter Email" />
          {!valid && 
          
          <p className="InvalidAlert">Please enter a valid email address.</p>}
        </div>
       
     
        <div className="buttonContainer">
        <button className="submitButtton buttonMargin" value={email} onClick={handleRegister}>Register</button>
        </div>
      </div>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
      Create a new account
    </Typography>

    {/* Sign Up Section */}
    <div>
      <Button variant="contained" color="primary" onClick={handleSignup} >
        Sign Up
      </Button>
    </div>

    {/* Or */}
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Already a user?
    </Typography>

    {/* Sign In Section */}
    <div>
      <Button variant="contained" color="secondary" onClick={handleSignin} >
        Sign In
      </Button>
    </div>
        </Box>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    text: state.submit.text
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitText: (text) => dispatch(submitText(text)),
    submitEmail: (email) => dispatch(submitEmail(email)),
    addRegisEmail:(email)=>dispatch(addRegisEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)