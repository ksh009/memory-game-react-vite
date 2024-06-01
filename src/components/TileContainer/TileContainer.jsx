import { Tile } from "../Tile/Tile.jsx";

export const TileContainer = ({ readGlobalState, writeGlobalState }) => {
  const { tiles } = readGlobalState;

  return (
    <div
      role="grid"
      aria-label="Memory Game Tiles"
      className="grid grid-cols-4 grid-rows-3 gap-4 w-4/4 justify-center items-center"
    >
      {tiles.length > 0 &&
        tiles.map((tileName, index) => (
          <Tile
            key={index}
            writeGlobalState={writeGlobalState}
            readGlobalState={readGlobalState}
            tileName={tileName}
            gameStateTileIndex={index}
          />
        ))}
    </div>
  );
};
