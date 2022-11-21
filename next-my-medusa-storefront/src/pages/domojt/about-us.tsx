import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const AboutUs: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="ABOUT US"
        description="If you're looking for the best quality LED neon signs (yet still bang for the buck), we're the place to go. We pride ourselves on our awesome customer service and our team of experienced, ardent,..."
      />
      <div className="relative overflow-hidden pt-10">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[60rem] leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              ABOUT US
            </h1>
            <p className="mt-4 max-w-[405px] text-[#3c4043] font-light text-base">
              Need an answer about Google for Small Business? We’ve got you
              covered on the most commonly asked questions.
            </p>
            <section>
              <div className="mt-12 divide-y divide-slate-200">
                <p className="leading-8">
                  If you&apos;re looking for the best quality LED neon signs
                  (yet still bang for the buck), we&apos;re the place to go. We
                  pride ourselves on our awesome customer service and our team
                  of experienced, ardent, and skilled people. Customer
                  satisfaction is the key objective of Neon Signs Now, and we
                  are focusing all our efforts to increase customer
                  satisfaction. We follow transparency, follow ethical
                  practices, and extend products in a cost-effective manner.
                  We&apos;ve got you covered with our wide array of available
                  sets of pre-designed neons, and different neon colors, styles,
                  materials, and more. We can also turn your sketch, logo, or
                  artwork into an LED neon sign as we have our in-house
                  professional designers who are always ready to help and gladly
                  share insights to make an even perfect product for you. With
                  us, you can shop with confidence knowing that our team will
                  always be on standby to address any questions or concerns you
                  may have - from customizing, placing your order, pricing, and
                  up to track your package once it is shipped out. Get the most
                  out of your money with us at Neon Signs Now!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

AboutUs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default AboutUs
