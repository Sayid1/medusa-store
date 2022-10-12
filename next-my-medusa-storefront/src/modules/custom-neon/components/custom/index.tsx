import React, { useState, useRef } from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Control, Controller, useFormContext } from "react-hook-form"
import TextStep from "./text-step"
import FontStep from "./font-step"
import ColourStep from "./colour-step"
import CommonOption from "./common-option"
import Button from "@modules/common/components/button"

const steps = ["Text", "Font", "Colour"]

const CustomStep = ({
  textRef,
}: {
  textRef: React.RefObject<HTMLDivElement>
}) => {
  const [currStep, setStep] = useState(steps[0])
  const { control } = useFormContext()

  const changeStep = (step: string) => {
    setStep(step)
  }

  return (
    <>
      <ul className="flex items-center">
        {steps.map((step, index) => (
          <>
            <li
              onClick={() => changeStep(step)}
              key={step}
              className={clsx("flex-1 rounded-md font-bold text-center py-4", {
                "bg-black text-white cursor-default": step === currStep,
                " bg-[color:var(--secondary-bg-color)] cursor-pointer text-black":
                  step !== currStep,
              })}
            >
              {step}
            </li>
            {index < steps.length - 1 && (
              <ChevronRightIcon className="h-6 w-6 mx-4" aria-hidden="true" />
            )}
          </>
        ))}
      </ul>
      {currStep === steps[0] && (
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextStep
              onChange={field.onChange}
              content={field.value}
              ref={textRef}
            />
          )}
        />
      )}
      {currStep === steps[1] && (
        <Controller
          control={control}
          name="font"
          render={({ field }) => (
            <FontStep onChange={field.onChange} font={field.value} />
          )}
        />
      )}
      {currStep === steps[2] && (
        <Controller
          control={control}
          name="colour"
          render={({ field }) => (
            <ColourStep onChange={field.onChange} colour={field.value} />
          )}
        />
      )}
      <CommonOption />
      <Button className="mt-8" type="submit">
        Add to cart
      </Button>
    </>
  )
}

export default CustomStep
