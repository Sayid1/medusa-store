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
        <textarea
          ref={textareaRef}
          name={name}
          className="w-full rounded-xl my-4 p-4 bg-[color:var(--secondary-bg-color)] outline-black"
          {...props}
        ></textarea>
      </>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
