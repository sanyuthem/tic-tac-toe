
import "./App.css";

import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import AuthContextProviderMain from "./AuthContext";
import GameContextPrvoider from "./GameContext";

function App() {
  return (
    <div className="">
    <AuthContextProviderMain>
      <GameContextPrvoider>
        <div>
          <div class="area" className="area absolute inset-0 z-0 bg-gradient-to-r from-blue-300 to-purple-500 ">
            <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/home" element={<Home />} />

          </Routes>
        </div>
      </GameContextPrvoider>
    </AuthContextProviderMain>
    </div>
  );
}

export default App;
