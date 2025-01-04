import { createContext, useEffect, useState } from "react";
import { onValue, push, ref, set } from "firebase/database";
import { db } from "./firebase";

export const GameContext = createContext(null);

export default function GameContextProvider({ children }) {
  const [gameState, setGameState] = useState([
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ]);
  const [player, setPlayer] = useState("Player 1");  // Start with Player 1
  const [winner, setWinner] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendChat = (message) => {
    if (message.trim()) {
      const chatRef = ref(db, "chat");
      push(chatRef, {
        message: message,
        user: player,  // Send "Player 1" or "Player 2" as user
        timestamp: Date.now(),
      });
    }
  };

  // Listen for chat updates
  useEffect(() => {
    const chatRef = ref(db, "chat");
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        setChatMessages(Object.values(snapshot.val()));
      }
    });
  }, []);

  function changeBoard(index) {
    // if cell is empty then only do the whole work
    if (gameState[index] !== "-") {
      alert("Don't Cheat");
      return;
    }

    // if someone is already winner then also don't play
    if (winner !== "") {
      alert("Game is Finished");
      return;
    }

    // update board with "X" or "O"
    setGameState((curr) => {
      let copy = [...curr];
      copy[index] = player === "Player 1" ? "X" : "O";  // Player 1 is X, Player 2 is O
      return copy;
    });

    // flip turn between Player 1 and Player 2
    setPlayer(player === "Player 1" ? "Player 2" : "Player 1");
  }

  function checkWins(playerToCheck) {
    // first row
    if (
      gameState[0] === playerToCheck &&
      gameState[1] === playerToCheck &&
      gameState[2] === playerToCheck
    )
      return true;
    // second row
    if (
      gameState[3] === playerToCheck &&
      gameState[4] === playerToCheck &&
      gameState[5] === playerToCheck
    )
      return true;
    // third row
    if (
      gameState[6] === playerToCheck &&
      gameState[7] === playerToCheck &&
      gameState[8] === playerToCheck
    )
      return true;

    // first column
    if (
      gameState[0] === playerToCheck &&
      gameState[3] === playerToCheck &&
      gameState[6] === playerToCheck
    )
      return true;
    // second column
    if (
      gameState[1] === playerToCheck &&
      gameState[4] === playerToCheck &&
      gameState[7] === playerToCheck
    )
      return true;
    // third column
    if (
      gameState[2] === playerToCheck &&
      gameState[5] === playerToCheck &&
      gameState[8] === playerToCheck
    )
      return true;

    // first diagonal
    if (
      gameState[0] === playerToCheck &&
      gameState[4] === playerToCheck &&
      gameState[8] === playerToCheck
    )
      return true;
    // second diagonal
    if (
      gameState[2] === playerToCheck &&
      gameState[4] === playerToCheck &&
      gameState[6] === playerToCheck
    )
      return true;

    return false;
  }

  useEffect(() => {
    let xWin = checkWins("X");
    let oWin = checkWins("O");
    if (xWin) {
      setWinner("Player 1");  // Player 1 wins (X)
    }
    if (oWin) {
      setWinner("Player 2");  // Player 2 wins (O)
    }

    // update in Firebase without JSON.stringify to avoid issues
    const boardRef = ref(db, "board");
    set(boardRef, gameState);
  }, [gameState]);

  function resetGame() {
    setGameState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
    setPlayer("Player 1");
    setWinner("");
  }

  function setListener() {
    // 1. Board Array
    const gameRef = ref(db, "board");
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        try {
          const newBoard = snapshot.val(); // Don't use JSON.parse if data is already valid
          setGameState(newBoard);
        } catch (error) {
          console.error("Error parsing Firebase board data:", error);
        }
      }
    });

    // 2. Second Listener for Player Turn
    const turnRef = ref(db, "turn");
    onValue(turnRef, (snapshot) => {
      if (snapshot.exists()) {
        const currentPlayer = snapshot.val();
        setPlayer(currentPlayer);
      }
    });
  }

  useEffect(() => {
    setListener();
  }, []);

  useEffect(() => {
    // Update Firebase turn data
    const turnRef = ref(db, "turn");
    set(turnRef, player);
  }, [player]);

  return (
    <div>
      <GameContext.Provider
        value={{
          gameState, changeBoard, winner, player, resetGame, chatMessages,
          sendChat, setMessage,
        }}
      >
        {children}
      </GameContext.Provider>
    </div>
  );
}
