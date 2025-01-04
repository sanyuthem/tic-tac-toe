import { useContext } from "react";
import { GameContext } from "../GameContext";

export default function Cell({ value, index }) {
  const { changeBoard } = useContext(GameContext);

  return (
    <div onClick={() => changeBoard(index)} className="cell w-[60px] h-[60px] md:w-[80px] md:h-[80px] m-[10px] shadow-[1px_3px_5px_#000] flex justify-center items-center bg-gradient-to-r from-pink-300 to bg-red-400">
      <h3>{value}</h3>
    </div>
  );
}
