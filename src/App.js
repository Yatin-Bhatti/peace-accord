import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Data from "./screens/Data";
import List from "./screens/List";
import About from "./screens/About";
import Sign from "./screens/Sign";
import Login from "./screens/Login";
import Name from "./screens/registationScreens/Name";
import City from "./screens/registationScreens/City";
import BirthDate from "./screens/registationScreens/BirthDate";
import Employment from "./screens/registationScreens/Employment";
import Password from "./screens/registationScreens/Password";
import Review from "./screens/Review";
import {DemoReviewData} from "../src/DemoData/DemoReviewData"
import LoginPassword from "./screens/LoginPassword";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotPasswordNotice from "./screens/ForgotPasswordNotice";
import store from "./redux/store";
import NewPassword from "./screens/NewPassword";
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Navbar />
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
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
