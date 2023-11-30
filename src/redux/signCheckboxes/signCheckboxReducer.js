import { UNCHECK_FIRST_BOX,CHECK_FIRST_BOX,UNCHECK_SECOND_BOX,CHECK_SECOND_BOX } from "./signCheckboxTypes";

const initialState={
    firstBox:false,
    secondBox:false
}

const signCheckboxReducer=(state=initialState,action)=>{
switch(action.type){
    case CHECK_FIRST_BOX:return{
        ...state,
        firstBox:true,
    }
    case UNCHECK_FIRST_BOX:return{
        ...state,
        firstBox:false
    }
    case CHECK_SECOND_BOX:return{
        ...state,
        secondBox:true,
    }
    case UNCHECK_SECOND_BOX:return{
        ...state,
        secondBox:false,
    }
    default:
        return state; 
}
}

export default signCheckboxReducer