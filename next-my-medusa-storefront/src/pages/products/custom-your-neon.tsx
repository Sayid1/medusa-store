import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import CustomTemplate from "@modules/custom-neon/templates"
import { ProductProvider } from "@lib/context/product-context"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { GetStaticProps } from "next"

const CUSTOM_PRODUCT_ID = "prod_01GF3MQKYSNTYTMCTK82F0FZTJ"

const fetchProduct = async (id: string) => {
  return await medusaClient.products.retrieve(id).then(({ product }) => product)
}

const CustomNeon: NextPageWithLayout<PrefetchedPageProps> = ({ notFound }) => {
  const { query, isFallback, replace } = useRouter()
  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, CUSTOM_PRODUCT_ID],
    () => fetchProduct(CUSTOM_PRODUCT_ID),
    {
      keepPreviousData: true,
    }
  )

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isSuccess)
    return (
      <>
        <Head
          title="Custom Your Neon Sign"
          description="View your shopping bag"
        />
        <ProductProvider product={data}>
          <CustomTemplate />
        </ProductProvider>
      </>
    )

  return <></>
}

CustomNeon.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_product`, CUSTOM_PRODUCT_ID], () =>
    fetchProduct(CUSTOM_PRODUCT_ID)
  )

  const queryData = await queryClient.getQueryData([
    `get_product`,
    CUSTOM_PRODUCT_ID,
  ])

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    },
  }
}

export default CustomNeon
