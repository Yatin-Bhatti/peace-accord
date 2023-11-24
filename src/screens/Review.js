import React, { useEffect } from 'react'
import "../styles/Review.css"
import { hideLoader, nextReview, populateReviewSubmission, reviewCounterIncrement, showLoader } from '../redux'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Review(props) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
 
    const reviewList=useSelector((state)=>state.reviewSubmission.reviewList);
    const accessToken=useSelector((state)=>state.loginProcess.token);
   

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
           navigate("/login")
         }
         },[])
         useEffect(()=>{
            if(reviewList!==null){
            console.log(reviewList.results)}
         },[reviewList])

         const ReviewComponent=()=>{
            const reviewCounter=useSelector((state)=>state.reviewSubmission.counter);

           const handleClick=()=>{
            dispatch(reviewCounterIncrement())
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
            <button className="rewButton" onClick={handleClick} disabled={reviewCounter===reviewList.results.length-1}>No</button>
            <button className="rewButton" onClick={handleClick} disabled={reviewCounter===reviewList.results.length-1}>Yes</button>
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
        <div className="allCont">
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