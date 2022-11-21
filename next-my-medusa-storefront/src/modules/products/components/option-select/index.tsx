import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import ProductSection from "@modules/products/components/product-section"
import clsx from "clsx"
import React, { useEffect } from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <ProductSection index={1} title={"Select " + title} open selected={current}>
      <div className="flex flex-col gap-y-3">
        {/* <label className="block">SELECT {title.toUpperCase()}</label> */}
        <div className="flex gap-4 flex-wrap">
          {filteredOptions.map((v) => {
            return (
              <div
                key={v}
                onClick={() => updateOption({ [option.id]: v })}
                className={clsx(
                  "flex-1 flex flex-col items-center justify-center w-[calc(33%_-_1rem)] rounded-xl h-[60px] text-lg font-semibold bg-[color:var(--secondary-bg-color)] cursor-pointer",
                  {
                    "!bg-[#9C1AA8] !text-white": v === current,
                    "border-2 hover:border-2 hover:border-[#9C1AA8] hover:border-solid":
                      v !== current,
                  }
                )}
              >
                {v}
                {/* <div className=" mt-1">${s.price}</div> */}
              </div>
            )
          })}
        </div>
      </div>
    </ProductSection>
  )
}

export default OptionSelect
