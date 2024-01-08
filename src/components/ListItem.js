import React,{useState,forwardRef, useImperativeHandle} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {PiDotsThreeOutlineVerticalFill} from "react-icons/pi"
import { hideLoader, populateSubmissionList, showLoader } from '../redux'
import {FaCheck,FaTimes} from "react-icons/fa"
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./ListItem.css"
const ListItem=forwardRef(({content,votes,accessToken,id},ref)=> {
    const [voteStatus,setVoteStatus]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useImperativeHandle(ref,()=>({
      alterStatus(checkboxState){
       if(checkboxState!==false) setVoteStatus()
       else setVoteStatus(!checkboxState)
      }
    }))

    const handleVote=async(text)=>{
      if(accessToken===null){
        navigate("/login")
        return
      }
      else{
      const decoded = jwtDecode(accessToken.access);
      const userId =decoded.user_id;
      const submissionId=id;
      const currentDate = new Date().toISOString();
      const vote=text;
      const payload={
        "vote":vote,
        "date_voted":currentDate,
        "submission":submissionId,
        "user":userId
      }
      try{
        dispatch(showLoader())
        const response = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.access}`,
          },
          body: JSON.stringify(payload),
        });
        console.log(response)
        if (response.ok) {
          // First API call was successful, now make the second API call
          const secondApiResponse = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/get_submission_list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken.access}`,
            },
          }); if (secondApiResponse.ok) {
            const secondApiData = await secondApiResponse.json();
            // Process the data from the second API call
            dispatch(populateSubmissionList(secondApiData));
            console.log('Second API data:', secondApiData);
          } else {
            console.log('Error occurred in the second API call:', secondApiResponse.status, secondApiResponse.statusText);
          }
        } else {
          console.log('Error occurred in the first API call:', response.status, response.statusText);
        }
      }
      catch(error){
        console.log("Error occured while voting: ",error)
      }
      finally{
        dispatch(hideLoader())
      }
    }
    }
  return (
    <div className="main">
      <div className="submissionContainer">
    <p className="listText">{content}</p>
    </div>
    <DropdownButton id="dropdown-item-button"  title={
          voteStatus === true ? (
            <FaCheck  color={"black"} size={32}/>
          ) : voteStatus === false ? (
            <FaTimes color={"black"} size={32} />
          ) : (
            <PiDotsThreeOutlineVerticalFill color={"black"} style={{fontSize:"24px"}}/>
          )
        }
    >
      {/* style={{fontSize:"32px",color:"#4D4C4C"}} */}
      <Dropdown.ItemText  className="votesCount">{`${votes} Votes`}</Dropdown.ItemText>
      <Dropdown.ItemText className="seperator">----------</Dropdown.ItemText>
      <Dropdown.Item as="button" className="dropButton" onClick={()=>handleVote("Y")}>Vote Yes</Dropdown.Item>
      <Dropdown.Item as="button"  className="dropButton" onClick={()=>handleVote("N")}>Vote No</Dropdown.Item>
    </DropdownButton>
    </div>
  )
})

export default ListItem