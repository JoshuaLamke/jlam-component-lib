import { render, screen } from "@testing-library/react";
import TooltipButton from "./TooltipButton";

describe("Overlays/Tooltip/TooltipButton", () => {
  it("Should render icon and button", async () => {
    render(
      <TooltipButton content="Tooltip Content" Icon={<span>Icon</span>} />
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
