import { render, screen } from "@testing-library/react";
import DefaultTipIcon from "./DefaultTooltipIcon";

describe("Overlays/Tooltip/DefaultTipIcon", () => {
  it("Should render without errors", async () => {
    render(<DefaultTipIcon />);
    expect(screen.getByTestId("defaultTipIcon")).toBeInTheDocument();
  });
});
