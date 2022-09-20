import React from "react"
import clsx from "clsx"
import { FileUploader } from "react-drag-drop-files"

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
  <span>
    图片拖放在这里，或者 <span className="text-violet-60">点击上传</span>
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
        "!py-0 flex flex-col select-none inter-base-regular text-grey-50 cursor-pointer items-center justify-center w-full h-full rounded-rounded border-2 border-dashed border-grey-20 transition-colors hover:border-violet-60 hover:text-grey-40 !max-w-none",
        className
      )}
      handleChange={onFileChosen}
      multiple={multiple}
      label={placeholder}
      types={filetypes}
    >
      {children || (
        <div className="flex flex-col items-center py-10">
          <p>{text}</p>
          {placeholder}
        </div>
      )}
    </FileUploader>
  )
}

export default FileUploadField
