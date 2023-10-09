import { ADD_FIRST_NAME } from "./registerTypes";
import { ADD_LAST_NAME,ADD_CITY_NAME,ADD_BIRTH_DATE,ADD_EMPLOYMENT,SUBMIT_PASSWORD } from "./registerTypes";

export const addFirstName=(firstName)=>{
    return {
        type:ADD_FIRST_NAME,
        payload:firstName
    }
}
export const addLastName=(lastName)=>{
    return {
        type:ADD_LAST_NAME,
        payload:lastName
    }
}

export const addCityName=(cityName)=>{
    return {
        type:ADD_CITY_NAME,
        payload:cityName
    }
}
export const addBirthDate=(birthdate)=>{
    return {
        type:ADD_BIRTH_DATE,
        payload:birthdate
    }
}
export const addEmployment=(employment)=>{
    return {
        type:ADD_EMPLOYMENT,
        payload:employment
    }
}
