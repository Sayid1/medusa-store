import { medusaClient } from "@lib/config"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, Region } from "@medusajs/medusa"
import { formatAmount, useCart } from "medusa-react"
import { useQuery } from "react-query"
import { groupBy, keyBy, pick } from "lodash"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant, ProductCollection } from "types/medusa"

type Collection = Pick<
  ProductCollection,
  "id" | "title" | "thumbnail" | "handle" | "parent_id" | "items"
>
type LayoutCollection = {
  root: Collection[]
  children: Collection[]
}

const fetchCollectionData = async (): Promise<LayoutCollection> => {
  let collections: ProductCollection[] = []
  let offset = 0
  let limit = 50
  let count = 1

  do {
    await medusaClient.collections
      .list({ offset, limit })
      .then(({ collections: newCollections, count: newCount }) => {
        collections = [...collections, ...newCollections]
        count = newCount
        offset = collections.length
      })
      .catch((_) => {
        count = 0
      })
  } while (collections.length < count)

  const newCollection = collections.map((c) =>
    pick(c, ["id", "title", "thumbnail", "handle", "parent_id", "items"])
  )

  const { root, children } = groupBy(newCollection, ({ parent_id }) => {
    if (parent_id === "0") return "root"
    return "children"
  })

  const rootObj = keyBy(root, (collection) => {
    collection.items = []
    return collection.id
  })

  children.forEach((collection) => {
    ;(
      rootObj[collection.parent_id as string].items as typeof newCollection
    ).push(collection)
  })

  return {
    root,
    children,
  }
  // collections.map((c) => ({
  //   id: c.id,
  //   title: c.title,
  // }))
}

export const useNavigationCollections = () => {
  const queryResults = useQuery("navigation_collections", fetchCollectionData, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return queryResults
}

const fetchFeaturedProducts = async (
  cartId: string,
  region: Region
): Promise<ProductPreviewType[]> => {
  const products = await medusaClient.products
    .list({
      is_giftcard: false,
      limit: 4,
      cart_id: cartId,
    })
    .then(({ products }) => products)
    .catch((_) => [] as Product[])

  return products.map((p) => {
    const variants = p.variants as CalculatedVariant[]

    const cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    })

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      thumbnail: p.thumbnail,
      price: {
        calculated_price: formatAmount({
          amount: cheapestVariant.calculated_price,
          region: region,
          includeTaxes: false,
        }),
        original_price: formatAmount({
          amount: cheapestVariant.original_price,
          region: region,
          includeTaxes: false,
        }),
        difference: getPercentageDiff(
          cheapestVariant.original_price,
          cheapestVariant.calculated_price
        ),
        price_type: cheapestVariant.calculated_price_type,
      },
    }
  })
}

export const useFeaturedProductsQuery = () => {
  const { cart } = useCart()

  const queryResults = useQuery(
    ["layout_featured_products", cart?.id, cart?.region],
    () => fetchFeaturedProducts(cart?.id!, cart?.region!),
    {
      enabled: !!cart?.id && !!cart?.region,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  return queryResults
}