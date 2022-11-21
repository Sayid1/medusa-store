import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import X from "@modules/common/icons/x"
import Thumbnail from "@modules/products/components/thumbnail"
import { CalculatedVariant } from "types/medusa"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[122px_1fr] gap-x-4 py-8">
      <div className="hidden sm:block w-[122px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xl ">{item.title}</span>
            <LineItemOptions variant={item} />
          </div>
          <div className="h-full flex flex-col justify-between items-center">
            <div className="flex flex-col items-center">
              <NativeSelect
                value={item.quantity}
                onChange={(value) =>
                  updateItem({
                    lineId: item.id,
                    quantity: parseInt(value.target.value),
                  })
                }
                className="max-h-[35px] w-[75px] text-lg font-DIN"
              >
                {Array.from([...Array(item.variant.inventory_quantity)].keys())
                  .slice(0, 10)
                  .map((i) => {
                    const value = i + 1
                    return (
                      <option value={value} key={i}>
                        {value}
                      </option>
                    )
                  })}
              </NativeSelect>
              <button
                className="flex items-center gap-x-1 text-gray-500 mt-2"
                onClick={() => deleteItem(item.id)}
              >
                <Trash className="text-[red]" size={24} />
                {/* <span>Remove</span> */}
              </button>
            </div>
            <LineItemPrice
              variant={item.variant as CalculatedVariant}
              quantity={item.quantity}
              region={region}
            />
          </div>
        </div>
        {/* <div className="flex items-end justify-between text-small-regular flex-1">
          <div>
            <button
              className="flex items-center gap-x-1 text-gray-500"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={14} />
              <span>Remove</span>
            </button>
          </div>
          <div>
            <LineItemPrice
              variant={item.variant as CalculatedVariant}
              quantity={item.quantity}
              region={region}
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Item
