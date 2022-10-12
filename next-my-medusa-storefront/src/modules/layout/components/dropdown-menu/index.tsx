import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

const DropdownMenu = () => {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const { data } = useNavigationCollections()
  const roots = data?.root

  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          <>
            <Link href="/shop" passHref>
              <a className="relative flex h-full">
                <Popover.Button
                  className={clsx(
                    "relative h-full flex items-center transition-all ease-out duration-200"
                  )}
                  onClick={() => push("/store")}
                >
                  SHOP OUR NEON
                </Popover.Button>
              </a>
            </Link>

            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute top-full inset-x-0 text-sm text-gray-700 z-30 border-y border-gray-200"
              >
                <div className="relative bg-white py-8">
                  <div className="flex items-start content-container">
                    {roots?.map((root) => (
                      <div className="flex flex-col mx-8" key={root.id}>
                        <h3 className="text-base-semi text-gray-900 mb-4">
                          {root.title}
                        </h3>
                        <div className="flex items-start">
                          <ul className="min-w-[152px] max-w-[200px]">
                            {root.items?.map((children) => {
                              return (
                                <div key={children.id} className="pb-3">
                                  <Link href={`/collections/${children.id}`}>
                                    <a onClick={() => setOpen(false)}>
                                      {children.title}
                                    </a>
                                  </Link>
                                </div>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    ))}
                    <div className="">
                      <div className="grid grid-cols-3 gap-4">
                        {products?.slice(0, 3).map((product) => (
                          <ProductPreview {...product} key={product.id} />
                        ))}
                        {loadingProducts &&
                          repeat(3).map((index) => (
                            <SkeletonProductPreview key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default DropdownMenu
