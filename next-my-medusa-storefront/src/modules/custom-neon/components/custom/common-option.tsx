import React from "react"
import clsx from "clsx"
import { Controller, useFormContext } from "react-hook-form"
import { SIZES } from "@lib/constants"
import NeonCommonComponent from "@modules/neon-common-options"
import { useStore } from "@lib/context/store-context"

const CommonOption = () => {
  const { control, watch } = useFormContext()
  const { countryCode } = useStore()

  return (
    <>
      {/* py-4 text-center text-white font-thin text-lg rounded-xl bg-[color:var(--secondary-bg-color)] text-black cursor-pointer !bg-[#9C1AA8] !text-white */}
      <label className="mb-1 block text-xl text-[#9C1AA8]">
        PICK YOUR SIZE
      </label>
      <div className="mb-2 grid grid-cols-2 gap-4">
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
                        "flex flex-col items-center rounded-xl px-3 py-2 text-white font-thin text-lg bg-[color:var(--secondary-bg-color)] text-black cursor-pointer",
                        {
                          "!bg-[#9C1AA8] !text-white": field.value === s.size,
                          "border-2 hover:border-2 hover:border-[#9C1AA8] hover:border-solid":
                            field.value !== s.size,
                        }
                      )}
                    >
                      <div>{s.size}</div>
                      <div className=" mt-1">
                        $
                        {(s.price + watch("content").length * s.step).toFixed(
                          2
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            )
          }}
        />
      </div>
      <div className="text-gray-500 text-lg mb-4">
        Height range may vary a little depending on the wordings & the font
        chosen.
      </div>

      <NeonCommonComponent />
    </>
  )
}

export default CommonOption
