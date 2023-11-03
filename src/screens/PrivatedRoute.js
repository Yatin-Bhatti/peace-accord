import { Route, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute=({path,component:Component,requiredData,...rest})=>{
const navigate=useNavigate();
const submitData= useSelector((state)=>state.submit);
if(submitData.text=""){
    navigate("/");
    return null;
}
return <Route path={path} element={<Component/>} {...rest}/>
}

export default PrivateRoute;