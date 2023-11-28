import React, { useState } from 'react'
import "../../styles/BirthDate.css"
import { connect,useSelector } from 'react-redux';
import { addBirthDate } from '../../redux';
import { useNavigate } from 'react-router';
function BirthDate(props) {
  const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register);
    const[birthText,setBirthText]=useState("")
    const [valid,setValid]=useState(true);
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setBirthText(e.target.value)
    }
    const isValidBirthdate = (input) => {
        
        const regexPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    
        
        return regexPattern.test(input);
      };

      function changeDateFormat(inputDate) {
        const parts = inputDate.split('/');
        if (parts.length === 3) {
          const [month, day, year] = parts;
          // Construct a new date string in the desired format
          const newDateFormat = `${year}-${month}-${day}`;
          return newDateFormat;
        } else {
          // Handle invalid date format
          console.error('Invalid date format:', inputDate);
          return inputDate;
        }
      }

    const handleAddBirth=()=>{
        if (isValidBirthdate(birthText)&&submitData.text!==""&&registerData.email!==""&&registerData.password!==""&&registerData.firstName!==""&&registerData.lastName!==""&&registerData.city!=="") {
          const newDate = changeDateFormat(birthText);
            props.addBirthDate(newDate);
            navigate("/employment")
          }
          else if(!isValidBirthdate(birthText)&&submitData.text!==""&&registerData.email!==""&&registerData.password!==""&&registerData.first_name!==""&&registerData.last_name!==""&&registerData.city!==""){
            setValid(false)
          }
          else {
            alert("Your registration was interrupted, please enter details before proceeding")
            navigate("/")
          }
        };
        const birthFocus=()=>{
            setValid(true);
          }
    
  return (
    <div className="birthBody">
        <div className="birthContainer">
            <div style={{display:"flex",flexDirection:"column"}}>
        <input className="birthInput" spellCheck="false" value={birthText} placeholder="BIRTH DATE MM/DD/YYYY"
         onKeyDown={e =>{ if (e.key === 'Enter') {
          e.preventDefault(); 
          handleAddBirth(); 
        }}}
        onFocus={birthFocus} onChange={handleChange}/>
        
        </div>
        <button className="birthButton" onClick={handleAddBirth}>Add</button>
        
        </div>
        <div className="invalidDate">
        {!valid && <p className="InvalidAlert">Please enter a valid birth date.</p>}
        </div>
        </div>
  )
}
const mapStateToProps=state=>{
    return {
      birthDate:state.register.birthDate
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      addBirthDate:(text)=>dispatch(addBirthDate(text)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(BirthDate) 