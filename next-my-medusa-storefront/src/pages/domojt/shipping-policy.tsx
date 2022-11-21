import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const ShippingPolicy: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Shipping Policy"
        description="If you're looking for the best quality LED neon signs (yet still bang for the buck), we're the place to go. We pride ourselves on our awesome customer service and our team of experienced, ardent,..."
      />
      <div className="relative overflow-hidden pt-10">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[60rem] leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Shipping Policy
            </h1>
            <p className="mt-4 max-w-[405px] text-[#3c4043] font-light text-base">
              Need an answer about Google for Small Business? We&apos;ve got you
              covered on the most commonly asked questions.
            </p>
            <section>
              <div className="mt-12 divide-y divide-slate-200">
                This Privacy Policy governs how Neon Signs Now collects, uses,
                maintains and discloses information collected from users (each,
                a &quot;user&quot;) of the NeonSignsNow.Com website. This
                privacy policy applies to the Site and all products and services
                offered by NeonSignsNow.Com.
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

ShippingPolicy.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ShippingPolicy
