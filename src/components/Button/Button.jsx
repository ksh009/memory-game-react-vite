import { useState, useEffect } from "react";

export const Button = ({
  writeGlobalState,
  readGlobalState,
  revertStateToDefault,
}) => {
  const [buttonText, setButtonText] = useState("Start Game");
  const { isGameStarted, removedFromBoard, isRunningAnimation } =
    readGlobalState;
  const { setIsGameStarted } = writeGlobalState;

  const handlePlayClick = () => {
    if (buttonText === "Play Again?" || buttonText === "Restart Game") {
      setButtonText("Start Game");
      revertStateToDefault();
    }

    if (removedFromBoard.length === 0 && !isGameStarted) {
      setButtonText("Restart Game");
      setIsGameStarted(true);
    }
  };

  useEffect(() => {
    if (removedFromBoard.length === 12 && isGameStarted) {
      setButtonText("Play Again?");
      setIsGameStarted(false);
    }
  }, [removedFromBoard]);

  return (
    <button
      role="game-state"
      disabled={isRunningAnimation}
      onClick={handlePlayClick}
      className={`mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 ${
        isRunningAnimation ? "cursor-wait" : ""
      }`}
    >
      {buttonText}
    </button>
  );
};
