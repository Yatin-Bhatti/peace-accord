import React, { useEffect,useRef } from 'react'
import "../styles/Data.css"
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, populateData, showLoader } from '../redux';
import { useNavigate } from 'react-router-dom';
import { TweenMax,Power3 } from 'gsap';
function Data() {
  const accessToken=useSelector((state)=>state.loginProcess.token);
  const data=useSelector((state)=>state.data.data)
const dispatch=useDispatch();
const navigate=useNavigate();
let containerRef=useRef(null)
  const callData=async()=>{
    try {
     dispatch(showLoader())
      const response = await fetch("https://peace-accord-api-0d93a6880046.herokuapp.com/account/get_data", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.access}`,
        },
      });
  
      
      if (response.ok) {
        
        const data = await response.json();
  
        
        dispatch(populateData(data));
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
     callData();
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
        1.2,
        {
          opacity:1,
          y:-20,
          ease:Power3.easeOut
        }
      )
        
      },[])
     useEffect(()=>{
      console.log(data)
     },[data])
  return (
    <div className="dataContainer" >
      {data!==null&&<div className="dataBox" ref={el=>{containerRef=el}} >
      <p className="singleData1">Total Participants: &nbsp;&nbsp;&nbsp;{data.total_participants}</p>
      <p className="singleData2">Total Submissions: &nbsp;&nbsp;&nbsp;{data.total_submissions}</p>
      <p className="singleData3">Total Signed: &nbsp;&nbsp;&nbsp;{data.total_signed}</p>
      <p className="singleData4">Total Cities Represented: &nbsp;&nbsp;&nbsp;{data.total_cities}</p>

      </div>}
      </div>
  )
}

export default Data