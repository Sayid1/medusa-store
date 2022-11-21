// import React, { useState } from "react"
// import Select from "@modules/common/components/select"
// import ProductSection from "@modules/products/components/product-section"
// import Tooltip from "@modules/common/components/tooltip"
// import { PLUGS, BACKBOARD_COLORS } from "@lib/constants"
// import NeonBackboard from "@modules/neon-backboard"
// import { useForm } from "react-hook-form"

// const usage = ["For indoor use only", "For outdoor use (water resistant)"]

// const usageOptions = usage.map((ua) => ({ id: ua, name: ua }))
// const plugOptions = PLUGS.map((plug) => ({ id: plug, name: plug }))
// const boardOptions = BACKBOARD_COLORS.map((board) => ({
//   id: board,
//   name: board,
// }))

// const OptionTitle = (props: { title: string }) => (
//   <div className="mb-1">
//     <span
//       style={{ verticalAlign: "inherit" }}
//       className="text-slate-700 font-semibold text-md uppercase"
//     >
//       {props.title}
//     </span>
//   </div>
// )

// const BoardStyle = () => {
//   const [selected, setSelected] = useState(0)
//   const { control } = useForm({
//     defaultValues: {
//       backboard: boardOptions[0],
//       // plug: plugOptions[0],
//       // usage: usageOptions[0],
//     },
//   })

//   return (
//     <ProductSection index={2} title={"CHOOSE NEON DETAILS"} open>
//       <OptionTitle title="CHOOSE NEON BACKBOARD STYLE" />
//       <NeonBackboard />

//       <div className="mt-4">
//         <form>
//           <Select
//             name="backboard"
//             control={control}
//             options={boardOptions}
//             // defaultValue={BACKBOARD_COLORS[0]}
//             title="CHOOSE BACKBOARD COLOR"
//           />
//         </form>
//       </div>
//       {/* <div className="mt-4">
//         <Select
//           options={plugOptions}
//           name="plug"
//           control={control}
//           // defaultValue={PLUGS[0]}
//           title={<OptionTitle title="POWER PLUG" />}
//         />
//       </div>
//       <div className="mt-4">
//         <Select
//           options={usageOptions}
//           name="usage"
//           control={control}
//           // defaultValue={usage[0]}
//           title={<OptionTitle title="SIGN USAGE" />}
//         />
//       </div> */}
//       <div>***A remote and dimmer is included free with every sign!</div>
//     </ProductSection>
//   )
// }

// export default BoardStyle
