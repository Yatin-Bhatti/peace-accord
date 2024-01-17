import React, { useState,useEffect,useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
 import { addEmployment } from '../../redux';
import "../../styles/Employment.css"
import { connect,useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerRequest } from '../../redux/register/registerActions';
import { TweenMax,Power3 } from 'gsap';
import { Helmet } from 'react-helmet';
function Employment(props) {
    const[status,setStatus]=useState("Employed")
    const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let containerRef=useRef(null)
    const changeStatus=(text)=>{
        setStatus(text)
    }
    // useEffect(()=>{
    //   props.addEmployment(status)
    // },[status])
    useEffect(() => {
      let employmentCode;
    
      switch (status) {
        case "Employed":
          employmentCode = "E";
          break;
        case "Unemployed":
          employmentCode = "UN";
          break;
        case "Retired":
          employmentCode = "R";
          break;
        case "Homemaker":
          employmentCode = "HM";
          break;
        case "Unable to work":
          employmentCode = "UTW";
          break;
        default:
          // Handle the default case if needed
          employmentCode = "";
      }
    
      // Call addEmployment with the mapped code
      props.addEmployment(employmentCode);
    }, [status]);
    

    const handleClick=async()=>{
        if(status.trim()!==""&&submitData.text!==""&&registerData.email!==""&&registerData.password!==""&&registerData.first_name!==""&&registerData.last_name!==""&&registerData.city!==""&&registerData.date_of_birth!==""){
          //  await props.addEmployment(status)
            dispatch(registerRequest(registerData,navigate));
        }
        else {
          alert("Your registration was interrupted, please enter details before proceeding")
          navigate("/")
        }
    }
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
  return (
    <div className="employBody" >
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
        <div className="employContainer" ref={el=>{containerRef=el}}>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="customToggle" >
        <p
        className="left-aligned-text"
        >{status}</p> 
      </Dropdown.Toggle>

      <Dropdown.Menu className="customMenu">
        <Dropdown.Item onClick={()=>changeStatus("Employed")}>Employed</Dropdown.Item>
        <Dropdown.Item onClick={()=>changeStatus("Unemployed")}>Unemployed</Dropdown.Item>
        <Dropdown.Item onClick={()=>changeStatus("Retired")}>Retired</Dropdown.Item>
        <Dropdown.Item onClick={()=>changeStatus("Homemaker")}>Homemaker</Dropdown.Item>
        <Dropdown.Item onClick={()=>changeStatus("Unable to work")}>Unable to work</Dropdown.Item>

        
      </Dropdown.Menu>
    </Dropdown>
    <button className="employButton" onClick={handleClick}>Add</button>
        </div>
        </div>
  )
}

const mapStateToProps=state=>{
    return {
      employment:state.register.employment
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      addEmployment:(text)=>dispatch(addEmployment(text)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Employment)