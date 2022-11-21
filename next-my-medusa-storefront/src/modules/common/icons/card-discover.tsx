import React from "react"
import { IconProps } from "types/icon"

const Discover: React.FC<IconProps> = ({
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      aria-labelledby="discover-card-art-title"
      data-testid="discover-card-art"
      role="img"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={24}
      {...attributes}
    >
      <title id="discover-card-art-title">Discover</title>
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
        <path
          d="M37 16.95V21c0 1.1-.9 2-2 2H23.228c7.896-1.815 12.043-4.601 13.772-6.05z"
          fill="#EDA024"
        ></path>
        <path d="M9 11h20v2H9z" fill="#494949"></path>
        <path
          d="M22 12c0 1.7-1.3 3-3 3s-3-1.4-3-3 1.4-3 3-3c1.7 0 3 1.3 3 3z"
          fill="#EDA024"
        ></path>
      </g>
    </svg>
  )
}

export default Discover
