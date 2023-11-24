import { ADD_FIRST_NAME } from "./registerTypes";
import { ADD_LAST_NAME,ADD_CITY_NAME,ADD_BIRTH_DATE,ADD_EMPLOYMENT,SUBMIT_PASSWORD,ADD_REGIS_PASSWORD,ADD_REGIS_EMAIL,REGISTER_REQUEST } from "./registerTypes";

export const addRegisEmail=(email)=>{
    return {
        type:ADD_REGIS_EMAIL,
        payload:email
    }
}

export const addRegisPassword=(password)=>{
    return {
        type:ADD_REGIS_PASSWORD,
        payload:password
    }
}

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

// export const registerRequest=(registrationData)=>({
//     type:REGISTER_REQUEST,
//     payload:registrationData,
// });
export const registerRequest = (registerData, navigate) => ({
    type: REGISTER_REQUEST,
    payload: { registerData, navigate }, // Include navigate in the payload
  });