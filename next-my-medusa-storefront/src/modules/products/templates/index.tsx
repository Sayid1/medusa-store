import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")
  const methods = useForm()

  return (
    <ProductProvider product={product}>
      <FormProvider {...methods}>
        <form>
          <div className="content-container">
            <div className="flex flex-col lg:grid grid-cols-2 gap-14 py-6 relative">
              <div className="flex flex-col">
                <ImageGallery images={product.images} />
              </div>
              <div
                className="sm:sticky sm:top-20 py-8 sm:py-0 flex flex-col gap-y-12"
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
          </div>
        </form>
      </FormProvider>
    </ProductProvider>
  )
}

export default ProductTemplate
