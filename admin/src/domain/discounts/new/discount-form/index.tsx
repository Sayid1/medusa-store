import { Discount } from "@medusajs/medusa"
import { navigate } from "gatsby"
import * as React from "react"
import Button from "../../../../components/fundamentals/button"
import CrossIcon from "../../../../components/fundamentals/icons/cross-icon"
import FocusModal from "../../../../components/molecules/modal/focus-modal"
import Accordion from "../../../../components/organisms/accordion"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import { useDiscountForm } from "./form/discount-form-context"
import { DiscountFormValues } from "./form/mappers"
import { useFormActions } from "./form/use-form-actions"
import Conditions from "./sections/conditions"
import Configuration from "./sections/configuration"
import General from "./sections/general"
import PromotionType from "./sections/promotion-type"

type DiscountFormProps = {
  discount?: Discount
  isEdit?: boolean
  additionalOpen?: string[]
  closeForm?: () => void
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  discount,
  closeForm,
  additionalOpen = [],
  isEdit = false,
}) => {
  const notification = useNotification()
  const { handleSubmit, handleReset } = useDiscountForm()

  const { onSaveAsActive, onSaveAsInactive } = useFormActions()

  const closeFormModal = () => {
    if (closeForm) {
      closeForm()
    } else {
      navigate("/a/discounts")
    }
    handleReset()
  }

  const submitGhost = async (data: DiscountFormValues) => {
    if (!isEdit) {
      onSaveAsInactive(data)
        .then(() => {
          closeFormModal()
          handleReset()
        })
        .catch((error) => {
          notification("Error", getErrorMessage(error), "error")
        })
    } else {
      closeFormModal()
      handleReset()
    }
  }

  const submitCTA = async (data: DiscountFormValues) => {
    try {
      await onSaveAsActive(data)
      closeFormModal()
      handleReset()
    } catch (error) {
      notification("Error", getErrorMessage(error), "error")
    }
  }

  return (
    <FocusModal>
      <FocusModal.Header>
        <div className="medium:w-8/12 w-full px-8 flex justify-between">
          <Button
            size="small"
            variant="ghost"
            onClick={closeForm}
            className="border rounded-rounded w-8 h-8"
          >
            <CrossIcon size={20} />
          </Button>
          <div className="gap-x-small flex">
            <Button
              onClick={handleSubmit(submitGhost)}
              size="small"
              variant="ghost"
              className="border rounded-rounded"
            >
              保存为草稿
            </Button>
            <Button
              size="small"
              variant="primary"
              onClick={handleSubmit(submitCTA)}
              className="rounded-rounded"
            >
              {isEdit ? "保存修改" : "发布折扣"}
            </Button>
          </div>
        </div>
      </FocusModal.Header>
      <FocusModal.Main>
        <div className="flex justify-center mb-[25%]">
          <div className="medium:w-7/12 large:w-6/12 small:w-4/5 w-full pt-16">
            <h1 className="inter-xlarge-semibold">
              {isEdit ? "修改折扣" : "新建折扣"}
            </h1>
            <Accordion
              className="pt-7 text-grey-90"
              defaultValue={["discount-type", ...additionalOpen]}
              type="multiple"
            >
              <Accordion.Item
                forceMountContent
                title="折扣类型"
                required
                tooltip="选择一个折扣类型"
                value="promotion-type"
              >
                <PromotionType />
              </Accordion.Item>
              <Accordion.Item
                title="通用"
                required
                value="general"
                forceMountContent
              >
                <General discount={discount} />
              </Accordion.Item>
              <Accordion.Item
                forceMountContent
                title="配置"
                value="configuration"
                description="折扣代码适用于您点击发布按钮，如果不设置则永久生效。                "
              >
                <Configuration promotion={discount} isEdit={isEdit} />
              </Accordion.Item>
              <Accordion.Item
                forceMountContent
                title="条件"
                description="如果不设置，此折扣将适用于所有产品。"
                value="conditions"
                tooltip="Add conditions to your Discount"
              >
                <Conditions discount={discount} />
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </FocusModal.Main>
    </FocusModal>
  )
}

export default DiscountForm
