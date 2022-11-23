import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import ProductSection from "@modules/products/components/product-section"
import NeonCommonComponent from "@modules/neon-common-options"
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from "react-hook-form"
import clsx from "clsx"
import React, { useMemo } from "react"
import { Product } from "types/medusa"
import {
  COLOURS,
  PLUGS,
  BACKBOARD_COLORS,
  SIZES,
  USEAGE,
  BACKBOARD_STYLES,
} from "@lib/constants"

// const plugOptions = PLUGS.map((plug) => ({ id: plug, name: plug }))
// const boardOptions = BACKBOARD_COLORS.map((board) => ({
//   id: board,
//   name: board,
// }))

type ProductActionsProps = {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const { control, watch } = useFormContext()
  // const formMethods = useForm({
  //   defaultValues: {
  //     colour: COLOURS[0],
  //     boardColor: boardOptions[0],
  //     plug: plugOptions[0],
  //     useage: USEAGE[0],
  //     size: SIZES[0].size,
  //     boardStyle: BACKBOARD_STYLES[0].name,
  //     // usage: usageOptions[0],
  //   },
  // })

  // const { handleSubmit, control, watch } = formMethods

  // const submit = (option: any) => {
  //   addToCart({
  //     name: product.title,
  //     size: option.size,
  //     color: option.colour.color,
  //     useage: option.useage,
  //     boardStyle: option.boardStyle,
  //     plug: option.plug.name,
  //     boardColor: option.boardColor.name,
  //   })
  //   // prod_01GF3MQKYSNTYTMCTK82F0FZTJ 定制产品ID
  // }

  return (
    // <FormProvider {...formMethods}>
    //   <form onSubmit={handleSubmit(submit)}>
    <div className="flex flex-col gap-y-2">
      <h3 className="text-3xl text-[#9C1AA8]">{product.title}</h3>

      <p className="text-xl whitespace-pre-line">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="mt-8 mb-4 flex flex-col gap-y-6">
          {product.options.map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <ProductSection
        index={2}
        title={"Select Colour"}
        open
        selected={watch("colour").color}
      >
        <Controller
          control={control}
          name="colour"
          render={({ field }) => (
            <div className="flex flex-wrap mt-4 justify-center font-semibold">
              {COLOURS.map((colour) => (
                <div
                  key={colour.color}
                  onClick={() => field.onChange(colour)}
                  className={clsx(
                    "flex flex-col justify-start items-center cursor-pointer rounded-md text-[#000] border-2 border-transparent hover:border-[#9C1AA8] hover:border-solid w-[70px] h-[90px] px-2 mb-2 mr-2",
                    {
                      "!bg-[#9C1AA8] !text-white":
                        colour.color === field.value.color,
                    }
                  )}
                >
                  <i
                    className="icofont-light-bulb text-2xl"
                    style={{
                      color: colour.bulbColor,
                      textShadow: colour.bulbTextShadow,
                    }}
                  ></i>
                  <span className="sign-font-name text-lg text-center font-thin">
                    {colour.color}
                  </span>
                </div>
              ))}
            </div>
          )}
        />
      </ProductSection>
      <NeonCommonComponent />

      <div className="my-4">
        {selectedPrice ? (
          <div className="flex items-end">
            <span
              className={clsx(
                "bg-clip-text text-4xl text-[#9C1AA8] font-DIN bg-gradient-radial from-[#e61a5e] to-[#5e1ae6]",
                {
                  "text-rose-600": selectedPrice.price_type === "sale",
                }
              )}
              style={{
                WebkitTextFillColor: "transparent",
              }}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <p className="ml-8 text-[#FFB119] text-3xl font-DIN line-through">
                {selectedPrice.original_price}
              </p>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Button type="submit">{!inStock ? "Out of stock" : "Add to cart"}</Button>
    </div>
    //   </form>
    // </FormProvider>
  )
}

export default ProductActions
