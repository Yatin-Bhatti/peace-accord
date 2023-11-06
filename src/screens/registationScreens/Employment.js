import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
 import { addEmployment } from '../../redux';
import "../../styles/Employment.css"
import { connect,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function Employment(props) {
    const[status,setStatus]=useState("Employed")
    const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register);
    const navigate=useNavigate();
    const changeStatus=(text)=>{
        setStatus(text)
    }

    const handleClick=()=>{
        if(status.trim()!==""&&submitData.text!==""&&submitData.text!==""&&submitData.password!==""&&registerData.firstName!==""&&registerData.lastName!==""&&registerData.city!==""&&registerData.birthDate!==""){
            props.addEmployment(status)
        }
        else {
          alert("Your registration was interrupted, please enter details before proceeding")
          navigate("/")
        }
    }
  return (
    <div className="employBody" >
        <div className="employContainer">
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