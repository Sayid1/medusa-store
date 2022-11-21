import React, { useState, Fragment, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { UseControllerProps, Controller } from "react-hook-form"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid"
import { Listbox, Transition } from "@headlessui/react"
import usePopper from "@lib/hooks/use-popper"
import clsx from "clsx"

type Option = {
  label: string
  value: string
}
export type SelectProps = {
  options: Array<Option>
  title?: React.ReactNode
  borderBlack?: Boolean
  filter?: Boolean
  // onChange?: (option: Option) => void
} & UseControllerProps<any> &
  React.SelectHTMLAttributes<Option>

const Select = ({
  name,
  control,
  title,
  options,
  placeholder,
  filter = false,
  borderBlack = true,
}: SelectProps) => {
  let [trigger, container] = usePopper({
    placement: "bottom-start",
    strategy: "fixed",
    modifiers: [
      {
        name: "sameWidth",
        enabled: true,
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`
        },
        phase: "beforeWrite",
        requires: ["computeStyles"],
      },
    ],
  })

  const [val, setVal] = useState("")
  const [filterOptions, setFilterOptions] = useState(options)

  useEffect(() => {
    const o = options.filter(
      (option) =>
        option.label.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        option.value.toLocaleLowerCase().includes(val.toLocaleLowerCase())
    )
    setFilterOptions(o)
  }, [val, options])

  useEffect(() => {}, [])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const onChange = (option: Option) => {
          field.onChange(option.value)
          setTimeout(() => {
            setVal("")
          }, 200)
        }
        return (
          <Listbox value={field.value} onChange={onChange}>
            {({ open }) => (
              <>
                {title && (
                  <Listbox.Label className="text-xl text-[#9C1AA8]">
                    {title}
                  </Listbox.Label>
                )}
                <div className="relative mt-1">
                  <Listbox.Button
                    ref={
                      trigger as unknown as React.LegacyRef<HTMLButtonElement>
                    }
                    className={clsx(
                      "h-10 relative w-full cursor-pointer rounded-md border bg-white pr-10 text-left shadow-sm focus:border-[#9C1AA8] focus:outline-none focus:ring-1 focus:ring-[#9C1AA8] sm:text-sm",
                      {
                        "border-[#9C1AA8]": borderBlack,
                      }
                    )}
                  >
                    <span className="flex items-center">
                      <span
                        className={clsx("ml-3 block truncate text-lg", {
                          "text-gray-500": !field.value,
                        })}
                      >
                        {(field.value &&
                          filterOptions.find(
                            (option) => option.value === field.value
                          )?.label) ||
                          placeholder}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-[#9C1AA8]"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Portal>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      ref={container}
                    >
                      <Listbox.Options className="absolute z-[1000] mt-1 max-h-56 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-[#9C1AA8] ring-opacity-5 focus:outline-none sm:text-sm">
                        {filter && (
                          <li className="flex">
                            <input
                              placeholder="find..."
                              type="text"
                              onInput={(val) => setVal(val.currentTarget.value)}
                              className="pl-6 w-full text-lg block h-[40px] rounded-md border-gray-300 shadow-sm outline-none"
                            />
                          </li>
                        )}
                        {filterOptions.map((option) => {
                          const selected = field.value === option.value
                          return (
                            <Listbox.Option
                              key={option.value}
                              className={({ active }) =>
                                clsx(
                                  selected
                                    ? "text-white !bg-[#9C1AA8]"
                                    : "text-gray-900",

                                  "relative cursor-pointer select-none py-2 pr-9",
                                  {
                                    "bg-[color:var(--secondary-bg-color)]":
                                      active,
                                  }
                                )
                              }
                              value={option}
                            >
                              {({ active }) => (
                                <>
                                  <span
                                    className={clsx(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "ml-3 block truncate text-lg"
                                    )}
                                  >
                                    {option.label}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={clsx(
                                        active
                                          ? "text-white"
                                          : "text-[color:var(--fourth-color)]",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          )
                        })}
                      </Listbox.Options>
                    </Transition>
                  </Portal>
                </div>
              </>
            )}
          </Listbox>
        )
      }}
    />
  )
}

function Portal(props: React.PropsWithChildren<unknown>) {
  let { children } = props
  let [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return createPortal(children, document.body)
}

export default Select
