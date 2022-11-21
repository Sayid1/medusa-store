import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "w-full uppercase flex items-center rounded-full justify-center min-h-[50px] px-5 py-[10px] text-lg font-bold transition-all duration-500 disabled:opacity-50",
        {
          "text-white bg-[#9C1AA8] hover:-translate-y-1 hover:shadow-[0_10px_20px_0_rgb(0_0_0_/_30%)] hover:bg-gradient-radial from-[#e61a5e] to-[#5e1ae6] to-[#FEEE10] disabled:hover:bg-gray-900 disabled:hover:text-white":
            variant === "primary",
          "text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100":
            variant === "secondary",
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
