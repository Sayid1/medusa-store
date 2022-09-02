import { useRef, useCallback, useMemo } from "react"
import { createPopper } from "@popperjs/core"

export default function usePopper(options) {
  let reference = useRef(null)
  let popper = useRef(null)

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
      referenceDomNode => {
        if (reference) {
          reference.current = referenceDomNode
          instantiatePopper()
        }
      },
      popperDomNode => {
        if (popper) {
          popper.current = popperDomNode
          instantiatePopper()
        }
      },
    ],
    [reference, popper, instantiatePopper]
  )
}
