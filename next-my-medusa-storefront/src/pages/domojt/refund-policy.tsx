import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const RefundPolicy: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Refund Policy"
        description="If you're looking for the best quality LED neon signs (yet still bang for the buck), we're the place to go. We pride ourselves on our awesome customer service and our team of experienced, ardent,..."
      />
      <div className="relative overflow-hidden p-10">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[60rem] leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Refund Policy
            </h1>
            <section>
              <div className="mt-12 text-gray-600 text-lg">
                <p>
                  We have a 10-day return policy, which means you have 10 days
                  after receiving your item to request a return.
                </p>{" "}
                <p className="mt-3">
                  To be eligible for a return, your item must be in the same
                  condition that you received it, unworn or unused, with tags,
                  and in its original packaging. You&apos;ll also need the
                  receipt or proof of purchase.
                </p>{" "}
                <p className="mt-3">
                  To start a return, you can contact us at 1154125854@qq.com.
                  Please note that returns will need to be sent to the following
                  address: 地址, 城市, GD, 邮编, China
                </p>{" "}
                <p className="mt-3">
                  If your return is accepted, we&apos;ll send you a return
                  shipping label, as well as instructions on how and where to
                  send your package. Items sent back to us without first
                  requesting a return will not be accepted. Please note that if
                  your country of residence is not China, shipping your goods
                  may take longer than expected.
                </p>
                <p className="mt-3">
                  You can always contact us for any return questions at
                  1154125854@qq.com.
                </p>{" "}
                <h1 className="text-gray-900 my-4">Damages and Issues</h1>{" "}
                <p>
                  Please inspect your order upon receipt and contact us
                  immediately if the item is defective, damaged, or if you
                  receive the wrong item, so that we may evaluate the issue and
                  make it right.
                </p>{" "}
                <p>
                  Certain types of items cannot be returned, like perishable
                  goods (such as food, flowers, or plants), custom products
                  (such as special orders or personalized items), and personal
                  care goods (such as beauty products). We also do not accept
                  returns for hazardous materials, flammable liquids, or gases.
                  Please get in touch if you have questions or concerns about
                  your specific item.
                </p>
                <p className="mt-3">
                  Unfortunately, we cannot accept returns on sale items or gift
                  cards.
                </p>{" "}
                <h1 className="text-gray-900 my-4">Exchanges</h1>{" "}
                <p>
                  The fastest way to ensure you get what you want is to return
                  the item you have, and once the return is accepted, make a
                  separate purchase for the new item.
                </p>{" "}
                <p>European Union 3 day cooling off period</p>{" "}
                <p>
                  Notwithstanding the above, if merchandise is being shipped
                  into the European Union, you have the right to cancel or
                  return your order within 3 days for any reason and without
                  justification. As above, your item must be in the same
                  condition that you received it, unworn or unused, with tags,
                  and in its original packaging. You&apos;ll also need the
                  receipt or proof of purchase.
                </p>{" "}
                <h1 className="text-gray-900 my-4">Refunds</h1>{" "}
                <p>
                  We will notify you once we&apos;ve received and inspected your
                  return to let you know if the refund was approved or not. If
                  approved, you&apos;ll be automatically refunded on your
                  original payment method within 10 business days. Please
                  remember it can take some time for your bank or credit card
                  company to process and post the refund too.
                </p>{" "}
                <p>
                  If more than 15 business days have passed since we&apos;ve
                  approved your return, please contact us at 1154125854@qq.com.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

RefundPolicy.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default RefundPolicy
