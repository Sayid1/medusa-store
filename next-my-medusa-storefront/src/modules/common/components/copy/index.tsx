import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid"
import React, { useState, useEffect } from "react"

const Copy = ({ onCopy, text }: { onCopy?: () => void; text?: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [copied])

  const copy = () => {
    if (text) navigator.clipboard.writeText(text)
    onCopy?.()
    setCopied(true)
  }

  return (
    (copied && (
      <ClipboardDocumentCheckIcon className="w-5 h-5 fill-[#9C1AA8]" />
    )) || (
      <ClipboardDocumentIcon
        className="w-5 h-5 cursor-pointer"
        onClick={copy}
      />
    )
  )
}

export default Copy
