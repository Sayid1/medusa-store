import React from "react"
import { Controller } from "react-hook-form"
import Checkbox from "../../../../components/atoms/checkbox"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Input from "../../../../components/molecules/input"
import Select from "../../../../components/molecules/select"
import BodyCard from "../../../../components/organisms/body-card"
import { countries as countryData } from "../../../../utils/countries"
import { numberOrNull } from "../../../../utils/form-helpers"
import { useProductForm } from "../form/product-form-context"

const StockAndInventory = () => {
  const { isVariantsView, register, control } = useProductForm()
  const countryOptions = countryData.map((c) => ({
    label: c.name,
    value: c.name,
  }))

  return (
    <BodyCard title="库存" subtitle="要开始销售，您只需要名称、价格和图片">
      <div className="mt-large">
        {!isVariantsView && (
          <>
            <div className="flex items-center mb-base">
              <h6 className="inter-base-semibold text-grey-90 mr-1.5">概要</h6>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-large">
              <Input
                label="库存单位 (SKU)"
                name="sku"
                placeholder="SUN-G, JK1234..."
                ref={register}
              />
              <Input
                label="商品条码 (EAN)"
                name="ean"
                placeholder="1231231231234..."
                ref={register}
              />
              <Input
                label="库存数量"
                name="inventory_quantity"
                type="number"
                placeholder="100"
                ref={register({ setValueAs: numberOrNull })}
              />
              <Input
                label="材质"
                name="material"
                ref={register}
                placeholder="Wool..."
              />
            </div>
          </>
        )}
        {!isVariantsView && (
          <div className="flex items-center gap-4 mb-xlarge">
            <div className="flex item-center gap-x-1.5">
              <Checkbox
                name="manage_inventory"
                label="管理库存"
                ref={register}
              />
              <IconTooltip content={"选中后，我们将在订单和退货时调节库存。"} />
            </div>
            <div className="flex item-center gap-x-1.5">
              <Checkbox
                name="allow_backorder"
                ref={register}
                label="允许延期交货"
              />
              <IconTooltip
                content={"选中后，即使产品已售罄，但仍可购买该产品。"}
              />
            </div>
          </div>
        )}
        <div className="flex items-center mb-base">
          <h6 className="inter-base-semibold text-grey-90 mr-1.5">详情</h6>
        </div>
        <div className="flex gap-x-8">
          <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-4 mb-large">
            <Input
              type="number"
              label="高度"
              name="height"
              ref={register({ setValueAs: numberOrNull })}
              min={0}
              placeholder="100..."
            />
            <Input
              type="number"
              label="宽度"
              name="width"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
            <Input
              type="number"
              label="长度"
              name="length"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
            <Input
              type="number"
              label="重量"
              name="weight"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-4 mb-large">
            <Input
              label="MID码"
              name="mid_code"
              ref={register}
              placeholder="100..."
            />
            <Input
              label="HS码"
              name="hs_code"
              ref={register}
              placeholder="100..."
            />
            <Controller
              control={control}
              name="origin_country"
              render={({ onChange, value }) => {
                return (
                  <Select
                    enableSearch
                    label="原产国"
                    placeholder="选择国家/地区"
                    options={countryOptions}
                    value={value}
                    onChange={onChange}
                  />
                )
              }}
            />
          </div>
        </div>
      </div>
    </BodyCard>
  )
}

export default StockAndInventory
