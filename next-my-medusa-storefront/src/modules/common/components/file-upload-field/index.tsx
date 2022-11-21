import React from "react"
import clsx from "clsx"
import { FileUploader } from "react-drag-drop-files"
import { CloudArrowUpIcon } from "@heroicons/react/24/solid"

type FileUploadFieldProps = {
  onFileChosen: (files: any) => void
  filetypes: string[]
  errorMessage?: string
  placeholder?: React.ReactElement | string
  className?: string
  text?: React.ReactElement | string
  multiple?: Boolean
}

const defaultText = (
  <span className="text-gray-500 text-xl">
    Drag and drop file here, or{" "}
    <span className="text-[#9C1AA8]">click to upload</span>
  </span>
)

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onFileChosen,
  filetypes,
  className,
  children,
  text = defaultText,
  placeholder = "",
  multiple = true,
}) => {
  return (
    <FileUploader
      classes={clsx(
        "!py-0 flex rounded-xl flex-col select-none inter-base-regular cursor-pointer items-center justify-center w-full h-full rounded-rounded border-2 border-dashed border-grey-20 transition-colors hover:border-[#9C1AA8] !max-w-none",
        className
      )}
      handleChange={onFileChosen}
      multiple={multiple}
      label={placeholder}
      types={filetypes}
    >
      {children || (
        <div className="flex flex-col items-center py-10 px-4 text-center">
          <CloudArrowUpIcon className="w-20 h-20" />
          <p>{text}</p>
          {placeholder}
        </div>
      )}
    </FileUploader>
  )
}

export default FileUploadField
