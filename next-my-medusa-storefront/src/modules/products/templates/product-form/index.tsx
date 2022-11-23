import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../../components/image-gallary"
import MobileActions from "../../components/mobile-actions"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { useProductActions } from "@lib/context/product-context"
import {
  COLOURS,
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

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  const { addToCart } = useProductActions()

  const formMethods = useForm({
    defaultValues: {
      colour: COLOURS[0],
      boardColor: boardOptions[0],
      plug: plugOptions[0],
      useage: USEAGE[0],
      size: SIZES[0].size,
      boardStyle: BACKBOARD_STYLES[0].name,
      // usage: usageOptions[0],
    },
  })

  const { handleSubmit, control, watch } = formMethods

  const submit = (option: any) => {
    addToCart({
      name: product.title,
      size: option.size,
      color: option.colour.color,
      useage: option.useage,
      boardStyle: option.boardStyle,
      plug: option.plug.name,
      boardColor: option.boardColor.name,
    })
    // prod_01GF3MQKYSNTYTMCTK82F0FZTJ 定制产品ID
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col lg:grid grid-cols-2 gap-10 py-6 relative">
          <div className="flex flex-col">
            <ImageGallery images={product.images} />
          </div>
          <div
            className="rounded-xl shadow-2xl px-8 py-4 sm:sticky sm:top-20 flex flex-col gap-y-12"
            ref={info}
          >
            <ProductInfo product={product} />
            {/* <ProductTabs product={product} /> */}
          </div>
        </div>
        <div className=" my-16 px-6 sm:px-8 sm:my-32">
          <RelatedProducts product={product} />
        </div>
        <MobileActions product={product} show={!inView} />
      </form>
    </FormProvider>
  )
}

export default ProductTemplate
