import React, { useRef } from "react"
import { useProductActions } from "@lib/context/product-context"
import ImagePreview from "../components/image-preview"
import CustomStep from "../components/custom"
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

const CustomTemplate: React.FC = () => {
  const { addToCart } = useProductActions()
  const textRef = useRef<HTMLDivElement>(null)

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
    },
  })

  const { watch, handleSubmit } = formMethods

  const submit = (option: any) => {
    // @ts-ignore
    if (textRef.current?.validate()) {
      addToCart({
        name: option.content,
        font: option.font.font,
        size: option.size,
        color: option.colour.color,
        useage: option.useage,
        boardStyle: option.boardStyle,
        plug: option.plug.name,
        boardColor: option.boardColor.name,
      })
    }
  }

  return (
    // <ProductProvider product={product}>
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
            <div className="col-span-2 sm:sticky sm:p-8 sm:top-20 flex flex-col shadow-xl rounded-xl p-4 ">
              <CustomStep textRef={textRef} />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
    // </ProductProvider>
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
