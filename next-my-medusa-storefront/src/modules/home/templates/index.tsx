import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import HomeModules from "@modules/home/components/modules"
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import { useNavigationCollections } from "@lib/hooks/use-layout-data"

const HomeMain = () => {
  const { data } = useNavigationCollections()
  const childrens = data?.children
  return (
    <div className="min-h-0">
      {/* pl-[length:var(--default-pl)] */}
      <section
        className="
          block
          w-full lg:max-w-[length:var(--max-width)] lg:mx-auto lg:px-[25px]
          h-[calc(200vh_-_5.75rem)] lg:h-[calc(100vh_-_5.75rem)]
        "
      >
        <div className="flex mx-auto h-full justify-center z-0 relative flex-col-reverse lg:flex-row">
          <div
            className="w-full lg:w-min
            z-10 flex-1 flex flex-col self-end
            bg-gradient-radial from-[#e61a5e] to-[#5e1ae6] px-[25px] justify-center
            items-center lg:items-start
            lg:self-center lg:px-0 lg:bg-none
            "
          >
            <h1
              className="
              font-medium	font-sans leading-[1.5] text-white text-[min(max(35px,10.2vw),79px)]
                md:[text-shadow:rgb(255_255_255)_0px_0px_5px,_rgb(255_255_255)_0px_0px_10px,_#9C1AA8_0px_0px_20px,_#9C1AA8_0px_0px_30px,_#9C1AA8_0px_0px_40px,_#9C1AA8_0px_0px_55px,_rgb(255_62_181)_0px_0px_75px]
              "
            >
              Why Waste <br></br>Time Looking for<br></br>Other Neon Signs?
            </h1>
            <div className="mt-10 lg:mt-10 max-w-[700px] font-sans text-white text-2xl leading-normal my-6">
              <ul className="font-light uppercase text-2xl tracking-wider text-slate-50">
                <li>- Super fast response</li>
                <li className="mt-2">- 3 Years Warranty</li>
                <li className="mt-2">- Free Shipping</li>
                <li className="mt-2">- Free Custom Designed</li>
                <li className="mt-2">- Energy & Cost Efficient</li>
                <li className="mt-2">
                  - High Quality and Cheap Neon Signs from China
                </li>
              </ul>
            </div>
            <div className="flex justify-center mt-10 md:mt-36 lg:mt-10 sm:justify-start">
              <span
                onClick={() => window.Tawk_API.maximize()}
                className="cursor-pointer inline-flex text-2xl uppercase items-center rounded bg-[#9C1AA8] font-medium px-4 py-2 mb-12 text-white shadow-[0_0_0_2px_hsl(300_99.4%_67.1%/0.102),-15px_0_30px_-15px_hsl(24_100%_49.9%/0.523),0_0_30px_-15px_hsl(322_99.7%_55.4%/0.608),15px_0_30px_-15px_hsl(250_99.7%_66.1%/0.733)]"
              >
                Get premium quote
                <ArrowRightIcon className="w-6 h-6 ml-2" aria-hidden />
              </span>
            </div>
          </div>
          <div
            className="
            w-full lg:w-min
            h-[calc(100vh_-_5.75rem)] lg:h-min
            sign-text-font-Northshore text-[140px] text-white
            pb-8 lg:pb-80
            flex flex-col justify-center items-center
            self-end md:self-center
            animate-wiggle duration-[2000ms]
            [text-shadow:rgb(255_255_255)_0px_0px_5px,_rgb(255_255_255)_0px_0px_10px,_#9C1AA8_0px_0px_20px,_#9C1AA8_0px_0px_30px,_#9C1AA8_0px_0px_40px,_#9C1AA8_0px_0px_55px,_rgb(255_62_181)_0px_0px_75px]
            "
          >
            <p>Hi</p>
            <p>WelCome</p>
          </div>
        </div>
      </section>
      {/* <Grid
        title={"Featured"}
        cta={{ to: "/products", text: "Browse all products" }}
      >
        {prods.slice(0, 4).map(p => {
          return <ProductListItem product={p} key={p.handle} />
        })}
      </Grid> */}

      <section className="block mt-12 mr-6 pl-[length:var(--default-pl)]">
        <Link href="/store">
          <a className="block flex justify-end items-center font-sans text-right text-lg font-light hover:underline hover:text-[#9C1AA8]">
            View All Collections
          </a>
        </Link>
        <div className="relative mt-4">
          {childrens && (
            <div className="no-scrollbar pb-10 overflow-x-auto overflow-y-hidden mb-12 pr-5 grid grid-flow-col auto-cols-min gap-5">
              {childrens.map((collection) => (
                <Link
                  href={`/collections/${collection.id}`}
                  passHref
                  className=""
                  key={collection.id}
                >
                  <div className="group transition-all hover:-translate-y-4 hover:scale-105 w-[270px] h-auto flex flex-col cursor-pointer justify-between relative bg-white mx-1 md:mx-3 mb-10 pb-3 rounded-lg shadow-lg overflow-hidden">
                    <div className="relative w-full h-[270px] shadow-md border aspect-w-1 aspect-h-1 rounded-b-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                      <Image
                        src={collection.thumbnail as string}
                        layout="fill"
                        alt={`Item from the ${collection.title} collection`}
                      />
                    </div>
                    <div className="mt-4 ml-4 text-center">
                      <h3 className="text-xl text-white">
                        <p className="font-medium uppercase text-gray-900 group-hover:text-[#9C1AA8] group-hover:underline">
                          {collection.title}
                        </p>
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <ArrowRightCircleIcon className="absolute left-5 md:left-7 bottom-0 w-12 h-12 text-[#9C1AA8] animate-bounce-horizontally" />
        </div>
      </section>
      <HomeModules />
    </div>
  )
}

export default HomeMain
