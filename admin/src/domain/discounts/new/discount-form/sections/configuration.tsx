import { Discount } from "@medusajs/medusa"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import DatePicker from "../../../../../components/atoms/date-picker/date-picker"
import TimePicker from "../../../../../components/atoms/date-picker/time-picker"
import Switch from "../../../../../components/atoms/switch"
import AvailabilityDuration from "../../../../../components/molecules/availability-duration"
import InputField from "../../../../../components/molecules/input"
import Accordion from "../../../../../components/organisms/accordion"
import { useDiscountForm } from "../form/discount-form-context"

type SettingsProps = {
  isEdit?: boolean
  promotion?: Discount
}

const getActiveTabs = (promotion: Discount) => {
  const activeTabs: string[] = []

  if (promotion.usage_limit !== null) {
    activeTabs.push("usage_limit")
  }

  if (promotion.starts_at !== null) {
    activeTabs.push("starts_at")
  }

  if (promotion.ends_at !== null) {
    activeTabs.push("ends_at")
  }

  if (promotion.valid_duration !== null) {
    activeTabs.push("valid_duration")
  }

  return activeTabs
}

const Settings: React.FC<SettingsProps> = ({ promotion, isEdit = false }) => {
  const {
    register,
    control,
    isDynamic,
    hasExpiryDate,
    handleConfigurationChanged,
  } = useDiscountForm()

  const [openItems, setOpenItems] = React.useState<string[]>(
    isEdit && promotion
      ? getActiveTabs(promotion)
      : [...(hasExpiryDate ? ["ends_at"] : [])]
  )

  const marginTransition =
    "transition-[margin] duration-300 ease-[cubic-bezier(0.87, 0, 0.13, 1) forwards]"

  const [render, setRender] = useState(false)
  useEffect(() => {
    setTimeout(() => setRender(true), 300)
  }, [])

  return (
    <div className="flex flex-col">
      <Accordion
        className="pt-7 text-grey-90"
        type="multiple"
        value={openItems || []}
        onValueChange={(values) => {
          handleConfigurationChanged(values)

          setOpenItems(values)
        }}
      >
        {render && (
          <>
            <Accordion.Item
              headingSize="medium"
              forceMountContent
              className="border-b-0"
              title="Start date"
              subtitle="设置折扣以在将来激活。"
              tooltip="如果您想设置折扣在未来激活，您可以在此处设置开始日期，否则折扣将立即生效。"
              value="starts_at"
              customTrigger={
                <Switch checked={openItems.indexOf("starts_at") > -1} />
              }
            >
              <div
                className={clsx(
                  "flex items-center gap-xsmall",
                  marginTransition,
                  {
                    "mt-4": openItems.indexOf("starts_at") > -1,
                  }
                )}
              >
                <Controller
                  name="starts_at"
                  control={control}
                  render={({ value, onChange }) => {
                    const date = value || new Date()
                    return (
                      <>
                        <DatePicker
                          date={date}
                          label="开始日期"
                          onSubmitDate={onChange}
                        />
                        <TimePicker
                          label="开始时间"
                          date={date}
                          onSubmitDate={onChange}
                        />
                      </>
                    )
                  }}
                />
              </div>
            </Accordion.Item>
            <Accordion.Item
              headingSize="medium"
              forceMountContent
              className="border-b-0"
              title="折扣有有效期吗？"
              subtitle="设置折扣以在将来停用。"
              tooltip="如果您想设置折扣在未来停用，您可以在此处设置到期日期。"
              value="ends_at"
              customTrigger={
                <Switch checked={openItems.indexOf("ends_at") > -1} />
              }
            >
              <div
                className={clsx(
                  "flex items-center gap-xsmall",
                  marginTransition,
                  {
                    "mt-4": openItems.indexOf("ends_at") > -1,
                  }
                )}
              >
                <Controller
                  name="ends_at"
                  control={control}
                  render={({ value, onChange }) => {
                    const date =
                      value ||
                      new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                    return (
                      <>
                        <DatePicker
                          date={date}
                          label="过期日期"
                          onSubmitDate={onChange}
                        />
                        <TimePicker
                          label="过期时间"
                          date={date}
                          onSubmitDate={onChange}
                        />
                      </>
                    )
                  }}
                />
              </div>
            </Accordion.Item>
            <Accordion.Item
              headingSize="medium"
              forceMountContent
              className="border-b-0"
              title="限制兑换次数？"
              subtitle="限制适用于所有客户，而不是每个客户。"
              tooltip="如果您希望限制客户可以兑换此折扣的次数，您可以在此处设置限制。"
              value="usage_limit"
              customTrigger={
                <Switch checked={openItems.indexOf("usage_limit") > -1} />
              }
            >
              <div
                className={clsx(marginTransition, {
                  "mt-4": openItems.indexOf("usage_limit") > -1,
                })}
              >
                <InputField
                  name="usage_limit"
                  ref={register({ valueAsNumber: true })}
                  label="兑换次数"
                  type="number"
                  placeholder="5"
                  min={1}
                />
              </div>
            </Accordion.Item>

            {isDynamic && (
              <Accordion.Item
                disabled={!isDynamic}
                headingSize="medium"
                forceMountContent
                title="可用性持续时间？"
                className="border-b-0"
                subtitle="设置折扣的持续时间。"
                tooltip="选择折扣类型"
                value="valid_duration"
                customTrigger={
                  <Switch checked={openItems.indexOf("valid_duration") > -1} />
                }
              >
                <div
                  className={clsx(marginTransition, {
                    "mt-4": openItems.indexOf("valid_duration") > -1,
                  })}
                >
                  <Controller
                    name="valid_duration"
                    control={control}
                    render={({ value, onChange }) => {
                      return (
                        <AvailabilityDuration
                          value={value ?? undefined}
                          onChange={onChange}
                        />
                      )
                    }}
                  />
                </div>
              </Accordion.Item>
            )}
          </>
        )}
      </Accordion>
    </div>
  )
}

export default Settings
