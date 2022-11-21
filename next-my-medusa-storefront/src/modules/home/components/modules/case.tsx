import React from "react"
import Title from "./title"
import { StarIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import USA from "@modules/common/icons/flag/usa"
import UK from "@modules/common/icons/flag/uk"
import AR from "@modules/common/icons/flag/ar"
import AU from "@modules/common/icons/flag/au"
import BR from "@modules/common/icons/flag/br"
import CA from "@modules/common/icons/flag/ca"
import DE from "@modules/common/icons/flag/de"
import FR from "@modules/common/icons/flag/fr"
import QA from "@modules/common/icons/flag/qa"
import RO from "@modules/common/icons/flag/ro"

const data = [
  {
    flag: <AR className="w-12 h-12" />,
    country: "Argentina",
    review: `I sometimes am a little leery of ordering from IG ads so I decided to order something small from this site to see if they would come through! They did in a major way! The sign came quicker than I expected and looks amazing! Can’t wait to order more!`,
    name: "Fernán Halder",
  },
  {
    flag: <USA className="w-12 h-12" />,
    country: "U.S.",
    review: `Super service and quick delivery. The creative team was very helpful to us with the design.`,
    name: "Hayden",
  },
  {
    flag: <BR className="w-12 h-12" />,
    country: "Brazil",
    review: `Bought the sign for my brother - it’s his cat’s name. Came quickly and safely. Easily the best present I gave this year!`,
    name: "Tiago Serra",
  },
  {
    flag: <FR className="w-12 h-12" />,
    country: "France",
    review: `Greeatttt product!!! Fast delivery! Probably one of the best products I've purchased, amazing neon for business signage`,
    name: "Victorine Lavoie",
  },
  {
    flag: <RO className="w-12 h-12" />,
    country: "Romania",
    review: `Love it! Arrived overseas in perfect condition, works great. There's some extra hardware included that isn't necessary for hanging`,
    name: "Costel Raducioiu",
  },
  {
    flag: <DE className="w-12 h-12" />,
    country: "Germany",
    review: `Capturing Unique to Suit Any Advertising even having open closed sign for the day businesses.`,
    name: "Cord Polen",
  },
  {
    flag: <UK className="w-12 h-12" />,
    country: "U.K.",
    review: `Super service and quick delivery. The creative team was very helpful to us with the design.Capturing Unique to Suit Any Advertising even having open closed sign for the day businesses.`,
    name: "Cyril Fenning",
  },
  {
    flag: <AU className="w-12 h-12" />,
    country: "Australia",
    review: `Love it It’s perfect for my stream background. 10/10`,
    name: "Nathan Jackson",
  },
  {
    flag: <CA className="w-12 h-12" />,
    country: "Canada",
    review: `Cute sign, Amazing deal!
    Super cute neon sign! It's even bigger than I thought it would be. Such a good deal for the price compare to other neon signs sellers.`,
    name: "Kaleb Till",
  },
  {
    flag: <QA className="w-12 h-12" />,
    country: "Qatar",
    review: `I ordered this sign for my business and required rush production. Them was so accommodating and worked with me to get the sign quickly for a reasonable price. The sign is perfect, lightweight, and easy to hang. Would definitely order again!`,
    name: "Kalthem",
  },
]

const Case: React.FC = () => {
  return (
    <section className="block my-12 px-[25px] pl-[length:var(--default-pl)]">
      <Title
        module="Case studies"
        title={
          <span>
            People from all over the world <br></br>are using DOMOJT neon lights
          </span>
        }
      />
      <div className="relative">
        <div className="no-scrollbar overflow-x-auto overflow-y-hidden mb-12 pb-10 pr-5 grid grid-flow-col auto-cols-min gap-5">
          {data.map((item) => (
            <div
              key={item.country}
              className="w-[270px] flex flex-col items-center justify-between relative bg-white mx-1 md:mx-3 my-10 px-4 py-3 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center">
                <p className="text-[#9C1AA8] font-bold text-xl mb-3">
                  {item.name}
                </p>
                {item.flag}
                <p className="mt-3 text-gray-600 text-left break-all">
                  {item.review}
                </p>
              </div>
              <div className="flex mt-2">
                <StarIcon className="w-6 h-6 text-[#9C1AA8]" />
                <StarIcon className="w-6 h-6 text-[#9C1AA8]" />
                <StarIcon className="w-6 h-6 text-[#9C1AA8]" />
                <StarIcon className="w-6 h-6 text-[#9C1AA8]" />
                <StarIcon className="w-6 h-6 text-[#9C1AA8]" />
              </div>
            </div>
          ))}
        </div>

        <ArrowRightCircleIcon className="absolute left-5 md:left-7 bottom-0 w-12 h-12 text-[#9C1AA8] animate-bounce-horizontally" />
      </div>
    </section>
  )
}

export default Case
