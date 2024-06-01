import { render } from "@testing-library/react";
import { GameBoard } from "../GameBoard/GameBoard.jsx";
import {
  mockReadGlobalState,
  mockWriteGlobalState,
  mockRevertStateToDefault,
} from "../../test_helpers/helper_objects.js";

describe("Spinner component", () => {
  let spinner;

  it("should render the Spinner when tile state is an empty array then render the tileContainer", () => {
    mockReadGlobalState.tiles = [];
    const { getByRole } = render(
      <GameBoard
        writeGlobalState={mockWriteGlobalState}
        readGlobalState={mockReadGlobalState}
        revertStateToDefault={mockRevertStateToDefault}
      />
    );
    spinner = getByRole("status");

    expect(spinner).toBeInTheDocument();
  });
});
