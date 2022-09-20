import { useMemo, useState, useEffect } from "react"
import { useMedusa } from "./use-medusa"

export const useCollections = () => {
  const client = useMedusa()
  const [collections, setCollections] = useState({
    rootCollections: [],
    childCollections: [],
  })

  useEffect(async () => {
    const { collections } = await client.collections.list({ limit: 100 })
    const rootCollections = collections.filter(
      collection => collection.parent_id === "0"
    )
    const rootCollectionObj = {}
    rootCollections.forEach(collection => {
      rootCollectionObj[collection.id] = collection
      rootCollectionObj[collection.id].items = []
    })

    const childCollections = collections.filter(
      collection => collection.parent_id !== "0"
    )

    childCollections.forEach(collection => {
      rootCollectionObj[collection.parent_id].items.push(collection)
    })
    console.log("rootCollections", rootCollections)
    setCollections({
      rootCollections,
      childCollections,
    })
  }, [])

  return collections
}
