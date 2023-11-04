import { SUBMIT_LOGIN_EMAIL,SUBMIT_LOGIN_PASSWORD,LOGIN } from "./loginTypes";

const initialState={
    Login_email:"",
    Login_password:"",
    Logged_in:false
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
        case LOGIN:return{
            ...state,
            Logged_in:true
        }
        default:return state
    }
}

export default loginReducer;