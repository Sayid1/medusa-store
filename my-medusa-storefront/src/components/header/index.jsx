import React, { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import CartPopover from "./cart-popover"
import RegionPopover from "./region-popover"
import StoreNavigation from './store-navigation'

const mockData = {}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="relative bg-white">
        <p className="bg-[color:var(--fourth-color)] h-10 flex items-center justify-center text-base font-bold text-white px-4 sm:px-6 lg:px-8">
          THE ULTIMATE MEN'S PERFORMANCE TOPS ARE HERE SHOP NOW
        </p>

        <div className=" z-10 hidden w-full bg-[hsl(200_7.0%_8.8%)] px-4 sm:px-6 lg:px-8 h-12 lg:flex lg:flex-1 lg:items-center lg:space-x-6">
          {/* <div className=''> */}
            <span className="h-full flex items-center hover:bg-[#EC008C] text-lg font-bold px-8 text-white cursor-pointer">
              NEON SIGNS
            </span>
            <span className="h-full flex items-center hover:bg-[#EC008C] text-lg px-8 text-white cursor-pointer">
              TABLE CLOTH
            </span>
            <span className="h-full flex items-center hover:bg-[#EC008C] text-lg px-8 text-white cursor-pointer">
              CURTAINS
            </span>
          {/* </div> */}
        </div>
      </header>
      <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8 bg-white sticky top-0 z-10">
        <div className="border-b border-gray-200">
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <StoreNavigation open={open} setOpen={setOpen} />

            <div className="ml-auto flex items-center bg-slate-900" onMouseEnter={() => {console.log(open)}}>

              <div className="hidden lg:ml-8 lg:flex">
                  <RegionPopover />
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <UserIcon className="w-6 h-6 text-slate-900 hover:fill-current cursor-pointer" aria-hidden="true" />
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="w-6 h-6 text-slate-900 hover:stroke-2" aria-hidden="true" />
                </a>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                  <CartPopover cart={mockData.cart} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
