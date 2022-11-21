import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const faqs = [
  {
    question: "Is there a warranty on my neon sign?",
    answer: (
      <div>
        All new signs from NeonChamp come with a manufacturing warranty that
        protects your signs from all possible damages. In addition, it comes
        with a <strong>3 Year warranty</strong> on all electrical components.
        There are options for replacement based on the source of the damage.
      </div>
    ),
  },
  {
    question: "Do you offer wholesale pricing and shipping?",
    answer: (
      <div>
        We sure do. With our extensive manufacturing capability, we can mass
        produce any standard or custom neon signage that works within your
        company&apos;s volume and budget requirements. For more information,
        please fill out our &quot;Business and Wholesale Enquiries&quot; or send
        us an email at info@londonneon.co.uk
      </div>
    ),
  },
]

const FAQ: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="FAQs"
        description="If you're looking for the best quality LED neon signs (yet still bang for the buck), we're the place to go. We pride ourselves on our awesome customer service and our team of experienced, ardent,..."
      />
      <div className="relative overflow-hidden pt-10">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[60rem] leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              FAQ
            </h1>
            <p className="mt-4 max-w-[405px] text-[#3c4043] font-light text-base">
              Need an answer about Medusa Neon Signs? We’ve got you covered on
              the most commonly asked questions.
            </p>
            <section>
              <div className="mt-12 divide-y divide-slate-200">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group py-4 marker:content-['']"
                  >
                    <summary className="flex w-full cursor-pointer select-none justify-between text-left text-xl font-semibold leading-7 text-slate-900 group-open:text-indigo-600 [&amp;::-webkit-details-marker]:hidden">
                      {faq.question}
                      <svg
                        className="mt-0.5 ml-4 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 12H6"></path>
                        <path className="group-open:hidden" d="M12 6v12"></path>
                      </svg>
                    </summary>
                    <div className="pt-6 pb-6">
                      <div className="text-gray-900 text-lg">{faq.answer}</div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

FAQ.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default FAQ
