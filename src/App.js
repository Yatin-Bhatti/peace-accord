import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider, useSelector,useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { showLoader,hideLoader, loginSuccess,updateToken,updateTokenRequest, resetState } from "./redux";
// import Home from "./screens/Home";
// import Data from "./screens/Data";
// import List from "./screens/List";
// import About from "./screens/About";
// import Sign from "./screens/Sign";
// import Login from "./screens/Login";
// import Name from "./screens/registationScreens/Name";
// import City from "./screens/registationScreens/City";
// import BirthDate from "./screens/registationScreens/BirthDate";
// import Employment from "./screens/registationScreens/Employment";
// import Password from "./screens/registationScreens/Password";
// import Review from "./screens/Review";
import {DemoReviewData} from "../src/DemoData/DemoReviewData"
// import LoginPassword from "./screens/LoginPassword";
// import ForgotPassword from "./screens/ForgotPassword";
// import ForgotPasswordNotice from "./screens/ForgotPasswordNotice";
import Backdrop from '@mui/material/Backdrop';
import store from "./redux/store";
import NewPassword from "./screens/NewPassword";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState,lazy,Suspense,CSSProperties } from "react";
import { useLocation } from 'react-router-dom';
import EditSubmission from "./screens/EditSubmission";
import { UPDATE_TOKEN } from "./redux/loginProcess/loginProcessTypes";
const Home=lazy(()=>import("./screens/Home"));
const Data=lazy(()=>import("./screens/Data"));
const List=lazy(()=>import("./screens/List"));
const About=lazy(()=>import("./screens/About"));
const Sign=lazy(()=>import("./screens/Sign"));
const Login=lazy(()=>import("./screens/Login"));
const Review=lazy(()=>import("./screens/Review"));
const Name=lazy(()=>import("./screens/registationScreens/Name"));
const City=lazy(()=>import("./screens/registationScreens/City"));
const BirthDate=lazy(()=>import("./screens/registationScreens/BirthDate"));
const Employment=lazy(()=>import("./screens/registationScreens/Employment"));
const Password=lazy(()=>import("./screens/registationScreens/Password"));
const LoginPassword=lazy(()=>import("./screens/LoginPassword"));
const ForgotPassword=lazy(()=>import("./screens/ForgotPassword"));
const ForgotPasswordNotice=lazy(()=>import("./screens/ForgotPasswordNotice"));
const FallbackComponent=lazy(()=>import("./components/FallbackComponent"))
const Email=lazy(()=>import("./screens/registationScreens/Email"))
function App() {
  const isLoaderVisible=useSelector((state)=>state.loader.isLoaderVisible);
  const skipConformation=useSelector((state)=>state.registerFlow.skipConformation);
  const [loading,setLoading]=useState(true);
  const token=useSelector((state)=>state.loginProcess.token)
  const location=useLocation();
  const dispatch=useDispatch();
 const navigate=useNavigate();
 const isPasswordResetRoute = location.pathname === '/newpassword';
  let updateTokenFunction=async ()=>{
    let response =await fetch("https://peace-accord-api-0d93a6880046.herokuapp.com/account/token/refresh/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"refresh":token.refresh})
    })
    let data= await response.json();
    // console.log(data)
    // console.log(response)
    if(response.status===200){
   dispatch(updateToken(data.access))
   const authTokens = JSON.parse(localStorage.getItem("authTokens"));
   localStorage.setItem("authTokens", JSON.stringify({ ...authTokens, access: data.access }));
    }
    else{
      localStorage.removeItem("authTokens");
      localStorage.removeItem("userInfo");
      dispatch(resetState());
      navigate("./login")
    }
  }
  useEffect(()=>{
    const storedToken = localStorage.getItem("authTokens");
    const userInfo = localStorage.getItem("userInfo")
    if (storedToken&&userInfo) {
      dispatch(loginSuccess({ token: JSON.parse(storedToken), name: JSON.parse(userInfo).name }));
    }
  },[])
  useEffect(()=>{
    if(token){
      updateTokenFunction();
    }
  },[])
useEffect(()=>{
  let fiveMinutes=1000*60*5;
 let interval =setInterval(()=>{
    if(token){
     
      updateTokenFunction();
    }
  },fiveMinutes)
  return ()=>clearInterval(interval);


},[token])


  useEffect(() => {
  
    const confirmUnload = (e) => {
      if(skipConformation){
      e.preventDefault();
      e.returnValue = 'All the progress will be lost. Are you sure you want to refresh?';
      // showCustomModal();
    };
  }

    if (
      ['/password', '/name', '/city', '/birthdate', '/employment','/login','newpassword' ].includes(location.pathname)
    ) {
      // console.log(true)
      window.addEventListener('beforeunload', confirmUnload,{capture: true});
    }

   
    return () => {
      if (
        ['/password', '/name', '/city', '/birthdate', '/employment','/login','newpassword'].includes(location.pathname)
      ) {
        window.removeEventListener('beforeunload', confirmUnload,{capture: true});
      }
    };
  }, [location,skipConformation]);
  

  return (
    <Provider store={store}>
    <div className="App">
      
      <Suspense fallback={<FallbackComponent/>}>
      {!isPasswordResetRoute && <Navbar />}
      <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoaderVisible}
>
  <CircularProgress color="inherit" />
</Backdrop>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review data={DemoReviewData}/>}/>
        <Route path="/list" element={<List />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/data" element={<Data />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/name" element={<Name/>}/>
        <Route path="/city" element={<City/>}/>
        <Route path="/birthdate" element={<BirthDate/>} />
        <Route path="/employment" element={<Employment/>} />
        <Route path="/password" element={<Password/>}/>
        <Route path="/loginpassword" element={<LoginPassword/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/forgotpasswordnotice" element={<ForgotPasswordNotice/>}/>
        <Route path="/newpassword" element={<NewPassword/>}/>
        <Route path="/editSubmission" element={<EditSubmission/>} />
        <Route path="/email" element={<Email/>}/>
      </Routes>
      </Suspense>
    </div>
    </Provider>
  );
}

export default App;
