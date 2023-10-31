import React from 'react'
import "../styles/Review.css"
import { nextReview } from '../redux'
import { connect } from 'react-redux'
function Review(props) {
    const handleClick=()=>{
        props.nextReview();
    }
  return (
    <div className="rewBody">
        <div className="allCont">
        <div className="textContainerr">
        {/* <div>{`${props.counter+1}.`}&nbsp;&nbsp;</div> */}
      <p> {` ${ props.counter+1}.  ${props.data[props.counter].text}`} </p> 
        </div>
        <div className="buttonsContainer">
            <div className="setOne">
        <button className="rewButton" onClick={handleClick} disabled={props.counter===props.data.length-1}>No</button>
        <button className="rewButton" onClick={handleClick} disabled={props.counter===props.data.length-1}>Yes</button>
        </div>
        <div className="setTwo" >
        <button className="rewButton" onClick={handleClick} disabled={props.counter===props.data.length-1}>Skip</button>
        <button className="rewButton" onClick={handleClick} disabled={props.counter===props.data.length-1}>Edit</button>
        </div>
        </div>
        </div>
        </div>
  )
}
const mapStateToProps=state=>{
    return{
        counter:state.review.counter
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        nextReview:()=>dispatch(nextReview())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Review)