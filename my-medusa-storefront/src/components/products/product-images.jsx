import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { classNames } from "../../utils/class-names"

const ProductImages = ({ images = [] }) => {
  const [current, setCurrent] = useState(0)

  const handleInfiniteChange = change => {
    if (current + change < 0) {
      setCurrent(images.length - 1)
    } else if (current + change > images.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + change)
    }
  }

  return (
    <div>
      <div className="relative h-auto w-full rounded-lg overflow-hidden">
        {
          images.length > 1 &&
          <>
            <span className="text-sm absolute right-4 top-3 z-10">
              {`${ current + 1 } / ${images?.length}`}
            </span>
            <div className="absolute flex items-center justify-between h-full px-4 my-auto left-0 right-0 z-10">
              <ChevronLeftIcon className="w-8 h-8" aria-hidden onClick={() => handleInfiniteChange(-1)} />
              <ChevronRightIcon className="w-8 h-8" aria-hidden onClick={() => handleInfiniteChange(1)} />
            </div>
          </>
        }

        <GatsbyImage
          className="relative h-auto w-full object-cover object-center"
          image={images[current].image.childImageSharp.gatsbyImageData}
          alt={`Product #${current + 1}`}
        />
      </div>

      {
        images.length > 1 &&
        <div className="hidden lg:flex items-center justify-center  mt-4">
          {images.map(({ image }, index) => {
            return (
              <button
                key={index}
                className={classNames(
                  "rounded-md border overflow-hidden mr-4 last:mr-0",
                  current === index
                    ? "border-[#e77600] opacity-100 shadow-md	shadow-black"
                    : "border-[#a2a6ac] opacity-75"
                )}
                onClick={() => setCurrent(index)}
              >
                <GatsbyImage
                  image={image.childImageSharp.gatsbyImageData}
                  alt={`Product #${index + 1}`}
                  objectFit="cover"
                  objectPosition="center"
                  className="w-14 w-14"
                />
              </button>
            )
          })}
        </div>
      }
    </div>
  )
}

export default ProductImages
