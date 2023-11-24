import { POPULATE_REVIEW_SUBMISSION,REVIEW_COUNTER_INCREMENT } from "./reviewSubmissionTypes";

const initialState={
reviewList:null,
counter:0
}

const reviewSubmissionReducer=(state=initialState,action)=>{
switch(action.type){
    case POPULATE_REVIEW_SUBMISSION:return{
        ...state,
        reviewList:action.payload
    };
    case REVIEW_COUNTER_INCREMENT:return{
        ...state,
        counter:state.counter+1
    }
    default:return state
}
}

export default reviewSubmissionReducer;