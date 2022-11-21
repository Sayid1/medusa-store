import { StoreGetProductsParams } from "@medusajs/medusa"
import { useCollections } from "medusa-react"
import {
  ChangeEvent,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react"
import clsx from "clsx"
import useMobileDetect from "@lib/hooks/use-mobile-detect-hook"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
  index: number | undefined
}

const RefinementList = ({
  index,
  refinementList,
  setRefinementList,
}: RefinementListProps) => {
  const { collections } = useCollections()
  const listRef = useRef<HTMLUListElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [liOffset, setLiOffset] = useState<DOMRect[]>([])
  const [ulOffset, setUlOffset] = useState<DOMRect>()

  const isMobile = useMobileDetect().isMobile()

  useLayoutEffect(() => {
    const childWidths: DOMRect[] = []
    const childNodes = listRef.current?.childNodes as NodeListOf<HTMLLIElement>
    childNodes.forEach((child) => {
      childWidths.push(child.getBoundingClientRect())
    })
    setLiOffset(childWidths)
    setUlOffset((listRef.current as HTMLUListElement).getBoundingClientRect())
  }, [collections])

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target

    const collectionIds = refinementList.collection_id || []

    const exists = collectionIds.includes(id)

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      })

      return
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      })

      return
    }

    return
  }

  const mobileHandleCollectionChange = (id?: string, index?: number) => {
    if (!isMobile) return
    if (!id) {
      setRefinementList({
        ...refinementList,
        collection_id: [],
      })
    } else {
      const collectionIds = refinementList.collection_id || []
      if (!collectionIds.includes(id) && index !== undefined && ulOffset) {
        const { x: liOffsetX, width: liWidth } = liOffset[index + 1]
        const { x: ulOffsetX, width: ulWidth } = ulOffset
        const x = liOffsetX - ulOffsetX - ulWidth / 2 + liWidth / 2

        listRef.current?.scrollTo(x, 0)
        setRefinementList({
          ...refinementList,
          collection_id: [id],
        })
      }
    }
  }
  //   [isMobile, liOffset, setRefinementList, ulOffset]
  // )

  useEffect(() => {
    let id = index !== undefined ? collections?.[index].id : undefined
    mobileHandleCollectionChange(id, index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const getTitle = (title: string) => {
    if (isMobile) return title.replaceAll("Neon", "").replaceAll("Signs", "")
    return title
  }
  return (
    <div className="px-8 py-4 small:pr-0 small:pl-8 small:min-w-[250px] sticky top-16 z-10 bg-[color:var(--primary-bg)]">
      <div
        className="flex gap-x-3 small:flex-col small:gap-y-3"
        ref={containerRef}
      >
        <span className="text-2xl hidden md:block">Collections</span>
        <ul
          ref={listRef}
          className="sticky top-16 text-xl flex sm:flex-wrap scroll-smooth overflow-x-scroll no-scrollbar items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2"
        >
          <li
            className={clsx("md:hidden", {
              "text-[#9C1AA8]": !refinementList.collection_id?.length,
            })}
            onClick={() => mobileHandleCollectionChange()}
          >
            Collections
          </li>
          {collections?.map((c, i) => (
            <li
              key={c.id}
              onClick={() => mobileHandleCollectionChange(c.id, i)}
            >
              <label
                className={clsx(
                  "cursor-pointer hover:text-[#9C1AA8] transition-all flex items-center gap-x-2 whitespace-nowrap",
                  {
                    "text-[#9C1AA8]": refinementList.collection_id?.includes(
                      c.id
                    ),
                  }
                )}
              >
                {!isMobile && (
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.collection_id?.includes(
                      c.id
                    )}
                    onChange={(e) => handleCollectionChange(e, c.id)}
                    className="accent-amber-200 cursor-pointer before:bg-white"
                  />
                )}
                {getTitle(c.title)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RefinementList
