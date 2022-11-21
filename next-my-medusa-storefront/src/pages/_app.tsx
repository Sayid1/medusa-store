import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ClientProvider } from "@lib/context/client-context"
import { StoreProvider } from "@lib/context/store-context"
import { CartProvider, MedusaProvider } from "medusa-react"
import { Hydrate } from "react-query"
import "styles/globals.css"
import { AppPropsWithLayout } from "types/global"
import Script from "next/script"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Script id="twak">
        {/* 在线聊天 https://tawk.to */}
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6356423cb0d6371309cb2bec/1gg4f5fsa';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`}
      </Script>
      <GoogleOAuthProvider clientId="277729241237-8ve9sv0uusicmhd93lhktop777jif18k.apps.googleusercontent.com">
        <PayPalScriptProvider
          options={{
            "client-id": PAYPAL_CLIENT_ID,
            components: "buttons",
            currency: "USD",
            intent: "authorize",
          }}
        >
          <MedusaProvider
            baseUrl={MEDUSA_BACKEND_URL}
            queryClientProviderProps={{
              client: queryClient,
            }}
          >
            <Hydrate state={pageProps.dehydratedState}>
              <ClientProvider>
                <CartDropdownProvider>
                  <MobileMenuProvider>
                    <CartProvider>
                      <StoreProvider>
                        <AccountProvider>
                          {getLayout(<Component {...pageProps} />)}
                        </AccountProvider>
                      </StoreProvider>
                    </CartProvider>
                  </MobileMenuProvider>
                </CartDropdownProvider>
              </ClientProvider>
            </Hydrate>
          </MedusaProvider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
