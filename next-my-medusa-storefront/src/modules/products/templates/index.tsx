import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import Breadcrumb from "@modules/common/components/breadcrumb"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
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
import ProductForm from "./product-form"

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

  const { title: collectionTitle, handle } = product.collection
  // const { addToCart } = useProductActions()

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

  return (
    <ProductProvider product={product}>
      <div className="content-container">
        <Breadcrumb
          className="mt-6"
          items={[{ name: collectionTitle, url: "/collections/" + handle }]}
        />
        <ProductForm product={product} />
      </div>
    </ProductProvider>
  )
}

export default ProductTemplate
