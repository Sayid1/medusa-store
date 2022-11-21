import React, { useState } from "react"
import clsx from "clsx"
import { Control, Controller, useFormContext } from "react-hook-form"
import Select from "@modules/common/components/select"
import { PLUGS, BACKBOARD_COLORS, USEAGE } from "@lib/constants"
import NeonBackboard from "./backboard-style"

const plugOptions = PLUGS.map((plug) => ({ id: plug, name: plug }))
const boardOptions = BACKBOARD_COLORS.map((board) => ({
  id: board,
  name: board,
}))

const CommonOption = () => {
  const { control } = useFormContext()
  return (
    <>
      <label className="block text-xl text-[#9C1AA8]">SIGN USAGE </label>
      <div className="grid grid-cols-2 gap-4">
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
                      "py-4 text-center text-white font-thin text-lg rounded-xl bg-[color:var(--secondary-bg-color)] text-black cursor-pointer",
                      {
                        "!bg-[#9C1AA8] !text-white": field.value === usg,
                        "border-2 hover:border-2 hover:border-[#9C1AA8] hover:border-solid":
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
        <label className="mb-1 block text-xl text-[#9C1AA8]">
          CHOOSE NEON BACKBOARD STYLE
        </label>
        <NeonBackboard />
      </div>
    </>
  )
}

export default CommonOption
