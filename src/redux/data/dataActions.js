import { POPULATE_DATA } from "./dataTypes";

export const populateData=(result)=>{
    return {
        type:POPULATE_DATA,
        payload:result
    }
}