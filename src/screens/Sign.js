import React,{useEffect, useRef, useState} from 'react'
import "../styles/Sign.css"
import ListItem from '../components/ListItem'
import { useSelector,useDispatch } from 'react-redux';
import {ListItems} from "../DemoData/DemoListItems"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { TweenMax,Power3 } from 'gsap';
import { checkFirstBox, checkSecondBox, hideLoader, populateSubmissionList, showLoader, uncheckFirstBox, uncheckSecondBox } from '../redux';
function Sign() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const submissionList=useSelector((state)=>state.submissionList.list);
  const [redirectLogin, setRedirectLogin] = useState(false);
  // const Logged_in = useSelector((state) => state.login.Logged_in); 
  const accessToken=useSelector((state)=>state.loginProcess.token);
  const signCheckboxes=useSelector((state)=>state.signCheckboxes);
const navigate=useNavigate();
const dispatch=useDispatch();
  const listItemRefs = useRef([]);
  let containerRef=useRef(null)
  const handleFirstCheckbox=async(e)=>{
     if(accessToken===null){
      navigate("/email")
      return
     }
     if(e.target.checked){
      const url = 'https://peace-accord-api-0d93a6880046.herokuapp.com/sign';
      const decoded = jwtDecode(accessToken.access);
      const userId =decoded.user_id;
      const currentDate = new Date().toISOString();
      const payload = {
        sign: 'P',
        date_signed: currentDate,
        user: userId,
      };
      try {
        dispatch(showLoader())
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.access}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          const result = await response.json();
          // console.log(result);
          dispatch(checkFirstBox())
        } else {
          console.error('Failed to make the API call');
        }
      } catch (error) {
        console.error('Error during the API call:', error);
      }finally{
        dispatch(hideLoader())
      }
     }else{
      dispatch(uncheckFirstBox())
     }
      
    }
    useEffect(()=>{

      TweenMax.to(
        containerRef,
        1.4,
        {
          opacity:1,
          y:-20,
          ease:Power3.easeOut
        }
      )
        
      },[])

  const handleSecondCheckboxChange=async(e)=>{
   if(accessToken===null){
    navigate("/email")
    return
   }
   if(e.target.checked){
    const url = 'https://peace-accord-api-0d93a6880046.herokuapp.com/sign';
    const decoded = jwtDecode(accessToken.access);
    const userId =decoded.user_id;
    const currentDate = new Date().toISOString();
    const payload = {
      sign: 'S',
      date_signed: currentDate,
      user: userId,
    };
    try {
      dispatch(showLoader())
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.access}`,
          
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        dispatch(checkSecondBox())
      } else {
        console.error('Failed to make the API call');
      }
    } catch (error) {
      console.error('Error during the API call:', error);
    }finally{
      dispatch(hideLoader())
    }
   }else{
    dispatch(uncheckSecondBox())
   }
    
  }
  const callSubmissionList=async()=>{
    try {
     dispatch(showLoader())
      const response = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/get_submission_list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken.access}`,
          'Authorization': accessToken ? `Bearer ${accessToken.access}` : '',
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
  //  if(accessToken){
  //   callSubmissionList();
  //  }
  //   else{
  //     navigate("/login")
  //   }
  callSubmissionList();
    },[])

  // useEffect(() => {
  //   if (redirectLogin) {
  //     navigate('/login');
  //   }
  // }, [redirectLogin, navigate]);
  // useEffect(()=>{
  //   if(submissionList!==null){
  //   console.log(submissionList.results)
  //   }
  // },[submissionList])

  return (
    <div className="signBody">
      <div className="signCont"  ref={el=>{containerRef=el}}>
      {submissionList!==null&&<div style={{
        display: "flex",
        flexDirection: "row",
        marginBottom:"30px"
      }}>

        <input type="checkbox" id="check" onChange={handleFirstCheckbox}
        checked={signCheckboxes.firstBox}
        />
        <label htmlFor="check"></label>
        <div className="labelBack">
        <label className="labelText" htmlFor="check">I WANT PEACE FOR ALL HUMANITY</label>
        </div>
      </div>}
      {submissionList!==null&&<div style={{
        display: "flex",
        flexDirection: "row"
      }}>

        <input type="checkbox" id="secondCheck"
        
        onChange={
        
        handleSecondCheckboxChange
        } 
        checked={signCheckboxes.secondBox}
        />
        <label htmlFor="secondCheck"></label>
        <div className="labelBackSecond" >
        <label className="labelText moreWidth" htmlFor="secondCheck">IF THE PEACE ACCORD WAS THE FOLLOWING, I WOULD SIGN IT</label>
        </div>
        
      </div>}
      <div>
      </div>
      <div className="listContainer">
      {submissionList!==null&&submissionList.results.map((item,index)=>{
        const listItemRef = React.createRef();
        listItemRefs.current.push(listItemRef);
      return(
        <div style={{display:"flex",margin:"20px",marginLeft:"0px",justifyContent:"center"}} key={index}>
        <div>{`${index+1}.`}&nbsp;&nbsp;</div>
        <ListItem key={index} content={item.Submission_text} votes={item.vote_count} ref={listItemRef} id={item.id} accessToken={accessToken} voteStatus={item.vote_status}/>
        </div>
      )})}
        </div>
      </div>

    </div>
  )
}

export default Sign