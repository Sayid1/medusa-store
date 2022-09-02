import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../styles/theme.css"
import "./layout.css"
import Footer from "./footer"
import Header from "./header/index"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="bg-[color:var(--primary-bg)] relative">
      <div className="absolute z-0 inset-0 overflow-hidden">
        <div className="w-full absolute top-0 bottom-0 left-1/2 bg-no-repeat"
          style={{
            transform: 'translateX(-50%)',
            backgroundImage: 'var(--rg)'
          }}></div>
      </div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
