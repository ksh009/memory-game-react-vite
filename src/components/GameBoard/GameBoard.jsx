import { Button } from "../Button/Button.jsx";
import { DisplayMessages } from "../DisplayMessages/DisplayMessages.jsx";
import { Spinner } from "../Spinner/Spinner.jsx";
import { TileContainer } from "../TileContainer/TileContainer.jsx";

export const GameBoard = ({
  readGlobalState,
  writeGlobalState,
  revertStateToDefault,
}) => {
  const { tiles } = readGlobalState;
  return (
    <div
      role="region"
      aria-label="Game Board"
      className="w-2/4 h-5/6 flex flex-col justify-center items-center bg-white shadow-gray-900 shadow-inner-2xl rounded-xl"
    >
      <div className="text-3xl mb-5">
        <h1>MEMORY GAME</h1>
      </div>
      {tiles.length > 0 ? (
        <TileContainer
          writeGlobalState={writeGlobalState}
          readGlobalState={readGlobalState}
        />
      ) : (
        <Spinner />
      )}
      <DisplayMessages
        writeGlobalState={writeGlobalState}
        readGlobalState={readGlobalState}
      />
      <Button
        writeGlobalState={writeGlobalState}
        readGlobalState={readGlobalState}
        revertStateToDefault={revertStateToDefault}
      />
    </div>
  );
};
