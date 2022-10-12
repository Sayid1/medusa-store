// @ts-nocheck
import React, { useState } from "react"
import Image from "next/image"
import { Control, Controller, useFormContext } from "react-hook-form"
import { QuestionMarkCircleIcon, CheckIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import Tooltip from "@modules/common/components/tooltip"
import { BACKBOARD_STYLES } from "@lib/constants"

const NeonBackboard = () => {
  // const [selected, setSelected] = useState(0)
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name="boardStyle"
      render={({ field }) => {
        return (
          <div className="grid md:grid-cols-3 md:gap-4">
            {BACKBOARD_STYLES.map((board, i) => {
              return (
                <div
                  key={i}
                  className={clsx(
                    field.value === board.name
                      ? "border-[2px] border-slate-900 shadow-xl"
                      : "border-slate-300",
                    "inline-grid md:block mb-4 md:mb-0 relative rounded border hover:shadow-lg border-solid cursor-pointer"
                  )}
                  onClick={() => field.onChange(board.name)}
                >
                  {field.value === board.name && (
                    <div
                      className="
                    absolute z-10 text-white left-[-2px] top-[-2px] p-1
                    after:content-['']
                    after:absolute
                    after:top-0
                    after:rotate-180
                    after:left-[-2px]
                    after:border-[40px]
                    after:border-r-0
                    after:border-solid
                    after:border-[transparent]
                    after:border-b-[color:var(--fourth-color)]
                "
                    >
                      <CheckIcon
                        className="h-6 w-6 absolute left-0 top-0 z-20"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {/* {board.staticImage} */}
                  <Image src={board.staticImage} alt="name" />
                  <div className="flex items-center justify-center mt-2 relative z-10">
                    <span className="mr-2 text-sm font-[proxima-nova] text-[color:var(--secondary-color)]">
                      {board.name}
                    </span>
                    <Tooltip content={board.content} side="top">
                      <QuestionMarkCircleIcon className="w-5 h-5" />
                    </Tooltip>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default NeonBackboard
