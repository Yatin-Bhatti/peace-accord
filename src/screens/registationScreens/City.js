import React, { useEffect, useState } from 'react'
import {addCityName} from "../../redux"
import axios from 'axios';
import "../../styles/City.css";
import { connect,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function City(props) {
    const[searchText,setSearchText]=useState("")
    const[showError,setShowError]=useState(true);
    const[suggestions,setSuggestions]=useState([])
    const[decider,setDecider]=useState(false);
    const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register);

    const navigate=useNavigate()
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                if(searchText.trim()!==""){
                  const apiKey="7ffd843118ab4739b0c87532daeac1fa"
                   const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText.trim()}&apiKey=${apiKey}`;
                  // const apiUrl=`https://peace-accord-api-0d93a6880046.herokuapp.com/account/get_city?search=${searchText.trim()}`  in-house api
                    
          const response = await axios.get(apiUrl);
          setSuggestions(response.data.features)
          // setSuggestions(response.data.results); // for in-house api
                }else{
                    setSuggestions([])
                }
            }catch(error){
                   console.error("Error fetching data:",error); 
            }
        }
        if(decider===false)
        fetchData();
    },[searchText,decider])
    // useEffect(()=>{
    //     console.log(suggestions.map((item)=>item.properties.formatted))
    // },[suggestions])

    useEffect(()=>{
      if(searchText.length>=3&&suggestions.length===0){
        setShowError(true)
      } else{
        setShowError(false)
      }
    },[searchText,suggestions])
    

    const handleChange=(e)=>{
        setSearchText(e.target.value)
        if(!e.target.value.includes(",")){
          setDecider(false)
          }
    }
    const handleListItem=(text)=>{
        setSearchText(text)
        setDecider(true)
    }
    const handleAddCity=()=>{
      if (showError) {
        
        return;
      }
      if(searchText.trim()===""){
        setShowError(true)
        return
      }
    
        if(submitData.text!==""&&registerData.email!==""&&registerData.password!==""&&registerData.first_name!==""&&registerData.last_name!==""){
            props.addCityName(searchText.trim())
            navigate("/birthdate")
        }
          else{
            alert("Your registration was interrupted, please enter details before proceeding")
            navigate("/")
          }
        
    }
    const handleFocus=()=>{
      if(!searchText.includes(",")){
      setDecider(false)
      }
    }
  return (
    <div className="cityBody">
        <div className="cityContainer">
        <input className="cityInput" spellCheck="false" value={searchText} placeholder="City you live in..."
         onKeyDown={e =>{ if (e.key === 'Enter') {
          e.preventDefault(); 
          handleAddCity(); 
        }}}
        onChange={handleChange}
        onFocus={handleFocus}
        />
        
        <button className="cityButton" onClick={handleAddCity}>Add</button>
        
        </div>
        {showError&&<div className="errStyle"><p>Please enter a valid city</p></div>}
        <div className="listContainerr">
        <ul className="list" >
          
           {/* {suggestions.map((item,index)=>(
            <li onClick={()=>handleListItem(`${item.city}, ${item.country}`)} key={index}>{`${item.city}, ${item.country}`}</li>
            
           ))}            in case of in-house api*/}  
           {suggestions.map((item,index)=>(
            <li onClick={()=>handleListItem(item.properties.formatted)} key={index}>{item.properties.formatted}</li>
           ))}
          
        </ul>
        </div>
        </div>
  )
}
const mapStateToProps=state=>{
    return {
      cityName:state.register.city
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      addCityName:(text)=>dispatch(addCityName(text)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(City)
// const apiKey="7ffd843118ab4739b0c87532daeac1fa"