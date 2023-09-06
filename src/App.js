import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Review from "./screens/Review";
import Demographics from "./screens/Demographics";
import List from "./screens/List";
import About from "./screens/About";
import Sign from "./screens/Sign";
import Login from "./screens/Login";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/review" element={<Review />} />
        <Route path="/list" element={<List />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/demographics" element={<Demographics />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
