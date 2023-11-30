import { POPULATE_DATA } from "./dataTypes";

const initialState={
    data:null
}

const dataReducer=(state=initialState,action)=>{
switch(action.type){
    case POPULATE_DATA:return{
        ...state,
        data:action.payload
    }
    default :return state
}
}
export default dataReducer;