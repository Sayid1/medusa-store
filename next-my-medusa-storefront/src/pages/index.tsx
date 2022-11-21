import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import HomeMain from "@modules/home/templates"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the DOMOJT. Worldwide Shipping. Secure Payment."
      />
      <HomeMain />
      {/* <FeaturedProducts /> */}
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
