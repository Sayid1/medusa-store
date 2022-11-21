import Image from "next/image"
import { Image as MedusaImage } from "@medusajs/medusa"
import React, { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import classNames from "clsx"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ProductImages = ({ images }: ImageGalleryProps) => {
  const [current, setCurrent] = useState(0)

  const handleInfiniteChange = (change: number) => {
    if (current + change < 0) {
      setCurrent(images.length - 1)
    } else if (current + change > images.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + change)
    }
  }

  return (
    <>
      <div className="relative flex justify-center rounded-lg overflow-hidden sticky top-[5.5rem]">
        {images.length > 1 && (
          <>
            {/* <span className="text-sm absolute right-4 top-3 z-10">
              {`${current + 1} / ${images?.length}`}
            </span> */}
            <div className="absolute flex items-center justify-between h-full px-4 my-auto left-0 right-0 z-10">
              <ChevronLeftIcon
                className="w-8 h-8 cursor-pointer"
                aria-hidden
                onClick={() => handleInfiniteChange(-1)}
              />
              <ChevronRightIcon
                className="w-8 h-8 cursor-pointer"
                aria-hidden
                onClick={() => handleInfiniteChange(1)}
              />
            </div>
          </>
        )}
        <div className="w-full">
          <Image
            layout="responsive"
            width={1}
            height={1}
            src={images[current].url}
            alt={`Product #${current + 1}`}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="hidden lg:flex items-center justify-center mt-4">
          {images.map((image, index) => {
            return (
              <button
                key={index}
                className={classNames(
                  "w-14 h-14 relative rounded-md border overflow-hidden mr-4 last:mr-0",
                  current === index
                    ? "border-[#e77600] opacity-100 shadow-md	shadow-black"
                    : "border-[#a2a6ac] opacity-75"
                )}
                onClick={() => setCurrent(index)}
              >
                <Image
                  src={image.url}
                  alt={`Product #${index + 1}`}
                  layout="fill"
                />
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ProductImages
