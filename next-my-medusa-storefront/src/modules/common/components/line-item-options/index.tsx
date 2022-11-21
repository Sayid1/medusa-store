import { LineItem } from "@medusajs/medusa"
import { ProductVariant } from "@medusajs/medusa"

type LineItemOptionsProps = { variant: Omit<LineItem, "beforeInsert"> }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <div className="font-thin text-base text-gray-900 grid">
      <div>
        <span>Neon Sign Size : {variant.metadata.size}</span>
      </div>
      <div>
        <span>Neon Backing : {variant.metadata.boardStyle}</span>
      </div>
      <div>
        <span>Backing Color : {variant.metadata.boardColor}</span>
      </div>
      <div>
        <span>Power Plug: {variant.metadata.plug}</span>
      </div>
      <div>
        <span>Sign Usage: {variant.metadata.useage}</span>
      </div>
      {/* {variant.options.map((option) => {
        const optionName =
          variant.product.options.find((opt) => opt.id === option.option_id)
            ?.title || "Option"
        return (
          <div key={option.id}>
            <span>
              {optionName}: {option.value}
            </span>
          </div>
        )
      })} */}
    </div>
  )
}

export default LineItemOptions
