import React from "react"
import RadioGroup from "../../../../../../components/organisms/radio-group"
import { DiscountConditionOperator } from "../../../../types"

type ConditionOperatorProps = {
  value: "in" | "not_in"
  onChange: (value: DiscountConditionOperator) => void
}

const ConditionOperator: React.FC<ConditionOperatorProps> = ({
  value,
  onChange,
}) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-2 gap-base mb-4"
    >
      <RadioGroup.Item
        className="w-full"
        label="In"
        value={DiscountConditionOperator.IN}
        description="适用于选定的项目。"
      />
      <RadioGroup.Item
        className="w-full"
        label="Not in"
        value={DiscountConditionOperator.NOT_IN}
        description="适用于除选定项目之外的所有项目。"
      />
    </RadioGroup.Root>
  )
}

export default ConditionOperator
