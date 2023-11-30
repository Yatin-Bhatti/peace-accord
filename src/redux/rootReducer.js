import { combineReducers } from "redux";
import submitReducer from "./submission/submitReducer";
import registerReducer from "./register/registerReducer";
import reviewReducer from "./review/ReviewReducer";
import loginReducer from "./login/loginReducer";
import loaderReducer from "./loader/loaderReducer";
import loginProcessReducer from "./loginProcess/loginProcessReducer";
import registrationFlowReducer from "./registrationFlow/registraionFlowReducer"
import submissionListReducer from "./submissionList/submissionListReducer";
import reviewSubmissionReducer from "./reviewSubmission/reviewSubmissionReducer";
import dataReducer from "./data/dataReducer";
import signCheckboxReducer from "./signCheckboxes/signCheckboxReducer";
const rootReducer=combineReducers({
    register:registerReducer,
    submit:submitReducer,
    review:reviewReducer,
    login:loginReducer,
    loader:loaderReducer,
    loginProcess:loginProcessReducer,
    registerFlow:registrationFlowReducer,
    submissionList:submissionListReducer,
    reviewSubmission:reviewSubmissionReducer,
    data:dataReducer,
    signCheckboxes:signCheckboxReducer
})

export default rootReducer;