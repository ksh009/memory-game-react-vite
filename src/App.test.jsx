import { render, fireEvent } from "@testing-library/react";
import { App } from "./App.jsx";
import { getElementClassNames } from "./test_helpers/helper_functions.js";

describe("App component", () => {
  let appComponent,
    gameBoardComponent,
    gamePhaseButton,
    classNamesArray,
    isDefaultBackgroundColor,
    isAltBackgroundColor;

  beforeEach(() => {
    const { getByRole } = render(<App />);
    appComponent = getByRole("application");
    gameBoardComponent = getByRole("region");
    gamePhaseButton = getByRole("game-state");
    classNamesArray = getElementClassNames(appComponent);
    isDefaultBackgroundColor = classNamesArray.includes("bg-gray-200");
    isAltBackgroundColor = classNamesArray.includes("bg-gray-900");
  });

  it("should render App component correctly", () => {
    expect(appComponent).toBeInTheDocument();
  });

  it("should render the child component correctly", () => {
    expect(gameBoardComponent).toBeInTheDocument();
  });

  it("should render with a default background color of bg-gray-200", () => {
    expect(isDefaultBackgroundColor).toBe(true);
  });

  it("should not have the alternative background applied on initial load", () => {
    expect(isAltBackgroundColor).toBe(false);
  });

  it("should have the alternative background applied on Start Game click", () => {
    fireEvent.click(gamePhaseButton);
    isAltBackgroundColor =
      getElementClassNames(appComponent).includes("bg-gray-900");
    expect(isAltBackgroundColor).toBe(true);
  });
});
