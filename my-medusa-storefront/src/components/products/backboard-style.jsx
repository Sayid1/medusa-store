import React, { useState } from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { QuestionMarkCircleIcon, CheckIcon } from "@heroicons/react/24/solid"
import clsx from 'clsx'
import Select from '../ui/select'
import Tooltip from "../ui/tooltip"

const colors = [
  'Clear/ Transparent (Most Popular)', 'Green', 'Lemon Yellow', 'Red', 'Blue', 'Purple', 'Orange', 'Gray', 'Dark Brown', 'Black'
]

const plugs = [
  'USA / CANADA 120V', 'UK / IRELAND 230V', 'EUROPE 230V', 'AUSTRALIA / NZ 230V', 'JAPAN 100V'
]

const usage = [
  'For indoor use only', 'For outdoor use (water resistant)'
]

const backboardStyles = [{
  name: 'Cut to Rectangle',
  content: 'The backboard will be cut rectangularly like a frame.',
  staticImage: <StaticImage
                src="../../images/Cut-to-Rectangle.jpg"
                alt="Cut to Rectangle"
                placeholder="tracedSVG"
                className="w-full h-auto"
              />
}, {
  name: 'Cut to Shape',
  content: 'The backboard will be shaped in line with the letters; can be circle, oval, octagon, and such.',
  staticImage: <StaticImage
                src="../../images/Cut-to-Shape.jpg"
                alt="Cut to Shape"
                placeholder="tracedSVG"
                className="w-full h-auto"
              />
}, {
  name: 'Cut to Letter',
  content: 'The backboard will closely follow the pattern of the preferred font size and style.',
  staticImage: <StaticImage
                  src="../../images/Cut-to-Letter.jpg"
                  alt="Cut to Letter"
                  placeholder="tracedSVG"
                  className="w-full h-auto"
                />
}]

const Title = (props) => (
  <div className='mb-1 mt-4'>
      <font style={{ verticalAlign: "inherit" }} className="text-[color:var(--secondary-color)] font-normal text-lg lg:text-xl uppercase">
        { props.title }
      </font>
    </div>
)

export default () => {
  const [selected, setSelected] = useState(0)
    return (
    <>
      <Title title="CHOOSE NEON BACKBOARD STYLE" />
      <div className="grid lg:grid-cols-3 lg:gap-4">
        {
          backboardStyles.map((board, i) => {
            return (
              <div
                className={clsx(selected === i ? 'border-[2px] border-slate-900 shadow-xl' : 'border-slate-300', "relative rounded border hover:shadow-lg border-solid cursor-pointer")}
                onClick={() => setSelected(i)}
              >
                <div className='absolute z-10 text-white inset-y-0 right-0 flex items-center pr-4'>
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                { board.staticImage }
                <div className="flex items-center justify-center mt-2">
                  <span className="mr-2 text-sm font-[proxima-nova] text-[color:var(--secondary-color)]">{ board.name }</span>
                  <Tooltip
                    content={board.content}
                    side="top"
                  >
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                  </Tooltip>
                </div>
              </div>

            )
          })
        }

        {/* <div className="my-3 lg:my-0 rounded border border border-solid cursor-pointer">
          <StaticImage
            src="../../images/Cut-to-Shape.jpg"
            alt="A black Medusa hoodie and a white Medusa coffee mug"
            placeholder="tracedSVG"
            className="w-full h-auto"
          />
          <div className="flex items-center justify-center mt-2">
            <span className="mr-2 text-sm font-[proxima-nova] text-[color:var(--secondary-color)]">Cut to Shape </span>
            <Tooltip
              content={
                ""
              }
              side="top"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
            </Tooltip>
          </div>
        </div> */}

        {/* <div className="rounded border border-slate-400 border-solid cursor-pointer">
          <StaticImage
            src="../../images/Cut-to-Letter.jpg"
            alt="A black Medusa hoodie and a white Medusa coffee mug"
            placeholder="tracedSVG"
            className="w-full h-auto"
          />
          <div className="flex items-center justify-center mt-2">
            <span className="mr-2 text-sm font-[proxima-nova] text-[color:var(--secondary-color)]">Cut to Letter </span>
            <Tooltip
              content={
                "The backboard will closely follow the pattern of the preferred font size and style."
              }
              side="top"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
            </Tooltip>
          </div>
        </div> */}
      </div>

      <Select options={colors} defaultValue={colors[0]} title={<Title title="CHOOSE BACKBOARD COLOR" />} />
      <Select options={plugs} defaultValue={plugs[0]} title={<Title title="POWER PLUG" />} />
      <Select options={usage} defaultValue={usage[0]} title={<Title title="SIGN USAGE" />} />
    </>
  )
}