import React, { useState } from 'react'
import "../../styles/BirthDate.css"
import { connect } from 'react-redux';
import { addBirthDate } from '../../redux';
import { useNavigate } from 'react-router';
function BirthDate(props) {
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

    const handleAddBirth=()=>{
        if (isValidBirthdate(birthText)) {
            props.addBirthDate(birthText);
            navigate("/employment")
          } else {
            setValid(false)
          }
        };
        const birthFocus=()=>{
            setValid(true);
          }
    
  return (
    <div className="birthBody">
        <div className="birthContainer">
            <div style={{display:"flex",flexDirection:"column"}}>
        <input className="birthInput" spellCheck="false" value={birthText} placeholder="BIRTH DATE MM/DD/YYYY" onFocus={birthFocus} onChange={handleChange}/>
        {!valid && <p className="InvalidAlert">Please enter a valid birth date.</p>}
        </div>
        <button className="birthButton" onClick={handleAddBirth}>Add</button>
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