import {OPEN_REGISTRATION_FLOW,CLOSE_REGISTRATION_FLOW,SKIP_CONFERMATION,DONT_SKIP_CONFERMATION} from "./registrationFlowTypes";

export const openRegistrationFlow=(()=>{
    return {
        
        type:OPEN_REGISTRATION_FLOW,
    }
})
export const closeRegistrationFlow=(()=>{
    return {
        
        type:CLOSE_REGISTRATION_FLOW,
    }
})
export const skipConfirmation=(()=>{
    return {
       
        type:SKIP_CONFERMATION,
    }
})
export const dontSkipConfirmation=(()=>{
    return {
        
        type:DONT_SKIP_CONFERMATION,
    }
})