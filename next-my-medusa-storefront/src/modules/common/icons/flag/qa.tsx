import React from "react"
import { IconProps } from "types/icon"

const Alert: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      {...attributes}
    >
      <mask id="a">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#eee" d="M0 0h173l61 255.8L173.4 512H0z" />
        <path
          fill="#751a46"
          d="m173 0-72.7 30.8L176 63l-75.7 32.2 75.7 32.1-75.7 32.2 75.7 32.1-75.7 32.1 75.7 32.2-75.7 32.2 75.7 32.1-75.7 32.2 75.7 32.1-75.7 32.2 75.7 32.1-75.7 32.2 73.1 31H512V0z"
        />
      </g>
    </svg>
  )
}

export default Alert