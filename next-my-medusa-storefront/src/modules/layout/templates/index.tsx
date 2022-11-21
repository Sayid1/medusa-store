import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import Cookie from "@modules/cookie"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import clsx from "clsx"

const Layout = ({ children }: React.PropsWithChildren<any>) => {
  const router = useRouter()
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    console.log("pathname", "-", router, "-")
    router.pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [router, router.pathname])

  return (
    <div className="bg-[color:var(--primary-bg)] relative min-h-[100vh] flex flex-col">
      <div
        className={clsx(
          // radial-gradient(circle at top right, #e61a5e, #5e1ae6)
          // bg-gradient-to-tr from-[#9C1AA8] via-[#FFB119] to-[#FEEE10]
          "absolute z-0 top-0 right-0 left-0 h-[100vh] overflow-hidden",
          {
            "bg-gradient-radial from-[#e61a5e] to-[#5e1ae6]": isHome,
          }
        )}

        // transform: "translateX(-50%)",
        // backgroundImage: "var(--rg)",
      >
        {/* <div
          className="w-full absolute top-0 bottom-0bg-no-repeat"
          style={{
            // transform: "translateX(-50%)",
            backgroundImage:
              "radial-gradient(circle, #822782, #681c58, #491636, #29101b, #000000)",
          }}
        ></div> */}
      </div>
      <Nav />
      <main className="relative flex-1">{children}</main>
      <Footer />
      <Cookie />
    </div>
  )
}

export default Layout
