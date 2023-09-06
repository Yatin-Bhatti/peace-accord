import React,{useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {PiDotsThreeOutlineVerticalFill} from "react-icons/pi"
import {FaCheck,FaTimes} from "react-icons/fa"
import "./ListItem.css"
function ListItem({content,votes}) {
    const [voteStatus,setVoteStatus]=useState()
  return (
    <div className="main">
    <p>{content}</p>
    <DropdownButton id="dropdown-item-button"  title={
          voteStatus === true ? (
            <FaCheck color={"black"}/>
          ) : voteStatus === false ? (
            <FaTimes color={"black"} />
          ) : (
            <PiDotsThreeOutlineVerticalFill color={"black"} />
          )
        }
    >
      <Dropdown.ItemText>{`${votes} Votes`}</Dropdown.ItemText>
      <Dropdown.ItemText>--------------------</Dropdown.ItemText>
      <Dropdown.Item as="button" onClick={()=>setVoteStatus(true)}>Vote Yes</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=>setVoteStatus(false)}>Vote No</Dropdown.Item>
    </DropdownButton>
    </div>
  )
}

export default ListItem