import { POPULATE_SUBMISSION_LIST } from "./submissionListTypes";

export const populateSubmissionList=(result)=>{
    return {
        type:POPULATE_SUBMISSION_LIST,
        payload:result
    }
}