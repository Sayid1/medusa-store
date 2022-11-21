import React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"

interface TooltipProps {
  content: any
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: RadixTooltip.TooltipProps["onOpenChange"]
  delayDuration?: number
  className?: string
  arrowClassName?: string
  side?: "top" | "right" | "bottom" | "left" | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Tooltip = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
  arrowClassName,
  side,
  onClick,
  ...props
}: React.PropsWithChildren<TooltipProps>) => {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <RadixTooltip.Trigger onClick={onClick} asChild={true}>
          <span>{children}</span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side ?? "top"}
          sideOffset={8}
          className={clsx(
            "inter-small-semibold text-white",
            "bg-black py-[6px] px-[12px] shadow-dropdown rounded",
            "max-w-[220px] z-100 text-base",
            className
          )}
          {...props}
        >
          {content}
          <RadixTooltip.Arrow
            width={11}
            height={5}
            className={arrowClassName}
          />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
