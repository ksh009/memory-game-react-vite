import { vi } from "vitest";

const mockReadGlobalState = {
  gameState: {
    board: [],
    tileImageTypes: [
      "cat-solid.svg",
      "dog-solid.svg",
      "dragon-solid.svg",
      "fish-solid.svg",
      "hippo-solid.svg",
      "otter-solid.svg",
    ],
  },
  tiles: [
    "cat-solid.svg",
    "cat-solid.svg",
    "dog-solid.svg",
    "dog-solid.svg",
    "dragon-solid.svg",
    "dragon-solid.svg",
    "fish-solid.svg",
    "fish-solid.svg",
    "hippo-solid.svg",
    "hippo-solid.svg",
    "otter-solid.svg",
    "otter-solid.svg",
  ],
  selectedTileIndex: null,
  matched: [],
  displayMessages: "",
  isGameStarted: false,
  removedFromBoard: [],
  isRunningAnimation: false,
  pairedTiles: [],
};

const mockWriteGlobalState = {
  setGameState: vi.fn(),
  setTiles: vi.fn(),
  setSelectedTileIndex: vi.fn(),
  setMatched: vi.fn(),
  setDisplayMessages: vi.fn(),
  setIsGameStarted: vi.fn(),
  setRemovedFromBoard: vi.fn(),
  setIsRunningAnimation: vi.fn(),
  setPairedTiles: vi.fn(),
};

const mockRevertStateToDefault = vi.fn();

export { mockReadGlobalState, mockWriteGlobalState, mockRevertStateToDefault };
