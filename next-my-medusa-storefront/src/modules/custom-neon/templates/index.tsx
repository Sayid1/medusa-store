import React, { useRef } from "react"
import ImagePreview from "../components/image-preview"
import CustomStep from "../components/custom"
// import { ColourType, COLOURS, FontType, FONTS } from "@lib/constants"
import { useForm, Control, FormProvider } from "react-hook-form"
import {
  ColourType,
  FontType,
  COLOURS,
  FONTS,
  PLUGS,
  BACKBOARD_COLORS,
  SIZES,
  USEAGE,
  BACKBOARD_STYLES,
} from "@lib/constants"

const plugOptions = PLUGS.map((plug) => ({ id: plug, name: plug }))
const boardOptions = BACKBOARD_COLORS.map((board) => ({
  id: board,
  name: board,
}))

const CustomTemplate = () => {
  const textRef = useRef<HTMLDivElement>(null)
  // const [content, setContent] = useState("")
  // const [font, setFont] = useState<FontType | undefined>(FONTS[0])
  // const [colour, setColour] = useState<ColourType | undefined>(COLOURS[0])

  const formMethods = useForm({
    defaultValues: {
      content: "",
      font: FONTS[0],
      colour: COLOURS[0],
      boardColor: boardOptions[0],
      plug: plugOptions[0],
      useage: USEAGE[0],
      size: SIZES[0].size,
      boardStyle: BACKBOARD_STYLES[0].name,
      // usage: usageOptions[0],
    },
  })

  const { watch, handleSubmit } = formMethods

  const submit = (data: any) => {
    textRef.current?.validate()
    console.log(data)
  }

  return (
    <div className="content-container">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col lg:grid grid-cols-5 gap-14 py-6 relative">
            <div className="flex flex-col col-span-3">
              <ImagePreview
                content={watch("content")}
                font={watch("font")}
                colour={watch("colour")}
              />
            </div>
            <div className="col-span-2 sm:sticky sm:top-20 flex flex-col shadow-xl rounded-xl p-8 ">
              <CustomStep
                textRef={textRef}
                // onContentChange={setContent}
                // content={content}
                // control={control}
                // onFontChange={setFont}
                // onColourChange={setColour}
                // font={font}
                // colour={colour}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CustomTemplate

export type CommonOptionProps = {
  control: Control<
    {
      content: string
      font: FontType
      colour: ColourType
      boardColor: {
        id: string
        name: string
      }
      plug: {
        id: string
        name: string
      }
      useage: string
      size: string
      boardStyle: string
    },
    any
  >
}
