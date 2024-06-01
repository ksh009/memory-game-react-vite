import { render, fireEvent } from "@testing-library/react";
import { App } from "../../App.jsx";
import { getElementClassNames } from "../../test_helpers/helper_functions.js";

describe("TileContainer component", () => {
  let tiles, tilesButtons, gamePhaseButton;

  beforeEach(() => {
    const { getAllByRole, getByRole } = render(<App />);

    tiles = getAllByRole("cell");
    tilesButtons = getAllByRole("tile-button");
    gamePhaseButton = getByRole("game-state");
  });

  it("should initially render 12 disabled tile buttons with a dark gray background", () => {
    expect(tiles.length).toBe(12);
    tilesButtons.forEach((tileButton) => {
      expect(tileButton).toBeInTheDocument();
      expect(tileButton.disabled).toBe(true);
      expect(tileButton.className).toContain("bg-gray-900");
    });
  });

  it("should enable and apply a light gray background to each tile upon Start Game click", () => {
    fireEvent.click(gamePhaseButton);
    tilesButtons.forEach((tileButton) => {
      expect(tileButton.disabled).toBe(false);
      expect(getElementClassNames(tileButton).includes("bg-gray-200")).toBe(
        true
      );
    });
  });
});
