import {SHOW_LOADER,HIDE_LOADER} from "./loaderType"

const initialState={
    isLoaderVisible:false
}

const loaderReducer=(state=initialState,action)=>{
switch(action.type){
    case SHOW_LOADER:return{
        isLoaderVisible:true
    }
    case HIDE_LOADER:return{
        isLoaderVisible:false
    }
    default:return state
}
}
export default loaderReducer