import { render, fireEvent, screen } from "@testing-library/react";
import { App } from "../../App.jsx";
import { Button } from "./Button.jsx";

import {
  mockReadGlobalState,
  mockWriteGlobalState,
  mockRevertStateToDefault,
} from "../../test_helpers/helper_objects.js";

describe("Button component", () => {
  let gamePhaseButton;

  beforeEach(() => {
    const { getByText } = render(<App />);

    gamePhaseButton = getByText("Start Game");
  });

  it("should have 'Start Game' as inner text on initial load", () => {
    expect(gamePhaseButton).toBeInTheDocument();
  });

  it("should have 'Restart Game' as inner text when 'Start Game' button is clicked", () => {
    fireEvent.click(gamePhaseButton);
    gamePhaseButton = screen.getByText("Restart Game");
    expect(gamePhaseButton).toBeInTheDocument();
  });

  it("should have inner text of 'Play Again?' when all the tiles are matched", () => {
    fireEvent.click(gamePhaseButton);
    mockReadGlobalState.removedFromBoard = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ];
    mockReadGlobalState.isGameStarted = true;

    const { getByText } = render(
      <Button
        writeGlobalState={mockWriteGlobalState}
        readGlobalState={mockReadGlobalState}
        revertStateToDefault={mockRevertStateToDefault}
      />
    );

    gamePhaseButton = getByText("Play Again?");

    expect(gamePhaseButton).toBeInTheDocument();
  });
});
