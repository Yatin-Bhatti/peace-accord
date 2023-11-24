import React, { useEffect } from 'react'
import ListItem from '../components/ListItem'
import "../styles/List.css"
import {ListItems} from "../DemoData/DemoListItems"
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, populateSubmissionList, showLoader } from '../redux'
import { useNavigate } from 'react-router-dom'
function List() {
const dispatch=useDispatch();
const navigate=useNavigate();
const submissionList=useSelector((state)=>state.submissionList.list);
const accessToken=useSelector((state)=>state.loginProcess.token);
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
    navigate("/login")
  }
  },[])
  useEffect(()=>{
    if(submissionList!==null){
    console.log(submissionList.results)
    }
  },[submissionList])
  return (
   
    <div className="body">
    <div className="listContainerrr">
    {submissionList!==null&&submissionList.results.map((item,index)=>{
      return(
        <div style={{display:"flex",margin:"20px"}} key={index}>
          {index===0?<div className="numbering">{`${index+1}.`}&nbsp;&nbsp;&nbsp;</div>:<div className="numbering">{`${index+1}.`}&nbsp;&nbsp;</div>}
        
        <ListItem key={index} content={item.Submission_text} votes="25"/>
        </div>
      )})}
      </div>
    </div>
    
    
  )
}

export default List