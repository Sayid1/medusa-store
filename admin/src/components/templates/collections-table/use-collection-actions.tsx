import { navigate } from "gatsby"
// import { useAdminDeleteCollection } from "medusa-react"
import * as React from "react"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import EditIcon from "../../fundamentals/icons/edit-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import { ActionType } from "../../molecules/actionables"
import Medusa from "../../../services/api"

const useCollectionActions = (collection, refetch) => {
  const dialog = useImperativeDialog()
  // const deleteCollection = useAdminDeleteCollection(collection?.id)

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "删除分类",
      text: `确认删除分类吗？${
        (collection as any)?.parent_id === "0" ? "将会删除所有子分类" : ""
      }`,
    })

    if (shouldDelete) {
      Medusa.collections
        .removeCollection(collection?.id, collection?.id)
        .then(refetch)
      // deleteCollection.mutate()
    }
  }

  const getActions = (coll): ActionType[] => [
    {
      label: "修改",
      onClick: () => navigate(`/a/collections/${coll.id}`),
      icon: <EditIcon size={20} />,
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

export default useCollectionActions
