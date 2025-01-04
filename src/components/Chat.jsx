import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContext";

export default function Chat() {
  const { chatMessages, sendChat } = useContext(GameContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendChat(message);
      setMessage("");
    }
  };

  return (
    <div className="mt-[30px] md:ml-10 ml-1 lg:ml-14 ">
      <h3 className="text-2xl font-semibold text-center mb-4 mr-5 md:mr-0 text-black">Chat</h3>
      <div className="h-[300px] w-[250px] md:h-[200px] md:w-[250px] overflow-y-scroll border-4 border-red-500  p-2 rounded-lg shadow-lg ">
        {Object.entries(chatMessages).map(([key, msg]) => (
          <div key={key} className="mb-2 text-gray-800">
            <strong className="text-black font-semibold">{msg.user}: </strong>
            <span className="text-white">{msg.message}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-4/5 p-2 rounded-md text-gray-800 focus:outline-none h-8  focus:ring-blue-500"
        />
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white ">
            <span class="relative px-4 py-1 transition-all ease-in duration-75 rounded-xl group-hover:bg-opacity-0">
            Send
            </span>
          </button>
      </form>
    </div>

  );
}
