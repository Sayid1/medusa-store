import { ErrorMessage } from "@hookform/error-message"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, errors, touched, required, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current!)

    const hasError = get(errors, name) && get(touched, name)
    return (
      <>
        <label
          htmlFor={name}
          className={clsx("origin-0 text-[#9C1AA8] text-xl", {
            "!text-rose-500": hasError,
          })}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <textarea
          ref={textareaRef}
          name={name}
          className="mt-1 p-2 block text-xl rounded-md outline-[#9C1AA8] w-full bg-transparent border appearance-none"
          {...props}
        ></textarea>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
