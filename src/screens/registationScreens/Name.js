import React, { useEffect, useState } from 'react'
import "../../styles/Name.css"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addFirstName,addLastName } from '../../redux';
function Name(props) {
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const [isFocused, setIsFocused] = useState(true);
    const navigate=useNavigate();
  const  handleFirstChange=(e)=>{
        setFirstName(e.target.value)
    }
const handleLastChange=(e)=>{
    setLastName(e.target.value)
}
  const  handleFirstClick=()=>{
        if(firstName.trim()!==""){
            props.addFirstName(firstName);
            setIsFocused(false)
        }
    }
    const handleLastClick=()=>{
        if(lastName.trim()!==""){
            props.addLastName(lastName)
            navigate("/city")
        }
    }
    const handleFocus = () => {
        setIsFocused(true);
      };
    
    return (
        <div className="nameBody">
            <div className={`firstNameCont ${ props.firstName !== '' ? 'containerWithMargin' : ''}`}>
            <input className="firstName" spellCheck="false" onFocus={handleFocus} onChange={handleFirstChange} placeholder="Enter first name"/>
           {isFocused&& <button className="button" onClick={handleFirstClick}>Add</button>}
            </div>
            {props.firstName!==""&&<div className="secNameBody">
            <input className="firstName" spellCheck="false" onChange={handleLastChange} placeholder="Enter last name"/>
            <button className="button" onClick={handleLastClick}>Add</button>
            </div>}
        </div>
    )
}

const mapStateToProps=state=>{
    return {
      firstName:state.register.firstName
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      addFirstName:(text)=>dispatch(addFirstName(text)),
      addLastName:(text)=>dispatch(addLastName(text))
      
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)( Name)