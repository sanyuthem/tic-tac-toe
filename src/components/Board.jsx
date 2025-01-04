import { useContext } from "react";
import { GameContext } from "../GameContext";
import Cell from "./Cell";

export default function Board() {
  const { gameState, player, winner } = useContext(GameContext);

  return (
    <div>
      <p className="font-semibold text-xl text-red-500">Turn :  <span className="text-black"> {player}</span></p>
      {winner != "" && <p className="text-black font-semibold text-xl" >Winner is : <span className="text-red-500 font-semibold text-xl">{winner}</span></p>}
      <div className="board text-black text-2xl font-sans font-semibold">
        {gameState.map((item, index) => (
          <Cell key={index} index={index} value={item} />
        ))}
      </div>
    </div>
  );
}
