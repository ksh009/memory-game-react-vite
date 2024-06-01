import { useState, useEffect } from "react";
import { MemoryGame } from "./modules/memory_game";
import { GameBoard } from "./components/GameBoard/GameBoard";

export function App() {
  const memoryGame = new MemoryGame();
  const [gameState, setGameState] = useState(memoryGame);
  const [tiles, setTiles] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [matched, setMatched] = useState([]);
  const [displayMessages, setDisplayMessages] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [removedFromBoard, setRemovedFromBoard] = useState([]);
  const [isRunningAnimation, setIsRunningAnimation] = useState(false);
  const [pairedTiles, setPairedTiles] = useState([]);

  const readGlobalState = {
    gameState,
    tiles,
    selectedTileIndex,
    matched,
    displayMessages,
    isGameStarted,
    removedFromBoard,
    isRunningAnimation,
    pairedTiles,
  };

  const writeGlobalState = {
    setGameState,
    setTiles,
    setSelectedTileIndex,
    setMatched,
    setDisplayMessages,
    setIsGameStarted,
    setRemovedFromBoard,
    setIsRunningAnimation,
    setPairedTiles,
  };

  const initializeGame = () => {
    setGameState(memoryGame);
    gameState.setBoard();
    setTiles(gameState.board);
  };

  const revertStateToDefault = () => {
    setTiles([]);
    setIsGameStarted(false);
    setRemovedFromBoard([]);
    setMatched([]);
    setSelectedTileIndex(null);
    setDisplayMessages("");
    setIsRunningAnimation(false);
    setPairedTiles([]);
  };

  useEffect(() => {
    if (tiles.length === 0) {
      initializeGame();
    }
  }, [tiles]);

  return (
    <>
      <div
        role="application"
        aria-label="Memory Game Application"
        className={`w-full h-full flex justify-center items-center ${
          isGameStarted ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <GameBoard
          writeGlobalState={writeGlobalState}
          readGlobalState={readGlobalState}
          revertStateToDefault={revertStateToDefault}
        />
      </div>
    </>
  );
}
