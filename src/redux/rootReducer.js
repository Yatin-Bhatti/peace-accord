import { combineReducers } from "redux";
import submitReducer from "./submission/submitReducer";
import registerReducer from "./register/registerReducer";
import reviewReducer from "./review/ReviewReducer";
import loginReducer from "./login/loginReducer";
const rootReducer=combineReducers({
    register:registerReducer,
    submit:submitReducer,
    review:reviewReducer,
    login:loginReducer
})

export default rootReducer;