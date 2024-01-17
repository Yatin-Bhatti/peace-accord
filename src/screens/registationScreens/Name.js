import React, { useEffect, useState,useRef } from 'react'
import "../../styles/Name.css"
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addFirstName,addLastName } from '../../redux';

import { TweenMax,Power3 } from 'gsap';
import { Helmet } from 'react-helmet';
function Name(props) {
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const [isFocused, setIsFocused] = useState(true);
    const navigate=useNavigate();
    let containerRef=useRef(null)
    const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register)
    useEffect(()=>{

      TweenMax.to(
        containerRef,
        0.8,
        {
          opacity:1,
          x:-20,
          ease:Power3.easeOut
        }
                  )
        
      },[])
  const  handleFirstChange=(e)=>{
        setFirstName(e.target.value)
    }
const handleLastChange=(e)=>{
    setLastName(e.target.value)
}
  const  handleFirstClick=()=>{
        if(firstName.trim()!==""){
            props.addFirstName(firstName.trim());
            setIsFocused(false)
        }
    }
    const handleLastClick=()=>{
        if(lastName.trim()!==""&&submitData.text!==""&&registerData.email!==""&&registerData.password!==""){
            props.addLastName(lastName.trim())
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
          <Helmet>
        <title>Register</title>
        <meta
        name="description"
        content="The user needs to enter details in order to register"
        />
        <meta
        name="keywords" content="Registration, details, information, peace, accord, peace accord"
        />
      </Helmet>
            <div className={`firstNameCont ${ registerData.first_name !== '' ? 'containerWithMargin' : ''}`} ref={el=>{containerRef=el}}>
            <input className="firstName" spellCheck="false" onFocus={handleFocus} 
             onKeyDown={e =>{ if (e.key === 'Enter') {
              e.preventDefault(); 
              handleFirstClick(); 
            }}}
            onChange={handleFirstChange} placeholder="Enter first name"/>
           {isFocused&& <button className="button" onClick={handleFirstClick}>Add</button>}
            </div>
            {registerData.first_name!==""&&<div className="secNameBody">
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