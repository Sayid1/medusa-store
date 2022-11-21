import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className="accent-[#9C1AA8] rounded h-4 w-4"
      />
      <span className="ml-1">{label}</span>
    </label>
    // <button
    //   className="text-xl flex items-center gap-x-2"
    //   role="checkbox"
    //   type="button"
    //   aria-checked={checked}
    //   onClick={onChange}
    // >
    //   <div
    //     role="checkbox"
    //     aria-checked={checked}
    //     className="border border-[#9C1AA8] rounded-sm w-5 h-5 flex items-center justify-center"
    //   >
    //     {checked ? (
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         fill="#9C1AA8"
    //         className="w-5 h-5"
    //       >
    //         <path
    //           fillRule="evenodd"
    //           d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
    //           clipRule="evenodd"
    //         />
    //       </svg>
    //     ) : null}
    //   </div>
    //   <span>{label}</span>
    // </button>
  )
}

export default Checkbox
