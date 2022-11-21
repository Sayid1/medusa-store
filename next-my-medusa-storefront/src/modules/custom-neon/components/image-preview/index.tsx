import React, { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import { ColourType, FontType } from "@lib/constants"

type ImagePreviewProps = {
  content?: string
  font?: FontType
  colour?: ColourType
}

function convertPxToNumber(str: string) {
  return Number(str.match(/\d*/g)?.[0])
}

const ImagePreview = (props: ImagePreviewProps) => {
  return (
    <div className="sticky top-[5.5rem]">
      <div className="relative rounded-xl pt-[100%] bg-center bg-no-repeat bg-cover bg-black bg-[url('/imgs/background3.jpg')]">
        <div className="absolute top-[30px] right-[30px] bottom-[30px] left-[30px]">
          <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
            <div
              className={
                "w-full text-center break-words cursor-grab inline-block text-white text-[115px] sign-text-font-" +
                props.font?.font
              }
              style={{
                textShadow: props.colour?.textShadow,
                transition: "text-shadow 0.5s ease 0s",
                fontSize: props.font?.size,
                lineHeight: props.font?.lineHeight,
              }}
            >
              {props.content || "Hello"}
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  )
}

export default ImagePreview
