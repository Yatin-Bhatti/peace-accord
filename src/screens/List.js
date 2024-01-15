import React, { useEffect, useRef } from 'react'
import ListItem from '../components/ListItem'
import "../styles/List.css"
import {ListItems} from "../DemoData/DemoListItems"
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, populateSubmissionList, showLoader } from '../redux'
import { useNavigate } from 'react-router-dom'
import { TweenMax,Power3 } from 'gsap';
function List() {
const dispatch=useDispatch();
const navigate=useNavigate();
const submissionList=useSelector((state)=>state.submissionList.list);
const accessToken=useSelector((state)=>state.loginProcess.token);
let containerRef=useRef(null)
const callSubmissionList=async()=>{
  try {
   dispatch(showLoader())
    const response = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/get_submission_list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.access}`,
      },
    });

    
    if (response.ok) {
      
      const data = await response.json();

      
      dispatch(populateSubmissionList(data));
    } else {
    
      console.error('Failed to fetch submission list:', response.statusText);
     
    }
  } catch (error) {
    console.error('Error during submission list fetch:', error);
    
  }finally{
    dispatch(hideLoader())
  }
}
  useEffect(()=>{
 if(accessToken){
  callSubmissionList();
 }
  else{
    const storedToken = localStorage.getItem("authTokens");
    if(!storedToken){
      navigate("/login")
    }
  }
  },[accessToken])
  
  useEffect(()=>{

    TweenMax.to(
      containerRef,
      1,
      {
        opacity:1,
        y:-20,
        ease:Power3.easeOut
      }
    )
      
    },[])
  // useEffect(()=>{
  //   if(submissionList!==null){
  //   console.log(submissionList.results)
  //   }
  // },[submissionList])
  return (
   
    <div className="body">
    <div className="listContainerrr" ref={el=>{containerRef=el}}>
    {submissionList!==null&&submissionList.results.map((item,index)=>{
      return(
        <div style={{display:"flex",margin:"20px"}} key={index}>
          {index===0?<div className="numbering">{`${index+1}.`}&nbsp;&nbsp;&nbsp;</div>:<div className="numbering">{`${index+1}.`}&nbsp;&nbsp;</div>}
        
        <ListItem key={index} content={item.Submission_text} votes={item.vote_count} id={item.id} accessToken={accessToken} voteStatus={item.vote_status}/>
        </div>
      )})}
      </div>
    </div>
    
    
  )
}

export default List