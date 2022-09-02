import { useAdminCreateVariant } from "medusa-react"
import React, { useEffect, useState } from "react"
import Button from "../../../../components/fundamentals/button"
import EditIcon from "../../../../components/fundamentals/icons/edit-icon"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Input from "../../../../components/molecules/input"
import TagInput from "../../../../components/molecules/tag-input"
import BodyCard from "../../../../components/organisms/body-card"
import VariantGrid from "../../../../components/variant-grid"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import { getCombinations } from "../../../../utils/get-combinations"
import NewOption from "../../details/variants/option-edit"
import VariantEditor from "../../details/variants/variant-editor"
import { useProductForm } from "../form/product-form-context"
import { buildOptionsMap } from "../utils"

const Variants = ({ isEdit, product }) => {
  const {
    setValue,
    setVariants,
    variants,
    productOptions,
    setProductOptions,
  } = useProductForm()
  const [showAddVariantModal, setShowAddVariantModal] = useState(false)
  const [showAddOption, setShowAddOption] = useState(false)
  const notification = useNotification()
  const createVariant = useAdminCreateVariant(product?.id)

  useEffect(() => {
    if (isEdit) {
      return
    }

    const os = [...productOptions]
    const combinations = getCombinations(os)

    const newVariants = combinations.map((optionValues) => {
      if (!optionValues) {
        return null
      }

      const existing = variants.find((v) =>
        v.options.every((value, index) => optionValues[index] === value)
      ) || { prices: [] }

      existing.options = optionValues.filter((v) => v !== "")

      return existing
    })

    setVariants(newVariants.filter((v) => !!v))
  }, [productOptions])

  const updateOptionValue = (index, values) => {
    const newOptions = [...productOptions]
    newOptions[index] = {
      ...newOptions[index],
      values,
    }

    setValue(`options[${index}].values`, values)
    setProductOptions(newOptions)
  }

  const handleRemoveOption = (index) => {
    const newOptions = [...productOptions]
    newOptions.splice(index, 1)
    setProductOptions(newOptions)
  }

  const handleAddOption = (e) => {
    setProductOptions([
      ...productOptions,
      {
        name: "",
        values: [],
      },
    ])
  }

  const updateOptionName = (e, index) => {
    const element = e.target
    const newOptions = [...productOptions]
    newOptions[index] = {
      ...newOptions[index],
      name: element.value,
    }

    setValue(`options[${index}].name`, element.value)
    setProductOptions(newOptions)
  }

  const handleAddVariant = (data) => {
    const newVariant = {
      ...data,
      inventory_quantity: data.inventory_quantity || 0,
    }

    createVariant.mutate(newVariant, {
      onSuccess: () => {
        notification("Success", "Successfully added a variant", "success")
        setShowAddVariantModal(false)
      },
      onError: (err) => {
        notification("Error", getErrorMessage(err), "error")
      },
    })
  }

  return (
    <BodyCard
      title="变体"
      subtitle="添加此产品的变体。 为您的客户提供不同的价格、颜色、格式、尺寸、形状等选项。"
      forceDropdown={true}
      actionables={
        isEdit && [
          {
            label: "添加变体",
            onClick: () => setShowAddVariantModal(true),
            icon: <PlusIcon size={20} />,
          },
          {
            label: "编辑选项",
            onClick: () => setShowAddOption(true),
            icon: <EditIcon size={20} />,
          },
        ]
      }
    >
      <div>
        {!isEdit && (
          <>
            <div className="flex items-center mb-base">
              <h6 className="inter-base-semibold text-grey-90 mr-1.5">
                产品选项
              </h6>
            </div>
            <div className="flex flex-col gap-y-base max-w-[570px] w-full mb-4">
              {productOptions.map((o, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex gap-x-small grow">
                    <Input
                      required
                      className="w-[144px]"
                      name={`options[${index}].name`}
                      onChange={(e) => updateOptionName(e, index)}
                      label="选项名称"
                      placeholder="颜色"
                      value={o?.name || o.title}
                    />
                    <TagInput
                      className="grow"
                      placeholder="蓝色、绿色"
                      values={o?.values}
                      onChange={(values) => updateOptionValue(index, values)}
                    />
                  </div>
                  <button
                    className="ml-large"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <TrashIcon className="text-grey-40" />
                  </button>
                </div>
              ))}
              <div className="mt-xs">
                <Button onClick={handleAddOption} size="small" variant="ghost">
                  + 添加一个选项
                </Button>
              </div>
            </div>
            <div className="flex justify-center mb-base flex-col space-y-2">
              <div className="flex space-x-2">
                <h6 className="inter-base-semibold text-grey-90">变体</h6>
                <IconTooltip content="添加产品选项以创建变体" />
              </div>
            </div>
          </>
        )}
        <VariantGrid
          edit={isEdit}
          product={product}
          variants={variants}
          onVariantsChange={(vars) => setVariants(vars)}
        />
      </div>
      {showAddOption && (
        <NewOption
          productId={product.id}
          options={product.options}
          onDismiss={() => setShowAddOption(false)}
        />
      )}
      {showAddVariantModal && (
        <VariantEditor
          onCancel={() => setShowAddVariantModal(false)}
          onSubmit={handleAddVariant}
          title="添加变体"
          optionsMap={buildOptionsMap(product)}
        />
      )}
    </BodyCard>
  )
}

export default Variants
