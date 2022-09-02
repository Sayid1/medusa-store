import React from "react"
import Detail from '../ui/detail'
import { classNames } from "../../utils/class-names"
import { onlyUnique } from "../../utils/only-unique"

const ProductOptionSelector = ({ option, current, updateOption }) => {
  console.log('current', current)
  const filteredOptions = option.values.map(v => v.value).filter(onlyUnique)
  return (
    <Detail index={1} title={'Select ' + option.title} open>
      <div className="text-sm">
        <div>
          {filteredOptions.map((v, index) => {
            return (
              <button
                key={index}
                className={classNames(
                  v === current
                    ? "bg-[color:var(--fourth-color)] text-white"
                    : "bg-ui hover:bg-[color:var(--fourth-hover-color)] hover:text-white",
                  "mt-6 font-[proxima-nova] inline-flex items-center justify-center rounded-sm text-base h-12 px-12 mr-2 last:mr-0 hover:text-white"
                )}
                onClick={() => updateOption({ [option.id]: v })}
              >
                {v}
              </button>
            )
          })}
        </div>
      </div>
    </Detail>
  )
}

export default ProductOptionSelector
