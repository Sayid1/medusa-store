import React, { useRef, useCallback, useMemo } from "react"
import { createPopper } from "@popperjs/core"
import { OptionsGeneric, Modifier } from "@popperjs/core"

type Options = Partial<OptionsGeneric<Partial<Modifier<any, any>>>> | undefined

export default function usePopper(options: Options) {
  let reference = useRef<HTMLElement | null>(null)
  let popper = useRef<HTMLElement | null>(null)

  let cleanupCallback = useRef(() => {})

  let instantiatePopper = useCallback(() => {
    if (!reference.current) return
    if (!popper.current) return

    if (cleanupCallback.current) cleanupCallback.current()

    cleanupCallback.current = createPopper(
      reference.current,
      popper.current,
      options
    ).destroy
  }, [reference, popper, cleanupCallback, options])

  return useMemo(
    () => [
      (referenceDomNode: HTMLElement) => {
        if (reference) {
          reference.current = referenceDomNode
          instantiatePopper()
        }
      },
      (popperDomNode: HTMLElement) => {
        if (popper) {
          popper.current = popperDomNode
          instantiatePopper()
        }
      },
    ],
    [reference, popper, instantiatePopper]
  )
}
