import { POPULATE_SUBMISSION_LIST } from "./submissionListTypes";

const initialState={
   list:null
}

const submissionListReducer=(state=initialState,action)=>{
    switch(action.type){
        case POPULATE_SUBMISSION_LIST:return {
            ...state,
            list: action.payload
        }
        
        default :return state
    }
}

export default submissionListReducer;
