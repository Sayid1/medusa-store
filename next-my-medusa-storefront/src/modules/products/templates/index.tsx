import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import Breadcrumb from "@modules/common/components/breadcrumb"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  const { title: collectionTitle, handle } = product.collection
  const { title: productTitle } = product

  return (
    <ProductProvider product={product}>
      <div className="content-container">
        <Breadcrumb
          className="mt-6"
          items={[
            { name: collectionTitle, url: "/collections/" + handle },
            { name: productTitle },
          ]}
        />
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
      </div>
      {/* </form>
      </FormProvider> */}
    </ProductProvider>
  )
}

export default ProductTemplate
