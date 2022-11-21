import React, { useContext, useMemo } from "react"
import { LayeredModalContext } from "../../../../components/molecules/modal/layered-modal"
import { DiscountConditionType } from "../../types"
import AddCollectionConditionSelector from "./condition-tables/add-condition-tables/collections"
import AddCustomerGroupConditionSelector from "./condition-tables/add-condition-tables/customer-groups"
import AddProductConditionSelector from "./condition-tables/add-condition-tables/products"
import AddTagConditionSelector from "./condition-tables/add-condition-tables/tags"
import AddTypeConditionSelector from "./condition-tables/add-condition-tables/types"
import DetailsCollectionConditionSelector from "./condition-tables/details-condition-tables/collections"
import DetailsCustomerGroupConditionSelector from "./condition-tables/details-condition-tables/customer-groups"
import DetailsProductConditionSelector from "./condition-tables/details-condition-tables/products"
import DetailsTagConditionSelector from "./condition-tables/details-condition-tables/tags"
import DetailsTypeConditionSelector from "./condition-tables/details-condition-tables/types"

export type ConditionItem = {
  label: string
  value: DiscountConditionType
  description: string
  onClick: () => void
}

type UseConditionModalItemsProps = {
  onClose: () => void
  isDetails?: boolean
}

const useConditionModalItems = ({
  isDetails,
  onClose,
}: UseConditionModalItemsProps) => {
  const layeredModalContext = useContext(LayeredModalContext)

  const items: ConditionItem[] = useMemo(
    () => [
      {
        label: "产品",
        value: DiscountConditionType.PRODUCTS,
        description: "仅适用于特定产品",
        onClick: () =>
          layeredModalContext.push({
            title: "选择产品",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsProductConditionSelector onClose={onClose} />
            ) : (
              <AddProductConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "客户群",
        value: DiscountConditionType.CUSTOMER_GROUPS,
        description: "仅针对特定客户群",
        onClick: () => {
          layeredModalContext.push({
            title: "选择客户群",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsCustomerGroupConditionSelector onClose={onClose} />
            ) : (
              <AddCustomerGroupConditionSelector onClose={onClose} />
            ),
          })
        },
      },
      {
        label: "标签",
        value: DiscountConditionType.PRODUCT_TAGS,
        description: "仅适用于特定标签",
        onClick: () =>
          layeredModalContext.push({
            title: "选择标签",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsTagConditionSelector onClose={onClose} />
            ) : (
              <AddTagConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "产品系列",
        value: DiscountConditionType.PRODUCT_COLLECTIONS,
        description: "仅适用于特定产品系列",
        onClick: () =>
          layeredModalContext.push({
            title: "选择产品系列",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsCollectionConditionSelector onClose={onClose} />
            ) : (
              <AddCollectionConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "产品类型",
        value: DiscountConditionType.PRODUCT_TYPES,
        description: "仅适用于特定产品类型",
        onClick: () =>
          layeredModalContext.push({
            title: "选择产品类型",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsTypeConditionSelector onClose={onClose} />
            ) : (
              <AddTypeConditionSelector onClose={onClose} />
            ),
          }),
      },
    ],
    [isDetails]
  )

  return items
}

export default useConditionModalItems
