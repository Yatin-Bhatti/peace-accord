import React from 'react'
import ListItem from '../components/ListItem'
import "../styles/List.css"
import {ListItems} from "../DemoData/DemoListItems"
function List() {
  return (
   
    <div className="body">
    <div className="listContainer">
    {ListItems.map((item,index)=>{
      return(
        <div style={{display:"flex",margin:"20px"}}>
        <div>{`${index+1}.`}&nbsp;&nbsp;</div>
        <ListItem key={index} content={item.content} votes={item.numberOfVotes}/>
        </div>
      )})}
      </div>
    </div>
    
    
  )
}

export default List