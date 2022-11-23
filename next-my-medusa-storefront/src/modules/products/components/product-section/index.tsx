import React, { useState } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface ProductSectionProps {
  title: React.ReactNode
  index: number
  children: React.ReactNode
  open: boolean
  selected?: React.ReactNode
}

const ProductSection = ({
  title,
  index,
  children,
  selected,
  open = false,
}: ProductSectionProps) => {
  const [open1, setOpen1] = useState(open)
  return (
    <details
      className="group shadow-xl rounded-xl overflow-hidden mb-6 pb-6"
      open={open}
    >
      <summary
        onClick={() => setOpen1(!open1)}
        className="h-[50px] flex items-center justify-between text-white flex cursor-pointer select-none text-left leading-7"
      >
        <div className="bg-[#9C1AA8] flex h-full w-full justify-between items-center relative pl-20 pr-4">
          <span
            className="inline-block absolute left-0 w-10 h-full pl-5 text-3xl flex items-center text-[#9C1AA8] bg-[color:var(--fourth-color)] mr-12
            after:content-['']
            after:absolute
            after:right-[-24px]
            after:border-[25px]
            after:border-r-0
            after:border-solid
            after:border-[transparent]
            after:border-l-[color:var(--fourth-color)]"
          >
            {index}
          </span>
          <span style={{ verticalAlign: "inherit" }}>
            <span
              style={{ verticalAlign: "inherit" }}
              className="font-medium text-xl uppercase tracking-wide"
            >
              {title}
            </span>
          </span>

          {!open1 && (
            <span className="ml-4 text-lg font-thin text-[#FEEE10]">
              {selected}
            </span>
          )}
          <PlusIcon className="w-6 h-6 group-open:hidden" aria-hidden="true" />
          <XMarkIcon
            className="w-6 h-6 hidden group-open:block"
            aria-hidden="true"
          />
        </div>
      </summary>
      <div className="px-4 pt-6">{children}</div>
    </details>
  )
}

export default ProductSection
