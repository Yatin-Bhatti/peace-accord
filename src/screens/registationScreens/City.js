import React, { useEffect, useState } from 'react'
import {addCityName} from "../../redux"
import axios from 'axios';
import "../../styles/City.css";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
function City(props) {
    const[searchText,setSearchText]=useState("")
    const[suggestions,setSuggestions]=useState([])
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

    const handleChange=(e)=>{
        setSearchText(e.target.value)
    }
    const handleListItem=(text)=>{
        setSearchText(text)
    }
    const handleAddCity=()=>{
        if(searchText.trim()!==""){
            props.addCityName(searchText)
            navigate("/birthdate")
        }
    }
  return (
    <div className="cityBody">
        <div className="cityContainer">
        <input className="cityInput" spellCheck="false" value={searchText} placeholder="City you live in..." onChange={handleChange}/>
        <button className="cityButton" onClick={handleAddCity}>Add</button>
        
        </div>
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