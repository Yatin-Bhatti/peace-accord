import React,{useEffect, useRef, useState} from 'react'
import "../styles/Sign.css"
import ListItem from '../components/ListItem'
import { useSelector,useDispatch } from 'react-redux';
import {ListItems} from "../DemoData/DemoListItems"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { checkFirstBox, checkSecondBox, hideLoader, showLoader, uncheckFirstBox, uncheckSecondBox } from '../redux';
function Sign() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  // const Logged_in = useSelector((state) => state.login.Logged_in); 
  const accessToken=useSelector((state)=>state.loginProcess.token);
  const signCheckboxes=useSelector((state)=>state.signCheckboxes);
const navigate=useNavigate();
const dispatch=useDispatch();
  const listItemRefs = useRef([]);


// const handleFirstCheckbox=()=>{
//   if(accessToken===null){
//     setRedirectLogin(true);
//   }
// }

  // const handleSecondCheckboxChange=()=>{
  //   if(accessToken){
  //   setIsCheckboxChecked(!isCheckboxChecked);
  //   listItemRefs.current.forEach((ref) => {
  //     if (ref.current) {
  //       ref.current.alterStatus(isCheckboxChecked);
  //     }
  //   });

  // }
  //   else {
  //     setRedirectLogin(true);
  //   }
  // }
  const handleFirstCheckbox=async(e)=>{
    //   console.log(e.target.checked)
    //   if(accessToken){
    //   setIsCheckboxChecked(!isCheckboxChecked);
      
  
    // }
    //   else {
    //     setRedirectLogin(true);
    //   }
     if(accessToken===null){
      navigate("/login")
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
          console.log(result);
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


  const handleSecondCheckboxChange=async(e)=>{
  //   console.log(e.target.checked)
  //   if(accessToken){
  //   setIsCheckboxChecked(!isCheckboxChecked);
    

  // }
  //   else {
  //     setRedirectLogin(true);
  //   }
   if(accessToken===null){
    navigate("/login")
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
        console.log(result);
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

  useEffect(() => {
    if (redirectLogin) {
      navigate('/login');
    }
  }, [redirectLogin, navigate]);

  return (
    <div className="signBody">
      <div className="signCont">
      <div style={{
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
      </div>
      <div style={{
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
        
      </div>
      <div>
      </div>
      <div className="listContainer">
      {ListItems.map((item,index)=>{
        const listItemRef = React.createRef();
        listItemRefs.current.push(listItemRef);
      return(
        <div style={{display:"flex",margin:"20px"}} key={index}>
        <div>{`${index+1}.`}&nbsp;&nbsp;</div>
        <ListItem key={index} content={item.content} votes={item.numberOfVotes} ref={listItemRef}/>
        </div>
      )})}
        </div>
      </div>

    </div>
  )
}

export default Sign