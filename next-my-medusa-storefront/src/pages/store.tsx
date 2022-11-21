import { StoreGetProductsParams } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useState } from "react"
import { NextPageWithLayout } from "types/global"
import { useCollections } from "medusa-react"

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const { collections } = useCollections()
  const [index, setIndex] = useState<number | undefined>()

  const onNext = () => {
    if (!collections) return
    const collectionIds = params.collection_id
    if (collectionIds) {
      const curIndex = collections?.findIndex((c) => c.id === collectionIds[0])
      console.log("curIndex", curIndex)
      if (curIndex < collections.length - 1) setIndex(curIndex + 1)
    } else {
      setIndex(undefined)
    }
  }
  const onPrev = () => {
    if (!collections) return
    const collectionIds = params.collection_id
    if (collectionIds) {
      const curIndex = collections?.findIndex((c) => c.id === collectionIds[0])
      if (curIndex <= 0) setIndex(undefined)
      else setIndex(curIndex - 1)
    } else {
      setIndex(undefined)
    }
  }

  return (
    <>
      <Head title="Store" description="Explore all of our products." />
      <div className="flex flex-col small:flex-row small:items-start py-6">
        <RefinementList
          refinementList={params}
          setRefinementList={setParams}
          index={index}
        />
        <InfiniteProducts params={params} onNext={onNext} onPrev={onPrev} />
      </div>
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
