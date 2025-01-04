import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Board from "./Board";
import { GameContext } from "../GameContext";
import Chat from "./Chat";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const { resetGame } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null || !auth.currentUser) {
      navigate("/"); 
    }
  }, []);

  return (
    <div>
      {auth.currentUser ? (
        <div className="">
          <h3 className="font-rubik text-6xl font-extrabold text-red-600 py-5">Tic Tac Toe</h3>
          <button onClick={logout} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span class="relative px-4 py-1 transition-all ease-in duration-75 rounded-xl group-hover:bg-opacity-0">
              Logout
            </span>
          </button>
          <button onClick={resetGame} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span class="relative px-4 py-1 transition-all ease-in duration-75   rounded-md group-hover:bg-opacity-0">
              Reset
            </span>
          </button>
          <div className="flex flex-col md:flex-row  gap-[100px] ">
            <Board />
            <Chat />
          
          </div>
        </div>
      ) : (
        <h1>Redirecting to login page</h1>
      )}
    </div>
  );
}
<div class="area" className="area absolute inset-0 z-0 bg-gradient-to-r from-blue-300 to-purple-500 h-scr">
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