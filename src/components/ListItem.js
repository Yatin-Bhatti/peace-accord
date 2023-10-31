import React,{useState,forwardRef, useImperativeHandle} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {PiDotsThreeOutlineVerticalFill} from "react-icons/pi"
import {FaCheck,FaTimes} from "react-icons/fa"
import "./ListItem.css"
const ListItem=forwardRef(({content,votes},ref)=> {
    const [voteStatus,setVoteStatus]=useState()
    useImperativeHandle(ref,()=>({
      alterStatus(checkboxState){
       if(checkboxState!==false) setVoteStatus()
       else setVoteStatus(!checkboxState)
      }
    }))
  return (
    <div className="main">
    <p className="listText">{content}</p>
    <DropdownButton id="dropdown-item-button"  title={
          voteStatus === true ? (
            <FaCheck color={"black"} size={32}/>
          ) : voteStatus === false ? (
            <FaTimes color={"black"} size={32} />
          ) : (
            <PiDotsThreeOutlineVerticalFill color={"black"} style={{fontSize:"24px"}}/>
          )
        }
    >
      <Dropdown.ItemText style={{fontSize:"32px",color:"#4D4C4C"}}>{`${votes} Votes`}</Dropdown.ItemText>
      <Dropdown.ItemText style={{fontSize:"32px",color:"#4D4C4C"}}>----------</Dropdown.ItemText>
      <Dropdown.Item as="button" className="dropButton" onClick={()=>setVoteStatus(true)}>Vote Yes</Dropdown.Item>
      <Dropdown.Item as="button"  className="dropButton" onClick={()=>setVoteStatus(false)}>Vote No</Dropdown.Item>
    </DropdownButton>
    </div>
  )
})

export default ListItem