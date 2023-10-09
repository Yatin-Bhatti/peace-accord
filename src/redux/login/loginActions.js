import { SUBMIT_LOGIN_EMAIL,SUBMIT_LOGIN_PASSWORD } from "./loginTypes";

export const submitEmailLogin=(email)=>{
    return {
        type:SUBMIT_LOGIN_EMAIL,
        payload:email
    }
}
export const submitPasswordLogin=(password)=>{
    return {
        type:SUBMIT_LOGIN_PASSWORD,
        payload:password
    }
}