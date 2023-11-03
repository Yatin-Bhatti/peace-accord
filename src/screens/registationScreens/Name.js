import React, { useEffect, useState } from 'react'
import "../../styles/Name.css"
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addFirstName,addLastName } from '../../redux';
function Name(props) {
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const [isFocused, setIsFocused] = useState(true);
    const navigate=useNavigate();
    const submitData=useSelector((state)=>state.submit);
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
        if(lastName.trim()!==""&&submitData.text!==""&&submitData.text!==""&&submitData.password!==""){
            props.addLastName(lastName)
            navigate("/city")
        }
       
          else{
            alert("Your registration was interrupted, please enter details before proceeding")
            navigate("/")
          }
        
    }
    const handleFocus = () => {
        setIsFocused(true);
      };
    
    return (
        <div className="nameBody">
            <div className={`firstNameCont ${ props.firstName !== '' ? 'containerWithMargin' : ''}`}>
            <input className="firstName" spellCheck="false" onFocus={handleFocus} 
             onKeyDown={e =>{ if (e.key === 'Enter') {
              e.preventDefault(); 
              handleFirstClick(); 
            }}}
            onChange={handleFirstChange} placeholder="Enter first name"/>
           {isFocused&& <button className="button" onClick={handleFirstClick}>Add</button>}
            </div>
            {props.firstName!==""&&<div className="secNameBody">
            <input className="firstName" spellCheck="false" onChange={handleLastChange} 
             onKeyDown={e =>{ if (e.key === 'Enter') {
              e.preventDefault(); 
              handleLastClick(); 
            }}}
            placeholder="Enter last name"/>
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