import { useParams } from "@reach/router"
import { navigate } from "gatsby"
import {
  useAdminCollections,
  useAdminDeleteProduct,
  useAdminProductTypes,
  useAdminUpdateProduct,
} from "medusa-react"
import React, { useEffect, useState } from "react"
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
import Medusa from "../../../../services/api"

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
  // const { product_types } = useAdminProductTypes(undefined, { cacheTime: 0 })
  // const { collections } = useAdminCollections()
  const [collectionOptions, setCollectionOptions] = useState([])

  useEffect(() => {
    Medusa.collections.allChildren().then((ret) => {
      setCollectionOptions(
        ret.data.map((collection) => ({
          label: collection.title,
          value: collection.id,
        })) || []
      )
    })
  }, [])

  // const typeOptions =
  //   product_types?.map((tag) => ({ label: tag.value, value: tag.id })) || []

  // const setNewType = (value: string) => {
  //   const newType = {
  //     label: value,
  //     value,
  //   }

  //   typeOptions.push(newType)
  //   setValue("type", newType)

  //   return newType
  // }

  return (
    <GeneralBodyCard
      isEdit={isEdit}
      product={product}
      title="??????"
      subtitle="????????????????????????????????????????????????????????????"
    >
      <div className="mt-large">
        <h6 className="inter-base-semibold mb-1">????????????</h6>
        <label
          htmlFor="name"
          className="inter-small-regular text-grey-50 block mb-base"
        >
          ??????????????????????????????????????????????????? 50-60 ??????????????????????????????????????????
        </label>
        <div className="flex gap-8 mb-base">
          <Input
            id="name"
            label="??????"
            name="title"
            placeholder="Happy Birthday Neon Sign"
            required
            ref={register({
              required: "??????????????????",
              minLength: 1,
              pattern: /(.|\s)*\S(.|\s)*/,
            })}
          />
          <Input
            tooltipContent="SEO???????????????????????????"
            label="???????????????"
            name="handle"
            placeholder="unique-name"
            prefix="/"
            ref={register()}
          />
        </div>
        <label
          className="inter-small-regular text-grey-50 block mb-base"
          htmlFor="description"
        >
          ???????????????????????????????????????????????? 120-160 ??????????????????????????????????????????
        </label>
        <div className="grid grid-rows-3 grid-cols-2 gap-x-8 gap-y-4 mb-large">
          <Textarea
            name="description"
            id="description"
            label="??????"
            placeholder="?????????????????????..."
            className="row-span-full"
            rows={8}
            ref={register}
          />
          {/* <Controller
            // as={Select}
            control={control}
            name="collection"
            render={({ value, onChange }) => {
              return (
                <Select
                  label="??????"
                  isMultiSelect
                  placeholder="????????????"
                  options={collectionOptions}
                  onChange={onChange}
                  value={value}
                  clearSelected
                />
              )
            }}
          /> */}
          {/* <Controller
            control={control}
            name="type"
            render={({ value, onChange }) => {
              return (
                <Select
                  label="??????"
                  placeholder="????????????..."
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
                  label="?????????????????????????????????"
                  placeholder="??????, ??????..."
                  onChange={onChange}
                  values={value || []}
                />
              )
            }}
            control={control}
          /> */}
        </div>
        <div className="flex item-center gap-x-1.5 mb-xlarge">
          <Checkbox name="discountable" ref={register} label="?????????" />
          <IconTooltip content="?????????????????????????????????????????????" />
        </div>
        {showViewOptions && (
          <RadioGroup.Root
            value={viewType}
            onValueChange={setViewType}
            className="flex items-center gap-4 mt-xlarge"
          >
            <RadioGroup.SimpleItem
              label="???????????????"
              value={SINGLE_PRODUCT_VIEW}
            />
            <RadioGroup.SimpleItem
              label="?????????????????????"
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
      heading: "????????????",
      text: "?????????????????????????????????",
    })
    if (shouldDelete) {
      deleteProduct.mutate(undefined, {
        onSuccess: () => {
          notification("??????", "??????????????????", "success")
          navigate("/a/products/")
        },
        onError: (err) => {
          notification("??????", getErrorMessage(err), "error")
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
          const pastTense = newStatus === "published" ? "??????" : "????????????"
          notification("??????", `?????? ${pastTense} ??????`, "success")
        },
        onError: (err) => {
          notification("??????", getErrorMessage(err), "error")
        },
      }
    )
  }

  const actionables = [
    {
      label: "????????????",
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
            activeState="??????"
            draftState="??????"
            onChange={onStatusChange}
          />
        ) : undefined
      }
      {...props}
    />
  )
}

export default General
