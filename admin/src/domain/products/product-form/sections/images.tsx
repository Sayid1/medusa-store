import React from "react"
import { Controller } from "react-hook-form"
import FileUploadField from "../../../../components/atoms/file-upload-field"
import BodyCard from "../../../../components/organisms/body-card"
import RadioGroup from "../../../../components/organisms/radio-group"
import DraggableTable from "../../../../components/templates/draggable-table"
import { useProductForm } from "../form/product-form-context"

const columns = [
  {
    Header: "图片",
    accessor: "image",
    Cell: ({ cell }) => {
      return (
        <div className="py-base large:w-[176px] xsmall:w-[80px]">
          <img
            className="h-[80px] w-[80px] object-cover rounded"
            src={cell.row.original.url}
          />
        </div>
      )
    },
  },
  {
    Header: "文件名称",
    accessor: "name",
    Cell: ({ cell }) => {
      return (
        <div className="large:w-[700px] medium:w-[400px] small:w-auto">
          <p className="inter-small-regular">{cell.row.original?.name}</p>
          <span className="inter-small-regular text-grey-50">
            {typeof cell.row.original.size === "number"
              ? `${(cell.row.original.size / 1024).toFixed(2)} KB`
              : cell.row.original?.size}
          </span>
        </div>
      )
    },
  },
  {
    Header: <div className="text-center">缩略图</div>,
    accessor: "thumbnail",
    Cell: ({ cell }) => {
      return (
        <div className="flex justify-center">
          <RadioGroup.SimpleItem
            className="justify-center"
            value={cell.row.index}
          />
        </div>
      )
    },
  },
]

const Images = () => {
  const {
    images,
    setImages,
    appendImage,
    removeImage,
    control,
  } = useProductForm()

  return (
    <BodyCard title="图片" subtitle="最多为您的产品添加 10 张图片">
      <div className="mt-base">
        <Controller
          name="thumbnail"
          control={control}
          render={({ value, onChange }) => {
            return (
              <RadioGroup.Root
                value={value}
                onValueChange={(value) => {
                  onChange(value)
                }}
              >
                <DraggableTable
                  onDelete={removeImage}
                  columns={columns}
                  entities={images}
                  setEntities={setImages}
                />
              </RadioGroup.Root>
            )
          }}
        />
      </div>
      <div className="mt-2xlarge">
        <FileUploadField
          onFileChosen={(files: any[]) => {
            const imgs = Array.from(files).map((file) => ({
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              nativeFile: file,
            }))
            appendImage(imgs)
          }}
          placeholder="推荐 1200 x 1600 (3:4)，每个最大 10MB"
          filetypes={["png", "jpg", "jpeg"]}
          className="py-large"
        />
      </div>
    </BodyCard>
  )
}

export default Images
