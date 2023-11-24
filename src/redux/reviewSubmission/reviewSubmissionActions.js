import { POPULATE_REVIEW_SUBMISSION, REVIEW_COUNTER_INCREMENT } from "./reviewSubmissionTypes";

export const populateReviewSubmission=(result)=>{
    return {
        type:POPULATE_REVIEW_SUBMISSION,
        payload:result
    }
}

export const reviewCounterIncrement=()=>{
    return {
        type:REVIEW_COUNTER_INCREMENT
    }
}