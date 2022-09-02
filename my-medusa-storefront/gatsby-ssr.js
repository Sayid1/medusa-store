import Medusa from "@medusajs/medusa-js"
import React from "react"
import Layout from "./src/components/layout"
import { MedusaProvider } from "./src/context/medusa-context"

const BASE_URL =
  process.env.GATSBY_MEDUSA_BACKEND_URL || "http://localhost:9000"

const medusaClient = new Medusa({ baseUrl: BASE_URL })

export const wrapPageElement = ({ element, props }) => {
  return (
    <MedusaProvider client={medusaClient}>
      <Layout {...props}>{element}</Layout>
    </MedusaProvider>
  )
}

export function onRenderBody({ setHeadComponents }) {
  setHeadComponents(
    [
      <script
        type="text/javascript"
        src="https://accounts.google.com/gsi/client"
        async
        defer
      />,
    ],
    [
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v14.0&appId=631318755004386&autoLogAppEvents=1"
        nonce="2iKJK5sx"
      ></script>,
    ]
  )
}
