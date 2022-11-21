import { ErrorMessage } from "@hookform/error-message"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string
  immersive?: boolean
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      errors,
      touched,
      required,
      immersive = true,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    console.log("required", required)
    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)

    return (
      <div>
        <div className="relative z-0 w-full text-xl">
          {!immersive && (
            <label
              htmlFor={name}
              onClick={() => inputRef.current?.focus()}
              className={clsx("origin-0 text-[#9C1AA8]", {
                "!text-[red]": hasError,
              })}
            >
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
          )}
          <input
            type={inputType}
            name={name}
            placeholder=" "
            className={clsx(
              // "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
              "block rounded-md outline-[#9C1AA8] w-full bg-transparent border border appearance-none outline-[#9C1AA8]",
              {
                "mt-1 p-[0.5rem_0.75rem]": !immersive,
                "px-4 mt-0 pt-4 pb-1": immersive,
                "border-[red] focus:border-rose-500": hasError,
              }
            )}
            {...props}
            ref={inputRef}
          />
          {immersive && (
            <label
              htmlFor={name}
              onClick={() => inputRef.current?.focus()}
              className={clsx(
                "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500",
                {
                  "!text-[red]": hasError,
                }
              )}
            >
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
          )}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 pl-2 text-[red] text-lg">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
