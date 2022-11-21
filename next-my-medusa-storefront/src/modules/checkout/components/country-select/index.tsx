import NativeSelect from "@modules/common/components/native-select"
import SelectMain from "@modules/common/components/select/main"
import { useCart, useRegions } from "medusa-react"
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

const CountrySelect = forwardRef<HTMLSelectElement, any>(
  ({ placeholder = "Country", control, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    const { regions } = useRegions()
    const { cart } = useCart()

    const countryOptions = useMemo(() => {
      const currentRegion = regions?.find((r) => r.id === cart?.region_id)

      if (!currentRegion) {
        return []
      }

      console.log("countryOptions", currentRegion)
      return currentRegion.countries.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
    }, [regions, cart])

    console.log(props)

    return (
      <SelectMain
        options={countryOptions}
        name={props.name}
        filter
        control={control}
        borderBlack={false}
        placeholder={placeholder}
      />
      // <NativeSelect ref={innerRef} placeholder={placeholder} {...props}>
      //   {countryOptions.map(({ value, label }, index) => (
      //     <option key={index} value={value}>
      //       {label}
      //     </option>
      //   ))}
      // </NativeSelect>
    )
  }
)

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
