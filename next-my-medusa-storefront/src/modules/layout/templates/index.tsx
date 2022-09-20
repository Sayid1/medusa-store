import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-[color:var(--primary-bg)] relative">
      <div className="absolute z-0 inset-0 overflow-hidden">
        <div
          className="w-full absolute top-0 bottom-0 left-1/2 bg-no-repeat"
          style={{
            transform: "translateX(-50%)",
            backgroundImage: "var(--rg)",
          }}
        ></div>
      </div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
