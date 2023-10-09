import { SUBMIT_LOGIN_EMAIL,SUBMIT_LOGIN_PASSWORD } from "./loginTypes";

const initialState={
    Login_email:"",
    Login_password:""
}

 const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case SUBMIT_LOGIN_EMAIL:return{
            ...state,
            Login_email:action.payload
        }
        case SUBMIT_LOGIN_PASSWORD:return{
            ...state,
            Login_password:action.payload
        }
        default:return state
    }
}

export default loginReducer;