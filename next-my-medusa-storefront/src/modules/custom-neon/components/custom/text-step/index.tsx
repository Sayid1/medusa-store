// @ts-nocheck
import React, { useRef, useImperativeHandle, useState, useEffect } from "react"
import Textarea from "@modules/common/components/textarea"
import IconWarnning from "@modules/common/icons/warnning"

type TextSteppProps = {
  onChange: (content: string) => void
  content?: string
}

const TextStep = React.forwardRef<HTMLDivElement, TextSteppProps>(
  (props, ref) => {
    const [error, setError] = useState(false)
    const textRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      validate() {
        if (!props.content?.trim()) {
          setError(true)
          textRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            // inline: "nearest",
          })
          return false
        }
        return true
      },
    }))

    useEffect(() => {
      if (props.content?.trim()) {
        setError(false)
      }
    }, [props.content])

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange(e.target.value)
    }

    return (
      <div ref={textRef}>
        {error && (
          <div className="flex text-[#dc3545] shadow-[0px_3px_5px_0px] rounded p-2 mt-4">
            <IconWarnning color="#dc3545" className="w-6 h-6 mr-2" /> Please add
            your text.
          </div>
        )}
        <Textarea
          name="content"
          label="content"
          rows={2}
          onChange={onChange}
          value={props.content}
          placeholder="ENTER TEXT HERE Please press Enter to create a new line"
        />
      </div>
    )
  }
)

TextStep.displayName = "TextStep"

// const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   props.onChange(e.target.value)
// }
// <>
//   <textarea
//     className="w-full rounded-xl my-4 p-4 bg-[color:var(--secondary-bg-color)] outline-black"
//     placeholder="ENTER TEXT HERE Please press Enter to create a new line"
//     rows={2}
//     onChange={onChange}
//   >
//     {props.content}
//   </textarea>
// </>
export default TextStep
