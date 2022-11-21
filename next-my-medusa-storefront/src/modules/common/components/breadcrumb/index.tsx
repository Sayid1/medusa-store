import React from "react"
import clsx from "clsx"
import Link from "next/link"

interface BreadcrumbProps {
  className: string
  items: { name: string; url?: string }[]
}

const Breadcrumb = ({ className = "", items }: BreadcrumbProps) => {
  console.log("items", items)
  return (
    <nav className={clsx("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <a className="inline-flex items-center text-xl font-light text-[#9C1AA8]">
              <svg
                className="w-4 h-4 mr-2"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.name}>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {(item.url && (
                <Link href={item.url}>
                  <a className="ml-1 text-xl font-light text-[#9C1AA8] md:ml-2">
                    {item.name}
                  </a>
                </Link>
              )) || (
                <span className="ml-1 text-xl font-light md:ml-2">
                  {item.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
