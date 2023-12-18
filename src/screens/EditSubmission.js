import React, { useEffect, useState } from 'react'
import "../styles/EditSubmission.css"
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader, submitText } from '../redux';
import { jwtDecode } from 'jwt-decode';
function EditSubmission() {
   
    const location = useLocation();
  

  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const submissionText = queryParams.get('submissionText');
  const processedText = submissionText ? submissionText.replace(/\n/g, '') : '';
  const[text,setText]=useState(submissionText?processedText:"")
  const [charCount, setCharCount] = useState(text.length);
  const [token,setToken]=useState(null);
  const dispatch=useDispatch();
  const globalSubmissionText=useSelector((state)=>state.submit.text)
  const accessToken=useSelector((state)=>state.loginProcess.token);
    const handleChange=(e)=>{
        const input = e.target;
        if (input.value.length <= 300) {
            setText(input.value);
            
            setCharCount(input.value.length);
          }
    input.style.height = "";
    input.style.height = Math.min(input.scrollHeight - 12, 200) + 'px';
   
    }
    const handleFocus=(e)=>{
        const input = e.target;
        input.style.height = "";
        input.style.height = Math.min(input.scrollHeight - 12, 200) + 'px';
    }
    useEffect(()=>{
console.log(globalSubmissionText)
    },[globalSubmissionText])

    useEffect(()=>{
        dispatch(submitText(text))
    },[text,submitText])

    useEffect(()=>{
        if(accessToken===null){
            navigate("/login")
        }
    })
    useEffect(()=>{
        setToken(localStorage.getItem("authTokens")?localStorage.getItem("authTokens"):null)
         
       },[])
       const handleSubmit = async() => {
        if(token===null){
       
          navigate("/login")
        }
        else{
          const decoded = jwtDecode(accessToken.access);
          const userId =decoded.user_id;
          const currentDate = new Date().toISOString();
          const payload = {
            Submission_text: globalSubmissionText,
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
              
              alert('Submission edited successfully');
              dispatch(submitText(""))
              setText("");
              navigate("/review")
            
            } else {
            
              console.error('editing submission failed:', response.statusText);
              
            }
          } catch (error) {
            console.error('Error during submission editing:', error);
           
          }finally{
            dispatch(hideLoader())
          }
        }
      };
  return (
    <div className="revBody">
    <div className="revContainer">
     
      <div className='inputDiv'>
        <textarea className='inputCustom' 
        value={text}
        maxLength={300}
         spellCheck="false"
         onChange={handleChange}
          onFocus={handleFocus}
          //  onBlur={handleBlur} 

         placeholder="What is required for peace?" />
          <div className="wordStyle">
        <p >{`${charCount}/300`}</p>
        </div>
      </div>
      <div className="buttonContainer">
        <button className='submitButtton marginButton decMargin'

          onClick={handleSubmit}
        >Submit</button>

      </div>
    </div>
    </div>
  )
}

export default EditSubmission