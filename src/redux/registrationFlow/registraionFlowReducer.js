import {OPEN_REGISTRATION_FLOW,CLOSE_REGISTRATION_FLOW,SKIP_CONFERMATION,DONT_SKIP_CONFERMATION} from "./registrationFlowTypes"

const initialState={
    isRegistrationFlowOpen:false,
    skipConformation:false
}

const registrationFlowReducer=(state=initialState,action)=>{
switch(action.type){
    case OPEN_REGISTRATION_FLOW:return{
        ...state,
        isRegistrationFlowOpen:true
    }
    case CLOSE_REGISTRATION_FLOW:return{
        ...state,
        isRegistrationFlowOpen:false
    }
    case SKIP_CONFERMATION:return{
        ...state,
        skipConformation:true
    }
    case DONT_SKIP_CONFERMATION:return{
        ...state,
        skipConformation:false
    }
    default:return state
}
}
export default registrationFlowReducer