import { navigate } from "gatsby"
import { useAdminDeleteProduct, useAdminUpdateProduct } from "medusa-react"
import * as React from "react"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import DuplicateIcon from "../../fundamentals/icons/duplicate-icon"
import EditIcon from "../../fundamentals/icons/edit-icon"
import PublishIcon from "../../fundamentals/icons/publish-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import UnpublishIcon from "../../fundamentals/icons/unpublish-icon"
import { ActionType } from "../../molecules/actionables"
import useCopyProduct from "./use-copy-product"

const useProductActions = (product) => {
  const notification = useNotification()
  const dialog = useImperativeDialog()
  const copyProduct = useCopyProduct()
  const deleteProduct = useAdminDeleteProduct(product?.id)
  const updateProduct = useAdminUpdateProduct(product?.id)

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "删除产品",
      text: "您确定要删除此产品吗？",
    })

    if (shouldDelete) {
      deleteProduct.mutate()
    }
  }

  const getActions = (): ActionType[] => [
    {
      label: "修改",
      onClick: () => navigate(`/a/products/${product.id}`),
      icon: <EditIcon size={20} />,
    },
    {
      label: product.status === "published" ? "取消发布" : "发布",
      onClick: () => {
        const newStatus = product.status === "published" ? "draft" : "published"
        updateProduct.mutate(
          {
            status: newStatus,
          },
          {
            onSuccess: () => {
              notification(
                "成功",
                `成功 ${
                  product.status === "published" ? "取消发布" : "发布"
                } 产品`,
                "success"
              )
            },
            onError: (err) =>
              notification("Error", getErrorMessage(err), "error"),
          }
        )
      },
      icon:
        product.status === "published" ? (
          <UnpublishIcon size={20} />
        ) : (
          <PublishIcon size={20} />
        ),
    },
    {
      label: "复制",
      onClick: () => copyProduct(product),
      icon: <DuplicateIcon size={20} />,
    },
    {
      label: "删除",
      variant: "danger",
      onClick: handleDelete,
      icon: <TrashIcon size={20} />,
    },
  ]

  return {
    getActions,
  }
}

export default useProductActions
