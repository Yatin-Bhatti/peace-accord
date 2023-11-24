import { ADD_REGIS_EMAIL,ADD_FIRST_NAME, ADD_LAST_NAME,ADD_CITY_NAME, ADD_BIRTH_DATE,ADD_EMPLOYMENT,ADD_REGIS_PASSWORD } from "./registerTypes"

const initialState={
    email:"",
    password:"",
    first_name:"",
    last_name:"",
    city:"",
    date_of_birth:"",
    employed:""
    
}

const registerReducer=(state=initialState,action)=>{
    switch(action.type){

        case ADD_REGIS_EMAIL:return{
            ...state,
            email:action.payload
        }
        case ADD_REGIS_PASSWORD:return{
            ...state,
            password:action.payload
        }
        case ADD_FIRST_NAME:return{
            ...state,
            first_name:action.payload
        }
        case ADD_LAST_NAME:return{
            ...state,
            last_name:action.payload
        }
        case ADD_CITY_NAME:return{
            ...state,
            city:action.payload
        }
        case ADD_BIRTH_DATE:return{
            ...state,
            date_of_birth:action.payload
        }
        case ADD_EMPLOYMENT:return{
            ...state,
            employed:action.payload
        }
        default:return state
    }
}

export default registerReducer;