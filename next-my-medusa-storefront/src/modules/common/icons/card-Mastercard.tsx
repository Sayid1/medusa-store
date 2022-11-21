import React from "react"
import { IconProps } from "types/icon"

const Mastercard: React.FC<IconProps> = ({
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      aria-labelledby="master-card-art-title"
      data-testid="master-card-art"
      role="img"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={24}
      {...attributes}
    >
      <title id="master-card-art-title">Mastercard</title>
      <g fill="none" fillRule="evenodd">
        <path
          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
          fill="#000"
          opacity=".07"
        ></path>
        <path
          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
          fill="#FFF"
        ></path>
        <circle cx="15" cy="12" fill="#EB001B" r="7"></circle>
        <circle cx="23" cy="12" fill="#F79E1B" r="7"></circle>
        <path
          d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7 0 2.3 1.2 4.5 3 5.7 1.8-1.2 3-3.3 3-5.7z"
          fill="#FF5F00"
        ></path>
      </g>
    </svg>
  )
}

export default Mastercard
