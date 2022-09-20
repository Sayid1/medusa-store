import Image from "next/image"
import React from "react"
import Title from "./title"

const Case: React.FC = () => {
  return (
    <section className="block my-12 max-w-[length:var(--max-width)] mx-auto px-[25px]">
      <Title
        module="Case studies"
        title={
          <span>
            People from all over the world <br></br>are using「 Acson」neon
            lights
          </span>
        }
      />
      <div className="mb-12 pr-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-lg flex flex-col border px-6 py-4 font-sans font-light">
          <div className="flex items-center font-sans text-white text-xl font-medium mb-2">
            <span className="w-6 h-6 rounded-full relative overflow-hidden">
              <Image
                src="http://medusa-server.oss-cn-shenzhen.aliyuncs.com/Happy%20Birthday%20To%20You%20Neon%20Sign.jpg"
                alt="A black Medusa hoodie and a white Medusa coffee mug"
                layout="fill"
              />
            </span>
            <span className="text-[color:var(--secondary-color)]">China</span>
          </div>
          <span
            className="text-base text-[color:var(--secondary-color)]"
            style={{ hyphens: "auto" }}
          >
            We’ve been able to focus on building solid user experiences on top
            of Radix Primitives. With UI components, there are just too many
            angles and rabbit holes to cover for product teams that wish to move
            quickly.
          </span>
          <div className="flex items-center mt-5">
            <span className="w-6 h-6 rounded-full relative overflow-hidden">
              <Image
                src="http://medusa-server.oss-cn-shenzhen.aliyuncs.com/Happy%20Birthday%20To%20You%20Neon%20Sign.jpg"
                alt="A black Medusa hoodie and a white Medusa coffee mug"
                layout="fill"
              />
            </span>
            <span className="ml-2 text-sm text-[color:var(--tertiary-color)]">
              Rauno Freiberg
            </span>
          </div>
        </div>
        <div className="rounded-lg flex flex-col border px-6 py-4 font-sans font-light">
          <div className="flex items-center font-sans text-white text-xl font-medium mb-2">
            <span className="w-6 h-6 rounded-full relative overflow-hidden">
              <Image
                src="http://medusa-server.oss-cn-shenzhen.aliyuncs.com/Happy%20Birthday%20To%20You%20Neon%20Sign.jpg"
                alt="A black Medusa hoodie and a white Medusa coffee mug"
                layout="fill"
              />
            </span>
            <span className="text-[color:var(--secondary-color)]">China</span>
          </div>
          <span className="text-base text-[color:var(--secondary-color)]">
            We’ve been able to focus on building solid user experiences on top
            of Radix Primitives. With UI components, there are just too many
            angles and rabbit holes to cover for product teams that wish to move
            quickly.
          </span>
          <div className="flex items-center mt-5">
            <span className="w-6 h-6 rounded-full relative overflow-hidden">
              <Image
                src="http://medusa-server.oss-cn-shenzhen.aliyuncs.com/Happy%20Birthday%20To%20You%20Neon%20Sign.jpg"
                alt="A black Medusa hoodie and a white Medusa coffee mug"
                layout="fill"
              />
            </span>
            <span className="ml-2 text-sm text-[color:var(--tertiary-color)]">
              Rauno sss
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Case
