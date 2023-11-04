import React,{useEffect, useRef, useState} from 'react'
import "../styles/Sign.css"
import ListItem from '../components/ListItem'
import { useSelector } from 'react-redux';
import {ListItems} from "../DemoData/DemoListItems"
import { useNavigate } from 'react-router';
function Sign() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const Logged_in = useSelector((state) => state.login.Logged_in); 

const navigate=useNavigate();
  const listItemRefs = useRef([]);


const handleFirstCheckbox=()=>{
  if(!Logged_in){
    setRedirectLogin(true);
  }
}

  const handleSecondCheckboxChange=()=>{
    if(Logged_in){
    setIsCheckboxChecked(!isCheckboxChecked);
    listItemRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.alterStatus(isCheckboxChecked);
      }
    });

  }
    else {
      setRedirectLogin(true);
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

        <input type="checkbox" id="check" onChange={handleFirstCheckbox} />
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
        //   ()=>{
        //   setIsCheckboxChecked(!isCheckboxChecked)
        //   listItemRefs.current.forEach((ref) => {
        //     if (ref.current) {
        //       ref.current.alterStatus(isCheckboxChecked); 
        //     }
        //   });
        // }
        handleSecondCheckboxChange
        } checked={isCheckboxChecked}/>
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