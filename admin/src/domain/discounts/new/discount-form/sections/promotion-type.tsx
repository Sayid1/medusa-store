import clsx from "clsx"
import React from "react"
import { Controller, useWatch } from "react-hook-form"
import RadioGroup from "../../../../../components/organisms/radio-group"
import { DiscountRuleType } from "../../../types"
import { useDiscountForm } from "../form/discount-form-context"

const PromotionType = () => {
  const { control } = useDiscountForm()

  const regions = useWatch({
    control,
    name: "regions",
  })

  return (
    <Controller
      name="rule.type"
      control={control}
      rules={{ required: true }}
      render={({ onChange, value }) => {
        return (
          <RadioGroup.Root
            value={value}
            onValueChange={onChange}
            className={clsx("flex items-center gap-base mt-base px-1")}
          >
            <RadioGroup.Item
              value={DiscountRuleType.PERCENTAGE}
              className="flex-1"
              label="百分比"
              description={"折扣以 % 为单位"}
            />
            <RadioGroup.Item
              value={DiscountRuleType.FIXED}
              className="flex-1"
              label="固定金额"
              description={"整数折扣"}
              disabled={Array.isArray(regions) && regions.length > 1}
              disabledTooltip="You can only select one valid region if you want to use the fixed amount type"
            />
            <RadioGroup.Item
              value={DiscountRuleType.FREE_SHIPPING}
              className="flex-1"
              label="免费送货"
              description={"Override delivery amount"}
            />
          </RadioGroup.Root>
        )
      }}
    />
  )
}

export default PromotionType
