import React,{useState,useRef,useEffect} from 'react'
import "../styles/Review.css"
function Review() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {

    const input = e.target;
    input.style.height = ""; 
    input.style.height = Math.min(input.scrollHeight-25, 200) + 'px';
    const inputValue = e.target.value;
    setText(inputValue);

    const words = inputValue.split(' ').filter((word) => word.trim() !== '');
    setWordCount(words.length);

   
  };
  return (
    <div className="revBody">
    <div className="revContainer">
    <div className='inputDiv'>
    <textarea className='inputCustom' value={text} spellCheck="false" onChange={handleChange} maxLength={10000} placeholder="What is required for peace?"/>
    <p style={{color:"white",fontSize:"14px",width:"700px",textAlign:"end",paddingLeft:"10px"}}>{`${wordCount}/300`}</p>
    </div>
    <div className="buttonContainer">
    <button className='submitButton'>Submit</button>
    </div>
    </div>
    </div>
  )
}

export default Review