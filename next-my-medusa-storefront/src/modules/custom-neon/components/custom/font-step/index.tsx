import React, { useState } from "react"
import { FONTS, FontType } from "@lib/constants"
import clsx from "clsx"

type FontSteppProps = {
  onChange: (font: FontType) => void
  font?: FontType
}

const FontStep = (props: FontSteppProps) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-1 mt-4">
        {FONTS.map((fontConfig) => (
          <div
            key={fontConfig.font}
            onClick={() => props.onChange(fontConfig)}
            className={clsx(
              "flex justify-center items-center h-12 px-2 mb-2 mr-2 rounded-md overflow-hidden hover:border hover:border-black hover:border-solid cursor-pointer sign-text-font-" +
                fontConfig.font,
              {
                "bg-black text-white": fontConfig.font === props.font?.font,
              }
            )}
          >
            <span className="sign-font-name">{fontConfig.font}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default FontStep
