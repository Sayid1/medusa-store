import { Discount } from "@medusajs/medusa"
import { useAdminRegions } from "medusa-react"
import React, { useEffect, useMemo, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import Checkbox from "../../../../../components/atoms/checkbox"
import IconTooltip from "../../../../../components/molecules/icon-tooltip"
import InputField from "../../../../../components/molecules/input"
import Select from "../../../../../components/molecules/select"
import Textarea from "../../../../../components/molecules/textarea"
import CurrencyInput from "../../../../../components/organisms/currency-input"
import { useDiscountForm } from "../form/discount-form-context"

type GeneralProps = {
  discount?: Discount
}

const General: React.FC<GeneralProps> = ({ discount }) => {
  const initialCurrency = discount?.regions?.[0].currency_code || undefined

  const [fixedRegionCurrency, setFixedRegionCurrency] = useState<
    string | undefined
  >(initialCurrency)

  const { regions: opts } = useAdminRegions()
  const { register, control, type } = useDiscountForm()

  const regions = useWatch({
    control,
    name: "regions",
  })

  useEffect(() => {
    if (type === "fixed" && regions) {
      let id: string

      if (Array.isArray(regions) && regions.length) {
        id = regions[0].value
      } else {
        id = ((regions as unknown) as { label: string; value: string }).value // if you change from fixed to percentage, unselect and select a region, and then change back to fixed it is possible to make useForm set regions to an object instead of an array
      }

      const reg = opts?.find((r) => r.id === id)

      if (reg) {
        setFixedRegionCurrency(reg.currency_code)
      }
    }
  }, [type, opts, regions])

  const regionOptions = useMemo(() => {
    return opts?.map((r) => ({ value: r.id, label: r.name })) || []
  }, [opts])

  const [render, setRender] = useState(false)
  useEffect(() => {
    setTimeout(() => setRender(true), 100)
  }, [])

  return (
    <div className="pt-5">
      {render && (
        <>
          <Controller
            name="地区"
            control={control}
            rules={{
              required: "至少需要一个区域",
              validate: (value) =>
                Array.isArray(value) ? value.length > 0 : !!value,
            }}
            render={({ onChange, value }) => {
              return (
                <Select
                  value={value || null}
                  onChange={(value) => {
                    onChange(type === "fixed" ? [value] : value)
                  }}
                  label="选择有效地区"
                  isMultiSelect={type !== "fixed"}
                  hasSelectAll={type !== "fixed"}
                  enableSearch
                  required
                  options={regionOptions}
                />
              )
            }}
          />
          <div className="flex gap-x-base gap-y-base my-base">
            <InputField
              label="折扣编码"
              className="flex-1"
              placeholder="夏季特卖"
              required
              name="code"
              ref={register({ required: "请输入折扣编码" })}
            />

            {type !== "free_shipping" && (
              <>
                {type === "fixed" ? (
                  <div className="flex-1">
                    <CurrencyInput
                      size="small"
                      currentCurrency={fixedRegionCurrency}
                      readOnly
                      hideCurrency
                    >
                      <Controller
                        name="rule.value"
                        control={control}
                        rules={{
                          required: "请输入金额",
                          min: 1,
                        }}
                        render={({ value, onChange }) => {
                          return (
                            <CurrencyInput.AmountInput
                              label={"Amount"}
                              required
                              amount={value}
                              onChange={onChange}
                            />
                          )
                        }}
                      />
                    </CurrencyInput>
                  </div>
                ) : (
                  <div className="flex-1">
                    <InputField
                      label="百分比"
                      min={0}
                      required
                      type="number"
                      placeholder="10"
                      prefix={"%"}
                      name="rule.value"
                      ref={register({
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="text-grey-50 inter-small-regular flex flex-col mb-6">
            <span>
              您的客户将在结账时输入的编码。 这将出现在您客户的发票上。
            </span>
            <span>仅限大写字母和数字。</span>
          </div>
          <Textarea
            label="描述"
            required
            placeholder="2022 年夏季特卖"
            rows={1}
            name="rule.description"
            ref={register({
              required: true,
            })}
          />
          <div className="mt-xlarge flex items-center">
            <Controller
              name="is_dynamic"
              control={control}
              render={({ onChange, value }) => {
                return (
                  <Checkbox
                    label="这是模板折扣"
                    name="is_dynamic"
                    id="is_dynamic"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                )
              }}
            />
            <IconTooltip
              content={
                "模板折扣允许您定义一组可用于一组折扣的规则。 这在应该为每个用户生成唯一代码，但所有唯一代码的规则应该相同的活动中很有用。"
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default General
