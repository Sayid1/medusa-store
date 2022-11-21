import { Popover, Transition } from "@headlessui/react"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import { Fragment } from "react"
import { CalculatedVariant } from "types/medusa"

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  return (
    <div className="h-full z-50" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full">
        <Link href="/cart" passHref>
          <Popover.Button className="h-full flex items-center relative">
            <ShoppingBagIcon className="h-8 w-8" aria-hidden="true" />
            <span className="font-DIN absolute flex items-center justify-center w-px h-px p-3 text-xl top-[10px] -right-[11px] bg-white text-[#9C1AA8] rounded-full">
              {totalItems}
            </span>
          </Popover.Button>
        </Link>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white w-[482px] rounded-b-md border-x border-b border-gray-200 text-gray-900"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-2xl">Shopping Bag</h3>
            </div>
            {cart && items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => {
                      return (
                        <div
                          className="relative grid grid-cols-[122px_1fr] gap-x-4 items-center"
                          key={item.id}
                        >
                          <div className="w-[122px]">
                            <Thumbnail thumbnail={item.thumbnail} size="full" />
                          </div>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[250px]">
                                    <Link
                                      href={`/products/${item.variant.product.handle}`}
                                      passHref
                                    >
                                      <a>
                                        {
                                          (
                                            item.metadata as Record<
                                              string,
                                              string
                                            >
                                          ).name
                                        }
                                      </a>
                                    </Link>
                                  </h3>
                                  <LineItemOptions variant={item} />
                                  <span className="text-lg">
                                    Quantity: {item.quantity}
                                  </span>
                                </div>
                                <div className="flex justify-end">
                                  <LineItemPrice
                                    region={cart.region}
                                    variant={item.variant as CalculatedVariant}
                                    quantity={item.quantity}
                                    style="tight"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 right-4">
                              <button
                                className="text-[red]"
                                onClick={() => deleteItem(item.id)}
                                title="remove"
                              >
                                <Trash size={14} className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">
                      Subtotal{" "}
                      {/* <span className="font-normal">(incl. taxes)</span> */}
                    </span>
                    <span className="text-xl font-DIN">
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <Link href="/cart" passHref>
                    <a>
                      <Button>Go to bag</Button>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-[#9C1AA8] text-xl flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span className="text-lg">Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <a>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
