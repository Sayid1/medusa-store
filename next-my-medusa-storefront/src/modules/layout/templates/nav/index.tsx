import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useAccount } from "@lib/context/account-context"
import Hamburger from "@modules/common/components/hamburger"
import Copy from "@modules/common/components/copy"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import { StarIcon, UserIcon } from "@heroicons/react/24/solid"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Nav = () => {
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isCustom, setIsCustom] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  // const [isScrolled, setIsScrolled] = useState(true)
  const { customer } = useAccount()

  // console.log("account customer", customer)
  //useEffect that detects if window is scrolled > 5px on the Y axis
  // useEffect(() => {
  //   if (isHome) {
  //     const detectScrollY = () => {
  //       if (window.scrollY > 5) {
  //         setIsScrolled(true)
  //       } else {
  //         setIsScrolled(false)
  //       }
  //     }

  //     window.addEventListener("scroll", detectScrollY)

  //     return () => {
  //       window.removeEventListener("scroll", detectScrollY)
  //     }
  //   }
  // }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
    pathname === "/products/custom-your-neon"
      ? setIsCustom(true)
      : setIsCustom(false)
    pathname === "/products/upload-your-artwork-logo"
      ? setIsUpload(true)
      : setIsUpload(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <>
      <div className="relative bg-[#f7ff02] text-gray-800 h-7 leading-7 text-xl font-semibold text-center flex justify-center items-center">
        GET 10% OFF ON YOUR ORDER. USE CODE: SAVE-10
        <Copy text="SAVE-10" />
      </div>
      {/* <div className="relative h-20 sm:h-12 flex items-center justify-center text-white">
        <ul className="h-full grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:divide-x-2 sm:divide-white">
          <li className="flex items-center justify-center sm:px-6 sm:h-6">
            <Image src="/quick-response.png" alt="" width={32} height={32} />
            <span className="ml-3">Fast Response</span>
          </li>
          <li className="flex items-center justify-center sm:px-6 sm:h-6">
            <Image src="/badge.png" alt="" width={32} height={32} />
            <span className="ml-3">3 Years Warranty</span>
          </li>
          <li className="flex items-center justify-center sm:px-6 sm:h-6">
            <Image src="/freight.png" alt="" width={32} height={32} />
            <span className="ml-3">Free Shipping</span>
          </li>
          <li className="flex items-center justify-center sm:px-6 sm:h-6">
            <StarIcon className="w-6 h-6 text-yellow-300" />
            <StarIcon className="w-6 h-6 text-yellow-300" />
            <StarIcon className="w-6 h-6 text-yellow-300" />
            <StarIcon className="w-6 h-6 text-yellow-300" />
            <StarIcon className="w-6 h-6 text-yellow-300" />
          </li>
        </ul>
      </div> */}
      <header
        className={clsx(
          // sticky top-0
          "z-50 relative h-16 px-8 m-0 transition-colors duration-200",
          {
            "px-13": isHome,
            "sticky top-0 bg-gradient-radial from-[#e61a5e] to-[#5e1ae6]":
              !isHome,
          }
        )}
      >
        <nav
          className={clsx(
            "text-white flex items-center justify-between w-full h-full transition-colors duration-200"
            // {
            //   " group-hover:text-gray-900": true,
            // }
          )}
        >
          <div className="hidden small:flex items-center h-full">
            <Link href="/">
              <a className="text-2xl-semi uppercase font-bold">DOMOJT</a>
            </Link>
          </div>
          <div className="small:ml-8 small:flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
            <div className="hidden small:block h-full ml-6">
              <Link href="/products/custom-your-neon">
                <a
                  className={clsx(
                    `relative flex h-full hover:text-[#FEEE10] transition-all
                    after:transition-all
                    after:content-['']
                    after:absolute
                    after:bottom-2
                    after:left-1/2
                    after:right-1/2
                    after:h-[2px]
                    after:bg-[#FEEE10]
                    after:invisible
                    hover:after:left-0
                    hover:after:right-0
                    hover:after:visible
                    `,
                    {
                      "after:!left-0 after:!right-0 after:!visible text-[#FEEE10]":
                        isCustom,
                    }
                  )}
                >
                  <button className="relative h-full flex items-center tracking-wide font-light text-2xl">
                    CREATE YOUR TEXT DESIG
                  </button>
                </a>
              </Link>
            </div>
            <div className="hidden small:block h-full ml-6">
              <Link href="/products/upload-your-artwork-logo">
                <a
                  className={clsx(
                    `relative flex h-full hover:text-[#FEEE10] transition-all
                    after:transition-all
                    after:content-['']
                    after:absolute
                    after:bottom-2
                    after:left-1/2
                    after:right-1/2
                    after:h-[2px]
                    after:bg-[#FEEE10]
                    after:invisible
                    hover:after:left-0
                    hover:after:right-0
                    hover:after:visible
                    `,
                    {
                      "after:!left-0 after:!right-0 after:!visible text-[#FEEE10]":
                        isUpload,
                    }
                  )}
                >
                  <button className="relative h-full flex items-center tracking-wide font-light text-2xl">
                    UPLOAD YOUR ARTWORL/LOGO
                  </button>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex small:hidden items-center h-full">
            <Link href="/">
              <a className="text-2xl-semi uppercase font-bold">DOMOJT</a>
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">
                <a className="text-2xl font-semibold	">
                  {customer?.first_name ?? <UserIcon className="w-8 h-8" />}
                </a>
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </>
  )
}

export default Nav
