import React from "react"
import { IconProps } from "types/icon"

const Diners: React.FC<IconProps> = ({
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      aria-labelledby="diners-card-art-title"
      data-testid="diners-card-art"
      role="img"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={24}
      {...attributes}
    >
      <title id="diners-card-art-title">Diners</title>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path
            fill="#000"
            fillRule="nonzero"
            d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            opacity="0.07"
          ></path>
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
          ></path>
          <g transform="translate(9.625 4.125)">
            <path
              fill="#0079BE"
              d="M10.736 14.222c3.968.018 7.59-3.17 7.59-7.05 0-4.241-3.622-7.173-7.59-7.172H7.321C3.305-.001 0 2.932 0 7.173c0 3.88 3.305 7.067 7.32 7.049h3.416z"
            ></path>
            <path
              fill="#FFF"
              d="M7.337.588C3.667.588.694 3.502.693 7.098c.001 3.595 2.975 6.509 6.644 6.51 3.67-.001 6.644-2.915 6.645-6.51 0-3.596-2.975-6.51-6.645-6.51zm-4.211 6.51c.003-1.757 1.124-3.255 2.703-3.85v7.7c-1.58-.595-2.7-2.092-2.703-3.85zm5.718 3.852V3.247c1.58.594 2.703 2.093 2.705 3.851-.002 1.759-1.124 3.257-2.705 3.852z"
            ></path>
            <path
              fill="#0079BE"
              d="M10.736 14.222c3.968.018 7.59-3.17 7.59-7.05 0-4.241-3.622-7.173-7.59-7.172H7.321C3.305-.001 0 2.932 0 7.173c0 3.88 3.305 7.067 7.32 7.049h3.416z"
            ></path>
            <path
              fill="#FFF"
              d="M7.337.588C3.667.588.694 3.502.693 7.098c.001 3.595 2.975 6.509 6.644 6.51 3.67-.001 6.644-2.915 6.645-6.51 0-3.596-2.975-6.51-6.645-6.51zm-4.211 6.51c.003-1.757 1.124-3.255 2.703-3.85v7.7c-1.58-.595-2.7-2.092-2.703-3.85zm5.718 3.852V3.247c1.58.594 2.703 2.093 2.705 3.851-.002 1.759-1.124 3.257-2.705 3.852z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Diners
