import { SUBMIT_EMAIL, SUBMIT_PASSWORD, SUBMIT_TEXT } from "./submissionTypes"

const initialState={
    text:"",
    email:"",
    password:""
}

const submitReducer=(state=initialState,action)=>{
    switch(action.type){
        case SUBMIT_TEXT:return {
            ...state,
            text: action.payload
        }
        case SUBMIT_EMAIL:return{
            ...state,
            email:action.payload
        }
        case SUBMIT_PASSWORD:return{
            ...state,
            password:action.payload
        }
        
        default :return state
    }
}

export default submitReducer;