import UnderlineLink from "@modules/common/components/underline-link"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import HomeModules from "@modules/home/components/modules"
import { useNavigationCollections } from "@lib/hooks/use-layout-data"

const HomeMain = () => {
  const { data } = useNavigationCollections()
  const childrens = data?.children
  return (
    <div className="pt-20 min-h-0">
      {/* pl-[length:var(--default-pl)] */}
      <section className="block max-w-[length:var(--max-width)] mx-auto px-[25px]">
        <h1
          className="font-sans leading-[1.05] text-[radial-gradient(circle, var(--colors-hiContrast), var(--colors-indigo12))] text-[min(max(35px,10.2vw),79px)]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(206 24.0% 9.0%), hsl(226 62.0% 17.0%))",
            WebkitBackgroundClip: "text",
          }}
        >
          Why Waste <br></br>Time Looking for<br></br>Other Neon Signs?
        </h1>
        <div className="max-w-[700px] font-sans text-[hsl(206_6.0%_43.5%)] text-2xl leading-normal my-6">
          <p>
            Custom Light up Sign ideal for your Wedding, bridal shower,
            engagement and great gift idea. Get Special Offers. Free Giveaways.
            Customize Your Neon. Free Worldwide Shipping.
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
      </section>
      {/* <Grid
        title={"Featured"}
        cta={{ to: "/products", text: "Browse all products" }}
      >
        {prods.slice(0, 4).map(p => {
          return <ProductListItem product={p} key={p.handle} />
        })}
      </Grid> */}

      <section className="block mr-6">
        <Link href="/store">
          <a className=" pl-[length:var(--default-pl)] block mb-4 flex justify-end items-center font-sans text-right text-lg font-light hover:underline">
            View All Collections
          </a>
        </Link>
        {childrens && (
          <div className="no-scrollbar pl-[length:var(--default-pl)] mb-12 grid grid-flow-col auto-cols-min gap-5 overflow-x-auto overflow-y-hidden">
            {childrens.map((collection) => (
              <Link
                href={`/collections/${collection.id}`}
                passHref
                key={collection.id}
              >
                <div className="group w-[400px] h-auto cursor-pointer">
                  <div className="relative w-full h-[400px] shadow-md border aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <Image
                      src={collection.thumbnail as string}
                      layout="fill"
                      alt={`Item from the ${collection.title} collection`}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl text-white">
                      <p className="font-medium uppercase text-[color:var(--secondary-color)] group-hover:underline">
                        {collection.title}
                      </p>
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <HomeModules />
    </div>
  )
}

export default HomeMain
