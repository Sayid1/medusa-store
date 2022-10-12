import React, { useState } from "react"
import clsx from "clsx"
import { Control, Controller, useFormContext } from "react-hook-form"
import Select from "@modules/common/components/select"
import { PLUGS, BACKBOARD_COLORS, SIZES, USEAGE } from "@lib/constants"
import NeonBackboard from "@modules/neon-backboard"

const plugOptions = PLUGS.map((plug) => ({ id: plug, name: plug }))
const boardOptions = BACKBOARD_COLORS.map((board) => ({
  id: board,
  name: board,
}))

const CommonOption = () => {
  const { control } = useFormContext()
  return (
    <>
      <label className="mb-1 block">PICK YOUR SIZE</label>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="size"
          render={({ field }) => {
            return (
              <>
                {SIZES.map((s) => {
                  return (
                    <div
                      key={s.size}
                      onClick={() => field.onChange(s.size)}
                      className={clsx(
                        "flex flex-col items-center rounded-xl px-3 py-2 text-sm font-semibold bg-[color:var(--secondary-bg-color)] text-black cursor-pointer",
                        {
                          "!bg-black !text-white": field.value === s.size,
                          "border-2 hover:border-2 hover:border-black hover:border-solid":
                            field.value !== s.size,
                        }
                      )}
                    >
                      <div>{s.size}</div>
                      <div className=" mt-1">${s.price}</div>
                    </div>
                  )
                })}
              </>
            )
          }}
        />
      </div>
      <div className="text-gray-500 text-xs">
        Height range may vary a little depending on the wordings & the font
        chosen.
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Controller
          control={control}
          name="useage"
          render={({ field }) => {
            return (
              <>
                {USEAGE.map((usg) => (
                  <div
                    onClick={() => field.onChange(usg)}
                    className={clsx(
                      "py-4 text-center text-white rounded-xl bg-[color:var(--secondary-bg-color)] text-black cursor-pointer",
                      {
                        "!bg-black !text-white": field.value === usg,
                        "border-2 hover:border-2 hover:border-black hover:border-solid":
                          field.value !== usg,
                      }
                    )}
                    key={usg}
                  >
                    {usg}
                  </div>
                ))}
              </>
            )
          }}
        />
      </div>

      <div className="mt-4">
        <Select
          control={control}
          name="plug"
          options={plugOptions}
          title="POWER PLUG"
        />
      </div>
      <div className="mt-4">
        <Select
          control={control}
          name="boardColor"
          options={boardOptions}
          title="CHOOSE BACKBOARD COLOR"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block">CHOOSE NEON BACKBOARD STYLE</label>
        <NeonBackboard />
      </div>
    </>
  )
}

export default CommonOption
