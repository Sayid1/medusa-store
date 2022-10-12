import CustomTemplate from "@modules/custom-neon/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const CustomNeon: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Custom Your Neon Sign"
        description="View your shopping bag"
      />
      <CustomTemplate />
    </>
  )
}

CustomNeon.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default CustomNeon
