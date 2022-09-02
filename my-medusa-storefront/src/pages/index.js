import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import React from "react"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import CollectionPreview from "../components/categories/collection-preview"
import ProductListItem from "../components/products/product-list-item"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import Home from "../components/home"
import { useCollections } from "../hooks/use-collections"

const IndexPage = ({ data }) => {
  const { products, collections } = data
  const prods = data.products.edges.map(edge => edge.node)
  const collectionPreviews = useCollections(collections, products)
  console.log("collections", collections)
  // window.fbAsyncInit = function () {
  //   window.FB.init({
  //     appId: "631318755004386",
  //     cookie: true,
  //     xfbml: true,
  //     version: "v14.0",
  //   })

  //   window.FB.AppEvents.logPageView()
  // }
  // ;(function (d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0]
  //   if (d.getElementById(id)) {
  //     return
  //   }
  //   js = d.createElement(s)
  //   js.id = id
  //   js.src = "https://connect.facebook.net/en_US/sdk.js"
  //   fjs.parentNode.insertBefore(js, fjs)
  // })(document, "script", "facebook-jssdk")

  // window.FB.getLoginStatus(function (response) {
  //   // statusChangeCallback(response)
  //   console.log(response)
  // })

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <div className="my-12 min-h-0">
        {/* pl-[length:var(--default-pl)] */}
        <selection className="block max-w-[length:var(--max-width)] mx-auto px-[25px]">
          <h1
            className="font-sans leading-[1.05] text-[radial-gradient(circle, var(--colors-hiContrast), var(--colors-indigo12))] text-[min(max(35px,10.2vw),79px)]"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(206 24.0% 9.0%), hsl(226 62.0% 17.0%))",
              "-webkit-background-clip": "text",
            }}
          >
            Why Waste <br></br>Time Looking for<br></br>Other Neon Signs?
          </h1>
          <div className="max-w-[700px] font-sans text-[hsl(206_6.0%_43.5%)] text-2xl leading-normal my-6">
            <p>
              Custom Light up Sign ideal for your Wedding, bridal shower,
              engagement and great gift idea. Get Special Offers. Free
              Giveaways. Customize Your Neon. Free Worldwide Shipping.
            </p>
          </div>
          <span
            onClick={() =>
              window.open(
                "https://web.whatsapp.com://send?text=This is whatsapp sharing example using button"
              )
            }
            className="cursor-pointer inline-flex text-2xl uppercase items-center rounded bg-[rgb(15_15_15)] font-medium px-4 py-2 mb-12 text-white shadow-[0_0_0_2px_hsl(300_99.4%_67.1%/0.102),-15px_0_30px_-15px_hsl(24_100%_49.9%/0.523),0_0_30px_-15px_hsl(322_99.7%_55.4%/0.608),15px_0_30px_-15px_hsl(250_99.7%_66.1%/0.733)]"
          >
            Get premium quote
            <ArrowLongRightIcon className="w-6 h-6 ml-2" aria-hidden />
          </span>
        </selection>
        {/* <Grid
          title={"Featured"}
          cta={{ to: "/products", text: "Browse all products" }}
        >
          {prods.slice(0, 4).map(p => {
            return <ProductListItem product={p} key={p.handle} />
          })}
        </Grid> */}

        <section className="block mr-6">
          <Link
            to={"/collections"}
            className="block mb-4 flex justify-end items-center font-sans text-right text-white text-lg font-light hover:underline"
          >
            view all collections{" "}
            <ArrowLongRightIcon className="w-6 h-6 ml-2" aria-hidden />
          </Link>
          <div className="pl-[length:var(--default-pl)] mb-12 grid grid-flow-col auto-cols-min gap-5 overflow-x-auto overflow-y-hidden">
            {collectionPreviews.map(collection => (
              <CollectionPreview key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
        <Home />
      </div>
    </>
  )
}
export const query = graphql`
  query {
    products: allMedusaProducts {
      edges {
        node {
          handle
          title
          collection_id
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
        }
      }
    }
    collections: allMedusaCollections {
      edges {
        node {
          id
          title
          handle
          metadata {
            image
          }
        }
      }
    }
  }
`

export default IndexPage
