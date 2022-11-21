import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Link from "next/link"
import { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)

  return (
    <div className="p-6 md:p-10 border-b border-gray-200 gap-y-4 flex flex-col">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-[122px_1fr] items-center md:gap-x-4"
                key={item.id}
              >
                <div className="hidden md:block w-[122px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex items-start justify-between">
                      <div className="w-full">
                        <h3 className="text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            <a>{item.title}</a>
                          </Link>
                        </h3>
                        <LineItemOptions variant={item} />
                        <div className="flex justify-between items-center">
                          <span className="text-base">
                            Quantity: {item.quantity}
                          </span>
                          <div className="md:hidden">
                            <LineItemPrice
                              quantity={item.quantity}
                              region={region}
                              variant={item.variant as CalculatedVariant}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block flex justify-end">
                        <LineItemPrice
                          quantity={item.quantity}
                          region={region}
                          variant={item.variant as CalculatedVariant}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
