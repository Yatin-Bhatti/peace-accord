import React from 'react'
import "../styles/Sign.css"
import ListItem from '../components/ListItem'
import {ListItems} from "../DemoData/DemoListItems"
function Sign() {
  return (
    <div className="signBody">
      <div className="signCont">
      <div style={{
        display: "flex",
        flexDirection: "row",
        marginBottom:"30px"
      }}>

        <input type="checkbox" id="check" />
        <label for="check"></label>
        <div className="labelBack">
        <label className="labelText" for="check">I WANT PEACE FOR ALL HUMANITY</label>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row"
      }}>

        <input type="checkbox" id="secondCheck" />
        <label for="secondCheck"></label>
        <div className="labelBack" >
        <label className="labelText" for="secondCheck">IF THE PEACE ACCORD WAS THE FOLLOWING, I WOULD SIGN IT</label>
        </div>
        
      </div>
      <div>
      </div>
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

    </div>
  )
}

export default Sign