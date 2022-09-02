import { useParams } from "@reach/router"
import { navigate } from "gatsby"
import {
  useAdminCollections,
  useAdminDeleteProduct,
  useAdminProductTypes,
  useAdminUpdateProduct,
} from "medusa-react"
import React from "react"
import { Controller } from "react-hook-form"
import Checkbox from "../../../../components/atoms/checkbox"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Input from "../../../../components/molecules/input"
import Select from "../../../../components/molecules/select"
import StatusSelector from "../../../../components/molecules/status-selector"
import TagInput from "../../../../components/molecules/tag-input"
import Textarea from "../../../../components/molecules/textarea"
import BodyCard from "../../../../components/organisms/body-card"
import RadioGroup from "../../../../components/organisms/radio-group"
import useImperativeDialog from "../../../../hooks/use-imperative-dialog"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import {
  SINGLE_PRODUCT_VIEW,
  useProductForm,
  VARIANTS_VIEW,
} from "../form/product-form-context"

const General = ({ showViewOptions = true, isEdit = false, product }) => {
  const {
    register,
    control,
    setViewType,
    viewType,
    setValue,
  } = useProductForm()
  const { product_types } = useAdminProductTypes(undefined, { cacheTime: 0 })
  const { collections } = useAdminCollections()

  const typeOptions =
    product_types?.map((tag) => ({ label: tag.value, value: tag.id })) || []
  const collectionOptions =
    collections?.map((collection) => ({
      label: collection.title,
      value: collection.id,
    })) || []

  const setNewType = (value: string) => {
    const newType = {
      label: value,
      value,
    }

    typeOptions.push(newType)
    setValue("type", newType)

    return newType
  }

  return (
    <GeneralBodyCard
      isEdit={isEdit}
      product={product}
      title="概要"
      subtitle="要开始销售，您只需要输入名称、价格和图片"
    >
      <div className="mt-large">
        <h6 className="inter-base-semibold mb-1">产品详情</h6>
        <label
          htmlFor="name"
          className="inter-small-regular text-grey-50 block max-w-[370px] mb-base"
        >
          给您的产品起一个简短而清晰的名称。 50-60 个字符是搜索引擎的推荐长度。
        </label>
        <div className="flex gap-8 mb-base">
          <Input
            id="name"
            label="名称"
            name="title"
            placeholder="Happy Birthday Neon Sign"
            required
            ref={register({
              required: "名称是必填的",
              minLength: 1,
              pattern: /(.|\s)*\S(.|\s)*/,
            })}
          />
          <Input
            tooltipContent="SEO友好的唯一标识符。"
            label="唯一标识符"
            name="handle"
            placeholder="unique-name"
            prefix="/"
            ref={register()}
          />
        </div>
        <label
          className="inter-small-regular text-grey-50 block max-w-[370px] mb-base"
          htmlFor="description"
        >
          给你的产品一个简短而清晰的描述。 120-160 个字符是搜索引擎的推荐长度。
        </label>
        <div className="grid grid-rows-3 grid-cols-2 gap-x-8 gap-y-4 mb-large">
          <Textarea
            name="description"
            id="description"
            label="描述"
            placeholder="产品的简短描述..."
            className="row-span-full"
            rows={8}
            ref={register}
          />
          <Controller
            as={Select}
            control={control}
            label="分类"
            name="collection"
            placeholder="选择分类"
            options={collectionOptions}
            clearSelected
          />
          <Controller
            control={control}
            name="type"
            render={({ value, onChange }) => {
              return (
                <Select
                  label="类型"
                  placeholder="选择类型..."
                  options={typeOptions}
                  onChange={onChange}
                  value={value}
                  isCreatable
                  onCreateOption={(value) => {
                    return setNewType(value)
                  }}
                  clearSelected
                />
              )
            }}
          />
          <Controller
            name="tags"
            render={({ onChange, value }) => {
              return (
                <TagInput
                  label="标签（以因为逗号分隔）"
                  placeholder="春天, 夏天..."
                  onChange={onChange}
                  values={value || []}
                />
              )
            }}
            control={control}
          />
        </div>
        <div className="flex item-center gap-x-1.5 mb-xlarge">
          <Checkbox name="discountable" ref={register} label="可打折" />
          <IconTooltip content="当未选中的折扣不适用于此产品时" />
        </div>
        {showViewOptions && (
          <RadioGroup.Root
            value={viewType}
            onValueChange={setViewType}
            className="flex items-center gap-4 mt-xlarge"
          >
            <RadioGroup.SimpleItem
              label="简单的产品"
              value={SINGLE_PRODUCT_VIEW}
            />
            <RadioGroup.SimpleItem
              label="具有变体的产品"
              value={VARIANTS_VIEW}
            />
          </RadioGroup.Root>
        )}
      </div>
    </GeneralBodyCard>
  )
}

const GeneralBodyCard = ({ isEdit, product, ...props }) => {
  const params = useParams()
  const dialog = useImperativeDialog()
  const notification = useNotification()
  const updateProduct = useAdminUpdateProduct(params?.id)
  const deleteProduct = useAdminDeleteProduct(params?.id)

  const onDelete = async () => {
    const shouldDelete = await dialog({
      heading: "删除产品",
      text: "您确定要删除此产品吗？",
    })
    if (shouldDelete) {
      deleteProduct.mutate(undefined, {
        onSuccess: () => {
          notification("成功", "产品删除成功", "success")
          navigate("/a/products/")
        },
        onError: (err) => {
          notification("哎呀", getErrorMessage(err), "error")
        },
      })
    }
  }

  const onStatusChange = async () => {
    const newStatus = product?.status === "published" ? "draft" : "published"
    updateProduct.mutate(
      {
        status: newStatus,
      },
      {
        onSuccess: () => {
          const pastTense = newStatus === "published" ? "发布" : "保存草稿"
          notification("成功", `产品 ${pastTense} 成功`, "success")
        },
        onError: (err) => {
          notification("哎呀", getErrorMessage(err), "error")
        },
      }
    )
  }

  const actionables = [
    {
      label: "删除产品",
      onClick: onDelete,
      variant: "danger" as const,
      icon: <TrashIcon />,
    },
  ]

  return (
    <BodyCard
      actionables={isEdit ? actionables : undefined}
      forceDropdown
      status={
        isEdit ? (
          <StatusSelector
            isDraft={product?.status === "draft"}
            activeState="发布"
            draftState="草稿"
            onChange={onStatusChange}
          />
        ) : undefined
      }
      {...props}
    />
  )
}

export default General
