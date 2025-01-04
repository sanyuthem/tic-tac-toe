import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Board from "./Board";
import { GameContext } from "../GameContext";
import Chat from "./Chat";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const { resetGame } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !auth.currentUser) {
      // Redirect to login if no user or no auth session
      navigate("/");
    }
  }, [user, navigate]); // Adding `user` and `navigate` as dependencies

  if (!user) {
    return <h1>Redirecting to login page...</h1>; // Display a loading or redirect message
  }

  return (
    <div className="relative">
      {/* Background */}
      <div className="area absolute inset-0 z-0 bg-gradient-to-r from-blue-300 to-purple-500 h-screen">
        <ul className="circles">
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

      {/* Main Content */}
      <div className="relative z-10">
        <h3 className="font-rubik text-6xl font-extrabold text-red-600 py-5">Tic Tac Toe</h3>
        
        <button
          onClick={logout}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-4 py-1 transition-all ease-in duration-75 rounded-xl group-hover:bg-opacity-0">
            Logout
          </span>
        </button>

        <button
          onClick={resetGame}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-4 py-1 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
            Reset
          </span>
        </button>

        <div className="flex flex-col md:flex-row gap-[100px]">
          <Board />
          <Chat />
        </div>
      </div>
    </div>
  );
}
