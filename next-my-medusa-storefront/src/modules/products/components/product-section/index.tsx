import React from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface ProductSectionProps {
  title: React.ReactNode
  index: number
  children: React.ReactNode
  open: boolean
}

const ProductSection = ({
  title,
  index,
  children,
  open = false,
}: ProductSectionProps) => {
  return (
    <details
      className="group shadow-xl rounded-xl overflow-hidden mb-6 pb-6"
      open={open}
    >
      <summary className=" pr-4 bg-black h-[50px] flex items-center justify-between text-white flex cursor-pointer select-none text-left leading-7">
        <div className="flex h-full items-center">
          <span
            className="inline-block relative w-10 h-full pl-5 text-2xl flex items-center bg-[color:var(--fourth-color)] mr-12
            after:content-['']
            after:absolute
            after:right-[-25px]
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
        </div>
        <PlusIcon className="w-6 h-6 group-open:hidden" aria-hidden="true" />
        <XMarkIcon
          className="w-6 h-6 hidden group-open:block"
          aria-hidden="true"
        />
      </summary>
      <div className="px-4">{children}</div>
    </details>
  )
}

export default ProductSection
