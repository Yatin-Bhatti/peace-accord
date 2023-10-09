import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
 import { addEmployment } from '../../redux';
import "../../styles/Employment.css"
import { connect } from 'react-redux';
function Employment(props) {
    const[status,setStatus]=useState("Employed")
    
    const changeStatus=(text)=>{
        setStatus(text)
    }

    const handleClick=()=>{
        if(status.trim()!==""){
            props.addEmployment(status)
        }
    }
  return (
    <div className="employBody" >
        <div className="employContainer">
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="customToggle">
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