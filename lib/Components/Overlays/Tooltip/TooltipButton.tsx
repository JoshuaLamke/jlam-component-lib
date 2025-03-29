import { TooltipTrigger } from "react-aria-components";
import Tooltip, { TooltipProps } from "./Tooltip";
import { Focusable, Placement, TooltipTriggerProps } from "react-aria";
import DefaultTooltipIcon from "./DefaultTooltipIcon";
import { Size, sizeStyleMap } from "../../../";

export interface TooltipButtonProps {
  delay?: number;
  closeDelay?: number;
  defaultOpen?: boolean;
  content: React.ReactNode;
  Icon?: React.ReactNode;
  isDisabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  trigger?: "focus";
  crossOffset?: number;
  arrowBoundaryOffset?: number;
  offset?: number;
  placement?: Placement;
  shouldFlip?: boolean;
  className?: string;
  size?: Size;
}

const TooltipButton = ({
  content,
  Icon,
  delay = 500,
  closeDelay,
  defaultOpen,
  isDisabled,
  isOpen,
  onOpenChange,
  trigger,
  arrowBoundaryOffset,
  crossOffset,
  offset,
  placement,
  shouldFlip,
  className,
  size = "md",
}: TooltipButtonProps) => {
  const tooltipTriggerProps: TooltipTriggerProps = {
    delay,
    closeDelay,
    defaultOpen,
    isDisabled,
    isOpen,
    onOpenChange,
    trigger,
  };

  const tooltipProps: Omit<TooltipProps, "children"> = {
    isOpen,
    onOpenChange,
    defaultOpen,
    crossOffset,
    arrowBoundaryOffset,
    offset,
    placement,
    shouldFlip,
  };

  return (
    <TooltipTrigger {...tooltipTriggerProps}>
      <Focusable>
        <span role="button" className={className}>
          {Icon ?? (
            <DefaultTooltipIcon
              size={sizeStyleMap[size].defaultTooltipIconSize}
            />
          )}
        </span>
      </Focusable>
      <Tooltip {...tooltipProps}>{content}</Tooltip>
    </TooltipTrigger>
  );
};

export default TooltipButton;
