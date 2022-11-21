import { fetchProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import { useEffect, useMemo, TouchEvent } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"

type InfiniteProductsType = {
  params: StoreGetProductsParams
  onPrev: () => void
  onNext: () => void
}

const InfiniteProducts = ({ params, onPrev, onNext }: InfiniteProductsType) => {
  const { cart } = useCart()

  const { ref, inView } = useInView()

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  let initialX: number | undefined
  let initialY: number | undefined
  let moveX: number | undefined
  let moveY: number | undefined

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    initialX = e.touches[0].clientX
    initialY = e.touches[0].clientY
  }
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    moveX = e.touches[0].clientX
    moveY = e.touches[0].clientY
  }
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!initialX || !initialY || !moveX || !moveY) {
      return
    }
    var diffX = initialX - moveX
    var diffY = initialY - moveY

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        // swiped left
        console.log("swiped left")
        onNext()
      } else {
        onPrev()
        // swiped right
        console.log("swiped right")
      }
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        console.log("swiped up")
      } else {
        // swiped down
        console.log("swiped down")
      }
    }

    initialX = undefined
    initialY = undefined
    moveX = undefined
    moveY = undefined
  }

  return (
    <div
      className="flex-1 content-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default InfiniteProducts
