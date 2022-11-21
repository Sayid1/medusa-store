import React from "react"
import { IconProps } from "types/icon"

const Amex: React.FC<IconProps> = ({
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      aria-labelledby="amex-card-art-title"
      data-testid="amex-card-art"
      role="img"
      viewBox="0 0 38 24"
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={24}
      {...attributes}
    >
      <title id="amex-card-art-title">American Express</title>
      <defs>
        <rect height="36" id="amexCardArt-a" rx="4" width="324"></rect>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-61 -6)">
          <mask fill="#fff" id="amexCardArt-b">
            <use xlinkHref="#amexCardArt-a"></use>
          </mask>
          <g fillRule="nonzero" mask="url(#amexCardArt-b)">
            <path
              d="M96 6H64c-1.7 0-3 1.3-3 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V9c0-1.7-1.4-3-3-3z"
              fill="#000"
              opacity=".07"
            ></path>
            <path
              d="M96 7c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H64c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h32"
              fill="#006FCF"
            ></path>
            <path
              d="M69.971 16.268l.774 1.876h-1.542l.768-1.876zm16.075.078h-2.977v.827h2.929v1.239h-2.923v.922h2.977v.739l2.077-2.245-2.077-2.34-.006.858zm-14.063-2.34h3.995l.887 1.935.822-1.941h10.37l1.078 1.19L90.25 14h4.763l-3.519 3.852 3.483 3.828h-4.834l-1.078-1.19-1.125 1.19H71.03l-.494-1.19h-1.13l-.495 1.19H65L68.286 14h3.43l.267.006zm8.663 1.078h-2.239l-1.5 3.536-1.625-3.536H73.06v4.81L71 15.084h-1.993l-2.382 5.512h1.555l.494-1.19h2.596l.494 1.19h2.72v-3.935l1.751 3.941h1.19l1.74-3.929v3.93h1.458l.024-5.52-.001.001zm9.34 2.768l2.531-2.768h-1.822l-1.601 1.726-1.548-1.726h-5.894v5.518h5.81l1.614-1.738 1.548 1.738h1.875l-2.512-2.75h-.001z"
              fill="#FFF"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Amex
