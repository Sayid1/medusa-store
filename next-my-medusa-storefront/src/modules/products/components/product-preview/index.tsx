import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  header = false,
}: ProductPreviewType & { header?: Boolean }) => {
  return (
    <Link href={`/products/${handle}`}>
      <a>
        <div
          className={clsx(
            "group shadow-md rounded-md overflow-hidden hover:scale-105 transition-all"
          )}
        >
          <Thumbnail thumbnail={thumbnail} size="full" />
          <div className="text-xl mt-2 px-2 pb-2">
            <div
              className={clsx(
                "trutext-ellipsis overflow-hidden h-12 relative transition-all",
                {
                  "group-hover:text-[#9C1AA8]": !header,
                  "group-hover:text-[#FEEE10]": header,
                }
              )}
            >
              {title}
            </div>
            <div
              className={clsx("flex items-center gap-x-2 mt-1 transition-all", {
                "group-hover:text-[#9C1AA8]": !header,
                "group-hover:text-[#FEEE10]": header,
              })}
            >
              {price ? (
                <>
                  {price.price_type === "sale" && (
                    <span className="line-through text-gray-500">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={clsx("font-semibold", {
                      "text-rose-500": price.price_type === "sale",
                    })}
                  >
                    {price.calculated_price}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductPreview
