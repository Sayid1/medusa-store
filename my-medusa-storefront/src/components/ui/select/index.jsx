import React, { useState, Fragment, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid"
import { Listbox, Transition } from '@headlessui/react'
import usePopper from '../../../hooks/use-popper'
import clsx from 'clsx'

export default ({ defaultValue, options, title }) => {
    const [selected, setSelected] = useState({})
    const [_options, setOption] = useState([])
    // const [_defaultValue, setDefaultValue] = useState({})
    let [trigger, container] = usePopper({
      placement: 'bottom-start',
      strategy: 'fixed',
      modifiers: [{
        name: "sameWidth",
        enabled: true,
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        phase: "beforeWrite",
        requires: ["computeStyles"]
      }],
    })
    useEffect(() => {
      const _options = options.map(option => typeof option === 'string' ? ({ id: option, name: option }) : options)

      let _defaultValue = defaultValue
      if (typeof defaultValue === 'object') {
        _defaultValue = defaultValue.name
      }

      const selected = _options.find(option => option.name === _defaultValue)

      setSelected(selected)
      setOption(_options)
    }, [options])

    return (
        <Listbox value={selected} onChange={setSelected} className="font-[proxima-nova]">
        {({ open }) => (
          <>
            <Listbox.Label>
              { title }
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button ref={trigger} className="h-10 relative w-full cursor-default rounded-md border border-black bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate font-[proxima-nova]">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
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
                <Listbox.Options className="absolute z-1 mt-1 max-h-56 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {_options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        clsx(
                          active ? 'text-white bg-black' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                            <span
                              className={clsx(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate font-[proxima-nova]')}
                            >
                              {option.name}
                            </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-[color:var(--fourth-color)]',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
              </Portal>
            </div>
          </>
        )}
      </Listbox>
    )
}

function Portal(props) {
  let { children } = props
  let [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return createPortal(children, document.body)
}