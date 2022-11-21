import clsx from "clsx"
import { useNavigationCollections } from "@lib/hooks/use-layout-data"
import Link from "next/link"
import Paypal from "@modules/common/icons/paypal"
import Mastercard from "@modules/common/icons/card-Mastercard"
import Amex from "@modules/common/icons/card-amex"
import Visa from "@modules/common/icons/card-visa"
import Discover from "@modules/common/icons/card-discover"
import Diners from "@modules/common/icons/card-diners"

const FooterNav = () => {
  const { data } = useNavigationCollections()
  const roots = data?.root

  return (
    <div className="content-container flex flex-col gap-y-8 pt-16 pb-8">
      <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
        <div>
          <Link href="/">
            <a className="text-xl-semi uppercase">DOMOJT</a>
          </Link>
        </div>
        <div className="text-small-regular grid grid-cols-4 gap-x-16">
          {roots?.map((root) => (
            <div className="flex flex-col gap-y-2" key={root.id}>
              <span className="text-2xl font-light">{root.title}</span>
              <ul className="grid grid-cols-1 gap-y-2">
                {root.items?.map((c) => (
                  <li key={c.id}>
                    <Link href={`/collections/${c.id}`}>
                      <a className="text-xl hover:text-[#FEEE10] transition-all hover:underline">
                        {c.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-y-2">
            <span className="text-2xl font-light">Domojt</span>
            <ul className="grid grid-cols-1 gap-y-2 text-xl">
              <li>
                <Link href="/domojt/about-us">
                  <a className="hover:underline">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/faqs">
                  <a className="hover:underline">FAQs</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/contact-us">
                  <a className="hover:underline">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/privacy-policy">
                  <a className="hover:underline">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/terms-of-service">
                  <a className="hover:underline">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/refund-policy">
                  <a className="hover:underline">Refund Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/domojt/shipping-policy">
                  <a className="hover:underline">Shipping Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xl text-white">
          © Copyright 2022 by DOMOJT. All Rights Reserved.
        </span>
        <div>
          <ul className="flex gap-x-2">
            <li>
              <Paypal />
            </li>
            <li>
              <Mastercard />
            </li>
            <li>
              <Visa />
            </li>
            <li>
              <Amex />
            </li>
            <li>
              <Discover />
            </li>
            <li>
              <Diners />
            </li>
          </ul>
        </div>
        {/* <div className="min-w-[316px] flex xsmall:justify-end">
          <CountrySelect />
        </div> */}
      </div>
    </div>
  )
}

export default FooterNav
