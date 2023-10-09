import { NEXT_REVIEW } from "./ReviewTypes";

const initialState={
    counter:0,
}

const reviewReducer=(state=initialState,action)=>{
    switch(action.type){
        case NEXT_REVIEW:return{
            ...state,
            counter:state.counter+1
        }
        default:return state;
    }
}

export default reviewReducer;