import { navigate } from "gatsby"
import { useAdminCreateProduct } from "medusa-react"
import React, { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import toast from "react-hot-toast"
import Toaster from "../../components/declarative-toaster"
import FormToasterContainer from "../../components/molecules/form-toaster"
import { FeatureFlagContext } from "../../context/feature-flag"
import useNotification from "../../hooks/use-notification"
import Medusa from "../../services/api"
import { consolidateImages } from "../../utils/consolidate-images"
import { getErrorMessage } from "../../utils/error-messages"
import { checkForDirtyState } from "../../utils/form-helpers"
import { handleFormError } from "../../utils/handle-form-error"
import ProductForm from "./product-form"
import { formValuesToCreateProductMapper } from "./product-form/form/mappers"
import {
  ProductFormProvider,
  useProductForm,
} from "./product-form/form/product-form-context"

const TOAST_ID = "new-product-dirty"

const NewProductPage = () => {
  const notification = useNotification()
  const createProduct = useAdminCreateProduct()
  const [isLoading, setIsLoading] = useState(false)

  const { isFeatureEnabled } = React.useContext(FeatureFlagContext)

  const onSubmit = async (data, viewType) => {
    setIsLoading(true)

    const images = data.images
      .filter((img) => img.url.startsWith("blob"))
      .map((img) => img.nativeFile)

    let uploadedImgs = []
    if (images.length > 0) {
      uploadedImgs = await Medusa.uploads
        .create(images)
        .then((ret) => {
          console.log("first", ret)
          const uploaded = ret.data.uploads.map(({ url }) => url)
          return uploaded
        })
        .catch((err) => {
          setIsLoading(false)
          notification("上传图片时出错", getErrorMessage(err), "error")
          return
        })
    }
    const newData = {
      ...data,
      images: consolidateImages(data.images, uploadedImgs),
    }

    createProduct.mutate(
      formValuesToCreateProductMapper(newData, viewType, isFeatureEnabled),
      {
        onSuccess: ({ product }) => {
          setIsLoading(false)
          notification("成功", "产品创建成功", "success")
          navigate(`/a/products/${product.id}`)
        },
        onError: (error) => {
          setIsLoading(false)
          notification("哎呀", getErrorMessage(error), "error")
        },
      }
    )
  }

  return (
    <ProductFormProvider onSubmit={onSubmit}>
      <ProductForm />
      <SaveNotification isLoading={isLoading} />
    </ProductFormProvider>
  )
}

const SaveNotification = ({ isLoading = false }) => {
  const {
    formState,
    onSubmit,
    handleSubmit,
    resetForm,
    additionalDirtyState,
  } = useProductForm()
  const [visible, setVisible] = useState(false)

  const onPublish = (values: FieldValues) => {
    onSubmit({ ...values, status: "published" })
    resetForm()
  }

  const onSaveDraft = (values: FieldValues) => {
    onSubmit({ ...values, status: "draft" })
    resetForm()
  }

  const isDirty = checkForDirtyState(
    formState.dirtyFields,
    additionalDirtyState
  )

  useEffect(() => {
    if (isDirty) {
      setVisible(true)
    } else {
      setVisible(false)
    }

    return () => {
      toast.dismiss(TOAST_ID)
    }
  }, [isDirty])

  return (
    <Toaster
      visible={visible}
      duration={Infinity}
      id={TOAST_ID}
      position="bottom-right"
    >
      <FormToasterContainer isLoading={isLoading}>
        <FormToasterContainer.Actions>
          <FormToasterContainer.MultiActionButton
            actions={[
              {
                label: "保存并且发布",
                onClick: handleSubmit(onPublish, handleFormError),
              },
              {
                label: "保存为草稿",
                onClick: handleSubmit(onSaveDraft, handleFormError),
              },
            ]}
          >
            保存
          </FormToasterContainer.MultiActionButton>
          <FormToasterContainer.DiscardButton onClick={resetForm}>
            重置
          </FormToasterContainer.DiscardButton>
        </FormToasterContainer.Actions>
      </FormToasterContainer>
    </Toaster>
  )
}

export default NewProductPage
