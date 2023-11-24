import {put,takeLatest,call} from "redux-saga/effects";
import { REGISTER_REQUEST } from "../register/registerTypes";
import { HIDE_LOADER, SHOW_LOADER } from "../loader/loaderType";
import { SKIP_CONFERMATION } from "../registrationFlow/registrationFlowTypes";


function* registerSaga(action){
    const navigate = action.payload.navigate 
    try{
        yield put({type:SHOW_LOADER})
        const response =yield call(fetch,"https://peace-accord-api-0d93a6880046.herokuapp.com/account/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(action.payload.registerData),
        });
        const data=yield call([response,"json"]);
        
        alert(data.message)
        yield put({type:HIDE_LOADER})
       
        
        if(data.success==="True"){
            yield put({type:SKIP_CONFERMATION})
            window.location.href = "/login"
        }
        
    }catch(error){
        alert("Something went wrong! Please try again");
    }finally{
        yield put({type:HIDE_LOADER})
    }
}

export function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,registerSaga);
}