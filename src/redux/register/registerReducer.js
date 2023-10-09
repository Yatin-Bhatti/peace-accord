import { ADD_FIRST_NAME, ADD_LAST_NAME,ADD_CITY_NAME, ADD_BIRTH_DATE,ADD_EMPLOYMENT,SUBMIT_PASSWORD } from "./registerTypes"

const initialState={
    firstName:"",
    lastName:"",
    city:"",
    birthDate:"",
    employment:"",
}

const registerReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_FIRST_NAME:return{
            ...state,
            firstName:action.payload
        }
        case ADD_LAST_NAME:return{
            ...state,
            lastName:action.payload
        }
        case ADD_CITY_NAME:return{
            ...state,
            city:action.payload
        }
        case ADD_BIRTH_DATE:return{
            ...state,
            birthDate:action.payload
        }
        case ADD_EMPLOYMENT:return{
            ...state,
            employment:action.payload
        }
        default:return state
    }
}

export default registerReducer;