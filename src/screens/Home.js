import React, { useState, useRef, useEffect, useCallback } from 'react'
import { submitText, submitEmail } from '../redux';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"
import { connect } from 'react-redux';
function Home(props) {
  const [text, setText] = useState('');
  const [email, setEmail] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [valid, setValid] = useState(true);
  const [isFocused, setIsFocused] = useState(true);
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();


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
    setFormattedContent(e.target.value)
    const input = e.target;
    input.style.height = "";
    input.style.height = Math.min(input.scrollHeight - 12, 200) + 'px';
    const inputValue = e.target.value;


    const words = inputValue.split(' ').filter((word) => word.trim() !== '');
    setWordCount(words.length);


  };
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };
  const mailFocus = () => {
    setValid(true);
  }
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSubmit = () => {
    if (text.trim() !== '') {
      props.submitText(text);
      setCounter((prevCounter) => prevCounter + 1);
      setIsFocused(false);
    }
  };

  const handleRegister = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() !== '' && emailRegex.test(email)) {

      props.submitEmail(email);
      navigate("/password")
    } else {


      setValid(false);
    }
  };

  return (
    <div className="revBody">
      <div className={`revContainer ${counter > 0 && props.text !== '' ? 'containerWithMargin' : ''}`}>
        <div className='inputDiv'>
          <textarea className='inputCustom' value={text} spellCheck="false" onChange={handleChange}
            onFocus={handleFocus}
            //  onBlur={handleBlur} 

            maxLength={10000} placeholder="What is required for peace?" />
            <div className="wordStyle">
          <p >{`${wordCount}/300`}</p>
          </div>
        </div>
        <div className="buttonContainer">
          {isFocused && (<button className='submitButtton marginButton'

            onClick={handleSubmit}
          >Submit</button>)}

        </div>
      </div>
      {props.text !== "" && <div className="mailBody">
        <div className='mailCont'>
          <textarea className='inputCustom' spellCheck="false"
            onChange={handleEmail}
            onFocus={mailFocus}
            maxLength={10000} placeholder="Enter Email" />
          {!valid && <p className="InvalidAlert">Please enter a valid email address.</p>}
        </div>
        <div className="buttonContainer">
        <button className="submitButtton buttonMargin" value={email} onClick={handleRegister}>Register</button>
        </div>
      </div>}
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
    submitEmail: (email) => dispatch(submitEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)