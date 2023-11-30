import { CHECK_FIRST_BOX,UNCHECK_FIRST_BOX,CHECK_SECOND_BOX,UNCHECK_SECOND_BOX } from "./signCheckboxTypes";

export const checkFirstBox=(()=>{
    return {
        type:CHECK_FIRST_BOX
    }
})
export const uncheckFirstBox=(()=>{
    return {
        type:UNCHECK_FIRST_BOX
    }
})
export const checkSecondBox=(()=>{
    return {
        type:CHECK_SECOND_BOX
    }
})

export const uncheckSecondBox=(()=>{
    return {
        type:UNCHECK_SECOND_BOX
    }
})
