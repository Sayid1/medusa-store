import React from "react"

type TitleProps = {
  module: string
  title: any
}

const Title = (props: TitleProps) => {
  return (
    <>
      <div className="text-[#9C1AA8] text-xl font-medium mb-1.5">
        {props.module}
      </div>
      <h2 className="mb-7 max-w-[500px] font-medium text-4xl">{props.title}</h2>
    </>
  )
}

export default Title
