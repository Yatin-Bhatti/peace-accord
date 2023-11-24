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
    const submitData=useSelector((state)=>state.submit);
    const registerData=useSelector((state)=>state.register);
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                if(searchText.trim()!==""){
                    const apiKey="7ffd843118ab4739b0c87532daeac1fa"
                    const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${apiKey}`;
          const response = await axios.get(apiUrl);
          setSuggestions(response.data.features);
                }else{
                    setSuggestions([])
                }
            }catch(error){
                   console.error("Error fetching data:",error); 
            }
        }
        fetchData();
    },[searchText])
    useEffect(()=>{
        console.log(suggestions.map((item)=>item.properties.formatted))
    },[suggestions])

    useEffect(()=>{
      if(searchText.length>=3&&suggestions.length===0){
        setShowError(true)
      } else{
        setShowError(false)
      }
    },[searchText,suggestions])

    const handleChange=(e)=>{
        setSearchText(e.target.value)
    }
    const handleListItem=(text)=>{
        setSearchText(text)
    }
    const handleAddCity=()=>{
      if (showError) {
        
        return;
      }
    
        if(searchText.trim()!==""&&submitData.text!==""&&registerData.email!==""&&registerData.password!==""&&registerData.first_name!==""&&registerData.last_name!==""){
            props.addCityName(searchText)
            navigate("/birthdate")
        }
          else{
            alert("Your registration was interrupted, please enter details before proceeding")
            navigate("/")
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
        onChange={handleChange}/>
        
        <button className="cityButton" onClick={handleAddCity}>Add</button>
        
        </div>
        {showError&&<div className="errStyle"><p>Please enter a valid city</p></div>}
        <div className="listContainerr">
        <ul className="list" >
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