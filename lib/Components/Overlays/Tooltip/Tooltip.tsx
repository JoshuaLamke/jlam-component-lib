import type { TooltipProps as ReactAriaTooltipProps } from "react-aria-components";
import {
  Tooltip as ReactAriaTooltip,
  OverlayArrow,
} from "react-aria-components";

export interface TooltipProps extends Omit<ReactAriaTooltipProps, "children"> {
  children: React.ReactNode;
}

const Tooltip = ({ children, ...tooltipProps }: TooltipProps) => {
  return (
    <ReactAriaTooltip
      {...tooltipProps}
      className="rounded border bg-black text-white m-2"
    >
      <OverlayArrow>
        <svg width={8} height={8} fill="black" viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      <div className="m-1">{children}</div>
    </ReactAriaTooltip>
  );
};

export default Tooltip;
