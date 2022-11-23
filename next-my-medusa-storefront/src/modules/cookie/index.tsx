import React, { useLayoutEffect, useState } from "react"
import clsx from "clsx"

const Cookie = () => {
  const [show, setShow] = useState(false)
  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000)
  }, [])

  return (
    <div
      className={clsx(
        "fixed left-8 bottom-0 translate-y-full bg-white rounded-md w-[380px] py-4 px-8 transition-all",
        {
          "!translate-y-0 !bottom-8": show,
        }
      )}
    >
      {/* <h1 className="text-2xl text-center">Want a cookie? 🍪</h1>
      <div className="text-lg mt-2">
        This website stores information about you via the deposit of cookies in
        order to measure the audience of the site. This navigation data is
        anonymized.
      </div>
      <div className="flex justify-around mt-4 text-lg underline">
        <button>Do Not Sell My Personal Information</button>
        <button className="decoration-[red]">Accept All Cookie</button>
      </div> */}
    </div>
  )
}

export default Cookie
