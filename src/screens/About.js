import React,{useEffect,useRef} from 'react'
import "../styles/About.css"
import { TweenMax,Power3,} from 'gsap';
import { Helmet } from 'react-helmet';
function About() {
  let containerRef=useRef(null)
  useEffect(()=>{

    TweenMax.to(
      containerRef,
      1,
      {
        opacity:1,
        y:-20,
        ease:Power3.easeOut
      }
    )
      
    },[])
  return (
    <div className="aboutContainer">
       <Helmet>
        <title>About</title>
        <meta
        name="description"
        content="Users can see a scrollable About Info."
        />
        <meta
        name="keywords" content="About, Peace, description, information"
        />
      </Helmet>
      <div className="textContainer">
        <div className="content" ref={el=>{containerRef=el}} >
      <p>WHO?</p>
      <br></br>
      <p>The Peace Accord is for human beings who want peace on earth.</p>
      <br></br>
      <p>WHAT?</p>
      <br></br>
      <p>The Peace Accord is an exercise in collective curiosity. It  asks three questions:</p>
      <br></br>
      <p>1.&nbsp;How many people are interested in peace?</p>
      <p>2.&nbsp;What would a peace agreement look like?</p>
      <p>3.&nbsp;Will you participate?</p>
      <br></br>
      <p>WHY?</p>
      <br></br>
      <p>The goal is an elegantly powerful accord that people want to participate in.</p>
      <br></br>
      <p>HOW?</p>
      <br></br>
      <p>You are invited to contribute by:</p>
      <br></br>
      <p>Contribute a part of the accord.<br/>
      Just submit and see what happens.</p>
      <br></br>
      <p>What would peace look like for you?</p>
      <br></br>
      <p>Review your favorite entries that you would agree to sign. Don’t worry. You can change this later. </p>
      </div>
      </div>
    </div>
  )
}

export default About