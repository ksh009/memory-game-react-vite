import { useState, useEffect } from "react";
import "./tile.css";

export function Tile({
  writeGlobalState,
  readGlobalState,
  tileName,
  gameStateTileIndex,
}) {
  const [flipped, setFlipped] = useState(false);

  const {
    matched,
    selectedTileIndex,
    removedFromBoard,
    isRunningAnimation,
    pairedTiles,
    isGameStarted,
  } = readGlobalState;

  const {
    setMatched,
    setSelectedTileIndex,
    setRemovedFromBoard,
    setIsRunningAnimation,
    setPairedTiles,
  } = writeGlobalState;

  const handleClick = () => {
    if (!flipped) {
      setFlipped(!flipped);
      setMatched([...matched, tileName]);
      setPairedTiles([...pairedTiles, gameStateTileIndex]);
      setSelectedTileIndex(gameStateTileIndex);
    }
  };

  const handleTileVisibilityState = (isMatchedTilesEqual) => {
    if (pairedTiles.length === 2) {
      isMatchedTilesEqual
        ? setRemovedFromBoard([...removedFromBoard, ...pairedTiles])
        : null;
      setPairedTiles([]);
    }
  };

  const handleStateReset = (isMatchedTilesEqual) => {
    handleTileVisibilityState(isMatchedTilesEqual);
    setTimeout(() => {
      setSelectedTileIndex(null);
    }, 500);

    setTimeout(() => {
      setMatched([]);
      setFlipped(false);
    }, 1000);

    setTimeout(() => {
      setIsRunningAnimation(false);
    }, 1500);
  };

  useEffect(() => {
    if (matched.length === 0) {
      setFlipped(false);
    }
    if (
      matched.length === 2 &&
      matched.includes(tileName) &&
      gameStateTileIndex === selectedTileIndex
    ) {
      setIsRunningAnimation(true);
      if (matched[0] === matched[1]) {
        handleStateReset(matched[0] === matched[1]);
      } else {
        handleStateReset(matched[0] === matched[1]);
      }
    }
  }, [matched]);

  return (
    <div
      role="cell"
      aria-label={`Tile ${tileName}`}
      className={`${
        flipped && matched.length > 0
          ? "rotate-vert-center shadow-lg"
          : `flip-vertical-right shadow-lg ${
              removedFromBoard.includes(gameStateTileIndex) ? "opacity-0" : ""
            }`
      }`}
      onClick={matched.length === 2 ? null : handleClick}
    >
      <button
        role="tile-button"
        disabled={
          isRunningAnimation ||
          removedFromBoard.includes(gameStateTileIndex) ||
          !isGameStarted
        }
        aria-disabled={
          isRunningAnimation ||
          removedFromBoard.includes(gameStateTileIndex) ||
          !isGameStarted
        }
        className={`p-0 w-24 h-24 flex justify-center items-center rounded-md ${
          isGameStarted ? "bg-gray-200" : "bg-gray-900"
        }`}
      >
        <img
          aria-hidden={!flipped || matched.length === 0}
          src={`/images/${tileName}`}
          alt="Image"
          className={`w-2/4 h-2/4 ${
            flipped && matched.length > 0 ? "" : "hidden"
          }`}
        />
      </button>
    </div>
  );
}
