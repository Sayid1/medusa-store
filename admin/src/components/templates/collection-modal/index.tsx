import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Medusa from "../../../services/api"
import Button from "../../fundamentals/button"
import IconTooltip from "../../molecules/icon-tooltip"
import InputField from "../../molecules/input"
import Modal from "../../molecules/modal"
import useNotification from "../../../hooks/use-notification"
import FileUploadField from "../../../components/atoms/file-upload-field"
// import Metadata, { MetadataField } from "../../organisms/metadata"

type CollectionModalProps = {
  onClose: () => void
  onSubmit: (values: any) => void
  isEdit?: boolean
  collection?: any
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  onClose,
  onSubmit,
  isEdit = false,
  collection,
}) => {
  const { register, setValue, handleSubmit } = useForm()
  // const [metadata, setMetadata] = useState<MetadataField[]>([])
  const [allCollections, setAllCollections] = useState<any[]>([])
  const [thumbnail, setThumbnail] = useState<any>()
  const notification = useNotification()

  if (isEdit && !collection) {
    throw new Error("Collection is required for edit")
  }

  useEffect(() => {
    register("title", { required: true })
    register("handle")
    Medusa.collections.all().then((ret) => {
      setAllCollections(
        ret.data.map((collection) => ({
          label: collection.title,
          value: collection.id,
          handle: collection.handle,
        }))
      )
    })
  }, [])

  useEffect(() => {
    if (isEdit && collection) {
      setValue("title", collection.title)
      setValue("handle", collection.handle)
      setThumbnail({
        url: collection.thumbnail,
      })
      // if (collection.metadata) {
      //   Object.entries(collection.metadata).map(([key, value]) => {
      //     const newMeta = metadata
      //     newMeta.push({ key, value })
      //     setMetadata(newMeta)
      //   })
      // }
    }
  }, [collection, isEdit])

  const submit = (data: any) => {
    const existingHandle = allCollections.some(({ value, handle }) => {
      if (isEdit) {
        return handle === data.handle && value !== collection.id
      } else {
        return handle === data.handle
      }
    })
    if (existingHandle) {
      notification("哎呀", "唯一标识已存在", "warning")
      return
    }
    if (!thumbnail) {
      notification("哎呀", "必须要上传分类缩略图", "warning")
      return
    }
    onSubmit(
      {
        handle: data.handle,
        title: data.title,
        parent_id: data?.parent?.value ?? "0",
        thumbnail,
      }
      // metadata
    )
  }

  return (
    <Modal handleClose={onClose}>
      <Modal.Body>
        <Modal.Header handleClose={onClose}>
          <div>
            <h1 className="inter-xlarge-semibold mb-2xsmall">
              {isEdit ? "修改分类" : "添加分类"}
            </h1>
            <p className="inter-small-regular text-grey-50">
              要创建一个分类，您只需要一个标题和一个唯一标识。
            </p>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(submit)}>
          <Modal.Content isLargeModal>
            <div className="flex justify-between">
              <div className="w-[340px]">
                <h2 className="inter-base-semibold mb-base">详情</h2>
                <div className="gap-x-base">
                  <InputField
                    label="标题"
                    required
                    placeholder="Happy Neon Signs"
                    name="title"
                    ref={register({ required: true })}
                  />
                  <InputField
                    className="mt-2xlarge"
                    label="唯一标识"
                    placeholder="happy-neon-signs"
                    name="handle"
                    prefix="/"
                    tooltip={
                      <IconTooltip content="产品的 URL Slug。 如果留空，将自动生成。" />
                    }
                    ref={register}
                  />
                </div>
              </div>
              <div className="w-[300px]">
                <h2 className="inter-base-semibold mb-base flex">
                  分类缩略图<div className="text-rose-50 "> *</div>
                </h2>
                <div className="w-[300px] h-[400px]">
                  <FileUploadField
                    multiple={false}
                    onFileChosen={(file: File) => {
                      const thumbnail = {
                        url: URL.createObjectURL(file),
                        name: file.name,
                        size: file.size,
                        nativeFile: file,
                      }
                      setThumbnail(thumbnail)
                    }}
                    placeholder="推荐 1200 x 1600 (3:4)，最大 10MB"
                    filetypes={["png", "jpg", "jpeg"]}
                    className="py-large"
                  >
                    {thumbnail && (
                      // <div className="py-base large:w-[176px] xsmall:w-[80px]">
                      <img
                        className="h-full w-full object-cover rounded"
                        src={thumbnail.url}
                      />
                      // </div>
                    )}
                  </FileUploadField>
                </div>
              </div>
            </div>
            {/* <div className="mt-xlarge w-full">
              <Metadata setMetadata={setMetadata} metadata={metadata} />
            </div> */}
          </Modal.Content>
          <Modal.Footer>
            <div className="flex items-center justify-end w-full gap-x-xsmall">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={onClose}
              >
                取消
              </Button>
              <Button variant="primary" size="small">
                {`${isEdit ? "保存" : "发布"} 分类`}
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CollectionModal
