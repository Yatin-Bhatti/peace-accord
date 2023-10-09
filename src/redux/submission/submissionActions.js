import { SUBMIT_TEXT } from "./submissionTypes"
import { SUBMIT_EMAIL,SUBMIT_PASSWORD } from "./submissionTypes"
export const submitText=(text)=>{
    return {
        type:SUBMIT_TEXT,
        payload:text
    }
}

export const submitEmail=(email)=>{
    return {
        type:SUBMIT_EMAIL,
        payload:email
    }
}
export const submitPassword=(password)=>{
    return {
        type:SUBMIT_PASSWORD,
        payload:password
    }
}