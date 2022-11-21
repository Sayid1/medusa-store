import React from "react"
import Title from "./title"

const Why = () => {
  return (
    <section className="block my-12 max-w-[length:var(--max-width)] mx-auto px-[25px]">
      <Title
        module="Why Acson"
        title={
          <span>
            Spend less to <br></br>get better quality neon lights
          </span>
        }
      />
      <div className="mb-12 pr-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 className="mb-2 text-xl">
            One of the most well-known advantages of manufacturing in China is
            that it&apos;s cheaper than making goods in many other countries.
          </h3>
          <p className="text-lg">
            It’s no secret that robust UI components are tricky to build.
            Nailing accessibility details and complex logic sucks time away from
            product feature development. With Radix, you can focus on your
            unique engineering challenges instead.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl">Save time. Ship faster.</h3>
          <p className="text-lg">
            It’s no secret that robust UI components are tricky to build.
            Nailing accessibility details and complex logic sucks time away from
            product feature development. With Radix, you can focus on your
            unique engineering challenges instead.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Why
