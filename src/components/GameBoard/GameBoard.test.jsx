import { render } from "@testing-library/react";
import { App } from "../../App.jsx";

describe("GameBoard component", () => {
  let gameBoard,
    gameBoardHeading,
    tileContainer,
    displayMessages,
    gamePhaseButton;

  beforeEach(() => {
    const { getByText, getByRole } = render(<App />);
    gameBoard = getByRole("region");
    gameBoardHeading = getByText("MEMORY GAME");
    tileContainer = getByRole("grid");
    displayMessages = getByRole("dialog");
    gamePhaseButton = getByRole("game-state");
  });

  it("should render the GameBoard child components correctly on initial render", () => {
    expect(gameBoardHeading).toBeInTheDocument();
    expect(tileContainer).toBeInTheDocument();
    expect(displayMessages).toBeInTheDocument();
    expect(gamePhaseButton).toBeInTheDocument();
  });
});
