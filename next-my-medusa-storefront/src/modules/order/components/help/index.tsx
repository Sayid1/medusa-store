import Link from "next/link"
import React from "react"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid"

const Help = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Need help?</h2>
      <div className="text-xl my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            {/* <Link href="/domojt/contact-us"> */}
            <div
              className="flex items-center cursor-pointer transition-all duration-300 group hover:pl-4 hover:pr-1"
              onClick={() => window.Tawk_API.maximize()}
            >
              Contact
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5 ml-1" />
            </div>
            {/* </Link> */}
          </li>
          <li>
            <Link href="/domojt/contact-us">
              <a className="hover:underline">Returns & Exchanges</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
