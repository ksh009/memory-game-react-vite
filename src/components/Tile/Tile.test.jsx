import { render, fireEvent, waitFor } from "@testing-library/react";
import { App } from "../../App.jsx";
import { GameBoard } from "../GameBoard/GameBoard.jsx";
import {
  mockReadGlobalState,
  mockWriteGlobalState,
  mockRevertStateToDefault,
} from "../../test_helpers/helper_objects.js";
import { getElementClassNames } from "../../test_helpers/helper_functions.js";

describe("TileContainer component", () => {
  let tiles, tilesButtons, gamePhaseButton, tilesImages;

  beforeEach(async () => {
    const { getAllByRole, getByRole, getAllByAltText } = render(
      <App>
        <GameBoard
          writeGlobalState={mockWriteGlobalState}
          readGlobalState={mockReadGlobalState}
          revertStateToDefault={mockRevertStateToDefault}
        />
      </App>
    );

    tiles = getAllByRole("cell");
    tilesButtons = getAllByRole("tile-button");
    tilesImages = getAllByAltText("Image");
    gamePhaseButton = getByRole("game-state");
  });

  it("should make two unmatched tiles visible for 1.5 seconds then revert visibility to hidden", async () => {
    fireEvent.click(gamePhaseButton);
    expect(getElementClassNames(tilesImages[0]).includes("hidden")).toBe(true);
    expect(getElementClassNames(tilesImages[2]).includes("hidden")).toBe(true);
    fireEvent.click(tilesButtons[0]);
    fireEvent.click(tilesButtons[2]);
    expect(getElementClassNames(tilesImages[0]).includes("hidden")).toBe(false);
    expect(getElementClassNames(tilesImages[2]).includes("hidden")).toBe(false);
    await waitFor(async () => {
      expect(getElementClassNames(tilesImages[0]).includes("hidden")).toBe(
        true
      );
      expect(getElementClassNames(tilesImages[2]).includes("hidden")).toBe(
        true
      );
    });
  });

  it("should make two matched tiles visible for 1.5 seconds then remove them from play", async () => {
    fireEvent.click(gamePhaseButton);
    fireEvent.click(tilesButtons[0]);
    fireEvent.click(tilesButtons[1]);
    expect(getElementClassNames(tilesImages[0]).includes("hidden")).toBe(false);
    expect(getElementClassNames(tilesImages[1]).includes("hidden")).toBe(false);
    await waitFor(() => {
      expect(getElementClassNames(tilesImages[0]).includes("hidden")).toBe(
        true
      );
      expect(getElementClassNames(tilesImages[1]).includes("hidden")).toBe(
        true
      );
    });
  });

  it("should set all other tiles to disabled when matching animation is in progress", async () => {
    fireEvent.click(gamePhaseButton);
    fireEvent.click(tilesButtons[0]);
    fireEvent.click(tilesButtons[1]);
    await waitFor(() => {
      tilesButtons.forEach((tileButton, index) => {
        index !== 0 || index !== 1
          ? expect(tileButton.disabled).toBe(true)
          : expect(tileButton.disabled).toBe(true);
      });
    });
  });

  it("should make all tiles inaccessible when all tiles are matched", async () => {
    mockReadGlobalState.removedFromBoard = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ];
    mockReadGlobalState.isGameStarted = true;
    mockReadGlobalState.matched = [10, 11];
    const { getAllByRole } = render(
      <App>
        <GameBoard
          writeGlobalState={mockWriteGlobalState}
          readGlobalState={mockReadGlobalState}
          revertStateToDefault={mockRevertStateToDefault}
        />
      </App>
    );
    tilesButtons = getAllByRole("tile-button");

    for (let i = 0; i < tilesButtons.length; i++) {
      expect(tilesButtons[i]).toBeDisabled();
    }
  });
});
