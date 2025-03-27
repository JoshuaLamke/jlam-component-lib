import { render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Overlays/Tooltip/Tooltip", () => {
  it("Should render without errors", async () => {
    render(<Tooltip>Tooltip</Tooltip>);
    expect(screen.queryByText("Tooltip")).toBeNull(); // Text won't be on screen since its a tooltip
  });
});
