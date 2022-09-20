import { medusaClient } from "@lib/config"
import Client from "@medusajs/medusa-js/dist/request"
import React, { createContext, useContext } from "react"

interface ClientContext {
  client: Client
}

interface ClientProviderProps {
  children?: React.ReactNode
}

const ClientContext = createContext<ClientContext | null>(null)

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <ClientContext.Provider
      value={{
        client: medusaClient.collections.client,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  const context = useContext(ClientContext)

  if (context === null) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}
