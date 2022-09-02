import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"

const CollectionPreview = ({ collection }) => {
  const randomThumbnail = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * collection.thumbnails.length)
    return (
      collection?.thumbnails?.[randomIndex]?.childImageSharp?.gatsbyImageData ??
      null
    )
  }, [collection])

  return (
    <Link to={`/collections/${collection.handle}`} className="">
      <div className="group relative w-[400px] h-auto">
        <div className="w-full shadow-md border aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <GatsbyImage
            image={randomThumbnail}
            alt={`Item from the ${collection.title} collection`}
            className="w-full h-[400px]"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl text-white">
            <p className="font-medium uppercase text-[color:var(--secondary-color)]">{collection.title}</p>
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default CollectionPreview
