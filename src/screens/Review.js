import React, { useEffect,useRef } from 'react'
import "../styles/Review.css"
import { hideLoader, nextReview, populateReviewSubmission, reviewCounterIncrement, showLoader } from '../redux'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { TweenMax,Power3 } from 'gsap';
import { jwtDecode } from "jwt-decode";
import { Helmet } from 'react-helmet';
function Review(props) {

    const dispatch=useDispatch();
 const navigate=useNavigate();
    const reviewList=useSelector((state)=>state.reviewSubmission.reviewList);
    const accessToken=useSelector((state)=>state.loginProcess.token);
   
    let containerRef=useRef(null)
    const callReviewSubmission=async()=>{
        try {
         dispatch(showLoader())
          const response = await fetch("https://peace-accord-api-0d93a6880046.herokuapp.com/submission/get_submissions", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken.access}`,
            },
          });
      
          
          if (response.ok) {
            
            const data = await response.json();
      
            
            dispatch(populateReviewSubmission(data));
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
        if(accessToken){
         callReviewSubmission();
        }
         else{
           const storedToken = localStorage.getItem("authTokens");
           if(!storedToken){
             navigate("/login")
           }
         }
         },[accessToken])
        //  useEffect(()=>{
        //     if(reviewList!==null){
        //     console.log(reviewList.results)}
        //  },[reviewList])
         useEffect(()=>{

          TweenMax.to(
            containerRef,
            0.8,
            {
              opacity:1,
              y:-20,
              ease:Power3.easeOut
            }
                      )
            
          },[])
         const ReviewComponent=()=>{
          const reviewCounter = useSelector((state) => state.reviewSubmission.counter);
          const reviewList = useSelector((state) => state.reviewSubmission.reviewList);
        
          if (!reviewList || !reviewList.results || reviewList.results.length === 0) {
            return null; // Return early if reviewList or its results are null or empty
          }
        
          const submissionId = reviewList.results[reviewCounter]?.id;
        
          if (!submissionId) {
            console.error("Invalid submissionId");
            return null;
          }
        
            // const reviewCounter=useSelector((state)=>state.reviewSubmission.counter);
            
            // const submissionId=useSelector((state)=>state.reviewSubmission.reviewList.results[reviewCounter].id)
            
           const handleClick=()=>{
            dispatch(reviewCounterIncrement())
           }
          const handleVote=async(text)=>{
            const decoded = jwtDecode(accessToken.access);
      const userId =decoded.user_id;
      const currentDate = new Date().toISOString();
      const vote=text;
      const payload={
        "vote":vote,
        "date_voted":currentDate,
        "submission":submissionId,
        "user":userId
      }
      try{
        dispatch(showLoader())
        const response = await fetch('https://peace-accord-api-0d93a6880046.herokuapp.com/submission/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.access}`,
          },
          body: JSON.stringify(payload),
        });
        // console.log(response)
        const jsonResponse = await response.json();
        if(jsonResponse.success ==true){
          if(reviewCounter<reviewList.results.length-1){
          dispatch(reviewCounterIncrement())
        }
        else{
          return
        }
      }
      else if(jsonResponse.Failed === 'user already voted'){
        alert("user already voted")
      }
    }
      catch(error){
        console.log("Error occured while voting: ",error)
      }
      finally{
        dispatch(hideLoader())
      }
          }

           const handleEditClick=()=>{
            const submissionText = reviewList.results[reviewCounter].Submission_text;
            navigate(`/editSubmission?submissionText=${encodeURIComponent(submissionText)}`);
           }
            return <>{reviewList!==null&&<><div className="textContainerr">
          <p> {`${reviewCounter+1}. ${reviewList.results[reviewCounter].Submission_text}`} </p> 
            </div>
            <div className="buttonsContainer">
                <div className="setOne">
            <button className="rewButton" onClick={()=>handleVote("N")} >No</button>
            <button className="rewButton" onClick={()=>handleVote("Y")} >Yes</button>
            </div>
            <div className="setTwo" >
            <button className="rewButton" onClick={handleClick} disabled={reviewCounter===reviewList.results.length-1}>Skip</button>
            <button className="rewButton" onClick={handleEditClick}>Edit</button>
            </div>
            </div>
            </>}
            </>
         }

  return (
    <div className="rewBody">
      <Helmet>
        <title>Review</title>
        <meta
        name="description"
        content=" Users can review submissions and vote on them, skip, or edit submission."
        />
        <meta
        name="keywords" content="Review submission, Review"
        />
      </Helmet>
        <div className="allCont" ref={el=>{containerRef=el}}>
            <ReviewComponent/>
        
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