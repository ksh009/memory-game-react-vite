import { queryByText, render } from "@testing-library/react";
import { DisplayMessages } from "./DisplayMessages.jsx";
import {
  mockReadGlobalState,
  mockWriteGlobalState,
  mockRevertStateToDefault,
} from "../../test_helpers/helper_objects.js";
import { expect } from "vitest";

describe("TileContainer component", () => {
  let displayMessages;

  beforeEach(() => {
    const { queryByText } = render(
      <DisplayMessages
        writeGlobalState={mockWriteGlobalState}
        readGlobalState={mockReadGlobalState}
        revertStateToDefault={mockRevertStateToDefault}
      />
    );

    displayMessages = queryByText("Well done. All tiles matched!");
  });

  it("should not render a display message when all tiles are not met", () => {
    expect(displayMessages).not.toBeInTheDocument();
  });

  it("should render an appropriate message when all tiles have been matched", () => {
    mockReadGlobalState.removedFromBoard = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ];
    mockReadGlobalState.isGameStarted = true;
    mockReadGlobalState.displayMessages = "Well done. All tiles matched!";

    const { getByText } = render(
      <DisplayMessages
        writeGlobalState={mockWriteGlobalState}
        readGlobalState={mockReadGlobalState}
        revertStateToDefault={mockRevertStateToDefault}
      />
    );

    displayMessages = getByText("Well done. All tiles matched!");

    expect(displayMessages).toBeInTheDocument();
  });
});
