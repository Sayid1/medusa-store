import React, { useState } from "react"
import { COLOURS, ColourType } from "@lib/constants"
import clsx from "clsx"

type ColourStepProps = {
  onChange: (colour: ColourType) => void
  colour?: ColourType
}

const ColourStep = (props: ColourStepProps) => {
  return (
    <>
      <div className="flex flex-wrap mt-4 mb-2 justify-center font-semibold">
        {COLOURS.map((colour) => (
          <div
            key={colour.color}
            onClick={() => props.onChange(colour)}
            className={clsx(
              "flex flex-col justify-start items-center cursor-pointer rounded-md border-2 border-transparent hover:border-[#9C1AA8] hover:border-solid w-[70px] h-[90px] px-2 mb-2 mr-2",
              {
                "!bg-[#9C1AA8] !text-white":
                  colour.color === props.colour?.color,
              }
            )}
          >
            <i
              className="icofont-light-bulb text-2xl"
              style={{
                color: colour.bulbColor,
                textShadow: colour.bulbTextShadow,
              }}
            ></i>
            <span className="sign-font-name text-lg text-center font-thin">
              {colour.color}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default ColourStep
