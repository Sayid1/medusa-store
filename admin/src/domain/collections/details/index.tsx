import { RouteComponentProps } from "@reach/router"
import { navigate } from "gatsby"
import {
  useAdminCollection,
  useAdminUpdateCollection,
  useAdminCreateCollection,
} from "medusa-react"
import React, { useEffect, useState } from "react"
import Spinner from "../../../components/atoms/spinner"
import EditIcon from "../../../components/fundamentals/icons/edit-icon"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import Actionables from "../../../components/molecules/actionables"
import Breadcrumb from "../../../components/molecules/breadcrumb"
// import ViewRaw from "../../../components/molecules/view-raw"
import BodyCard from "../../../components/organisms/body-card"
import DeletePrompt from "../../../components/organisms/delete-prompt"
// import { MetadataField } from "../../../components/organisms/metadata"
import CollectionModal from "../../../components/templates/collection-modal"
import AddProductsTable from "../../../components/templates/collection-product-table/add-product-table"
import AddCollectionModal from "../../../components/templates/collection-modal"
import ViewProductsTable from "../../../components/templates/collection-product-table/view-products-table"
import CollectionTable from "../../../components/templates/collections-table"
import useNotification from "../../../hooks/use-notification"
import Medusa from "../../../services/api"
import { getErrorMessage } from "../../../utils/error-messages"

const CollectionDetails: React.FC<RouteComponentProps> = ({ location }) => {
  const ensuredPath = location!.pathname.replace("/a/collections/", ``)
  // const [updateCollectionId, setUpdateCollectionId] = useState(ensuredPath)
  const { collection, isLoading, refetch } = useAdminCollection(ensuredPath)
  const updateCollection = useAdminUpdateCollection(ensuredPath)
  // const [removeParams, setRemoveParams] = useState<
  //   Partial<Record<"id" | "parentId", string>>
  // >()
  const [showEdit, setShowEdit] = useState(false)
  // const [clickChildCollection, setClickChildCollection] = useState<
  //   any | undefined
  // >(undefined)
  const [showDelete, setShowDelete] = useState(false)
  const [showAddProducts, setShowAddProducts] = useState(false)
  const [showNewCollection, setShowNewCollection] = useState(false)
  const notification = useNotification()
  const [updateProducts, setUpdateProducts] = useState(0)
  const createCollection = useAdminCreateCollection()
  // const [updateChildrenCollections, setUpdateChildrenCollections] = useState(1)
  const [existingRelations, setExistingRelations] = useState([])
  const [
    refetchAllCollectionProduct,
    setRefetchAllCollectionProduct,
  ] = useState(0)

  const handleDelete = async () => {
    const params = [collection?.id]
    if ((collection as any)?.parent_id === "0") {
      params.push(collection?.id)
    }
    return Medusa.collections.removeCollection(...params).then(() => {
      // setUpdateChildrenCollections(updateChildrenCollections + 1)
      setUpdateProducts(updateProducts + 1)
      // setClickChildCollection(null)
      if ((collection as any)?.parent_id === "0") {
        navigate(`/a/products?view=collections`)
      } else {
        navigate(`/a/collections/${collection?.id}`)
      }
    })
  }

  const uploadImage = async (image) => {
    return await Medusa.uploads
      .create([image])
      .then((ret) => {
        const uploaded = ret.data.uploads.map(({ url }) => url)
        return uploaded
      })
      .catch((err) => {
        notification("上传图片时出错", getErrorMessage(err), "error")
        return
      })
  }

  const handleUpdateDetails = async (data: any) => {
    const payload: {
      title: string
      handle?: string
      thumbnail?: string
    } = {
      title: data.title,
      handle: data.handle,
    }
    if (data.thumbnail.url.startsWith("blob")) {
      const uploadedImgs = await uploadImage(data.thumbnail.nativeFile)
      payload.thumbnail = uploadedImgs[0]
    } else {
      payload.thumbnail = data.thumbnail.url
    }

    // if (metadata.length > 0) {
    //   const payloadMetadata = metadata
    //     .filter((m) => m.key && m.value) // remove empty metadata
    //     .reduce((acc, next) => {
    //       return {
    //         ...acc,
    //         [next.key]: next.value,
    //       }
    //     }, {})

    //   payload.metadata = payloadMetadata // deleting metadata will not work as it's not supported by the core
    // }
    updateCollection.mutate(payload, {
      onSuccess: () => {
        setShowEdit(false)
        notification("成功", "已更新分类", "success")
        refetch()
      },
    })
  }

  // const handleQueryCollectionProducts = async (clickCollection) => {
  //   setClickChildCollection(clickCollection)
  // }

  const handleCreateCollection = async (data) => {
    // const metadata = colMetadata
    //   .filter((m) => m.key && m.value) // remove empty metadata
    //   .reduce((acc, next) => {
    //     return {
    //       ...acc,
    //       [next.key]: next.value,
    //     }
    //   }, {})

    await createCollection.mutateAsync(
      { ...data, parent_id: collection?.id },
      {
        onSuccess: () => {
          notification("成功", "已成功添加子分类", "success")
          // setUpdateChildrenCollections(updateChildrenCollections + 1)
          setShowNewCollection(false)
        },
        onError: (err) => notification("哎呀", getErrorMessage(err), "error"),
      }
    )
  }

  const handleAddProducts = async (selectedIds: string[]) => {
    try {
      if (selectedIds.length > 0) {
        await Medusa.collections.addProducts({
          productIds: selectedIds,
          collectionId: collection?.id,
        })
      }

      setShowAddProducts(false)
      notification("成功", "已更新分类中的产品", "success")
      setUpdateProducts(updateProducts + 1)
    } catch (error) {
      notification("Error", getErrorMessage(error), "error")
    }
  }

  useEffect(() => {
    if (collection?.id !== "0") {
      Medusa.collections.allProducts(collection?.id).then((ret) => {
        setExistingRelations(ret.data.products)
      })
    }
  }, [updateProducts, refetchAllCollectionProduct])

  return (
    <>
      <div className="flex flex-col h-full">
        <Breadcrumb
          currentPage="分类详情"
          previousBreadcrumb="分类"
          previousRoute="/a/products?view=collections"
        />
        <div className="rounded-rounded py-large px-xlarge border border-grey-20 bg-grey-0 mb-large">
          {isLoading || !collection ? (
            <div className="flex items-center w-full h-12">
              <Spinner variant="secondary" size="large" />
            </div>
          ) : (
            <div>
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="inter-xlarge-semibold mb-2xsmall">
                    {collection.title}
                  </h2>
                  <Actionables
                    forceDropdown
                    actions={[
                      {
                        label: "修改分类",
                        onClick: () => setShowEdit(true),
                        icon: <EditIcon size="20" />,
                      },
                      {
                        label: "删除",
                        onClick: () => {
                          // setRemoveParams({
                          //   id: collection.id,
                          //   parentId: collection.id,
                          // })
                          setShowDelete(!showDelete)
                        },
                        variant: "danger",
                        icon: <TrashIcon size="20" />,
                      },
                    ]}
                  />
                </div>
                <p className="inter-small-regular text-grey-50">
                  /{collection.handle}
                </p>
              </div>
              {/* {collection.metadata && (
                <div className="mt-large flex flex-col gap-y-base">
                  <h3 className="inter-base-semibold">元数据</h3>
                  <div>
                    <ViewRaw raw={collection.metadata} name="metadata" />
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
        {(collection as any)?.parent_id === "0" && (
          <BodyCard
            title="子分类列表"
            subtitle="点击分类以查看产品列表"
            className="h-full mb-large"
            actionables={[
              {
                label: "新增子分类",
                icon: <PlusIcon size="20" />,
                onClick: () => setShowNewCollection(!showNewCollection),
              },
            ]}
          >
            <div className="mt-large h-full">
              {isLoading || !collection ? (
                <div className="flex items-center w-full h-12">
                  <Spinner variant="secondary" size="large" />
                </div>
              ) : (
                // key={updateChildrenCollections} // force re-render when children collection is updated
                <CollectionTable parentId={collection.id} />

                // onRowClick={handleQueryCollectionProducts}
                // clickCollection={clickChildCollection}
                // onUpdate={handleUpdateChildrenDetails}
                // onDelete={(id: string) => {
                //   setRemoveParams({
                //     id,
                //   })
                //   setShowDelete(!showDelete)
                // }}
              )}
            </div>
          </BodyCard>
        )}
        {/* subtitle="要开始销售，只需要填写名称、价格和图像。" */}
        {(collection as any)?.parent_id !== "0" && (
          <BodyCard
            title="产品列表"
            className="h-full"
            actionables={[
              {
                label: "编辑产品列表",
                icon: <EditIcon size="20" />,
                onClick: () => setShowAddProducts(!showAddProducts),
              },
            ]}
          >
            <div className="mt-large h-full">
              {isLoading || !collection ? (
                <div className="flex items-center w-full h-12">
                  <Spinner variant="secondary" size="large" />
                </div>
              ) : (
                <ViewProductsTable
                  key={updateProducts} // force re-render when collection is updated
                  collectionId={collection?.id}
                  refetchAllCollectionProduct={setRefetchAllCollectionProduct}
                />
              )}
            </div>
          </BodyCard>
        )}
      </div>
      {showEdit && (
        <CollectionModal
          onClose={() => setShowEdit(!showEdit)}
          onSubmit={handleUpdateDetails}
          isEdit
          collection={collection}
        />
      )}
      {showDelete && (
        <DeletePrompt
          handleClose={() => setShowDelete(!showDelete)}
          heading={`确认删除分类吗？${
            (collection as any)?.parent_id ? "将会删除所有子分类" : ""
          }`}
          successText="成功删除分类"
          onDelete={handleDelete}
          confirmText="确认"
        />
      )}
      {showAddProducts && (
        <AddProductsTable
          onClose={() => setShowAddProducts(false)}
          onSubmit={handleAddProducts}
          existingRelations={existingRelations}
        />
      )}
      {showNewCollection && (
        <AddCollectionModal
          onClose={() => setShowNewCollection(!showNewCollection)}
          onSubmit={handleCreateCollection}
        />
      )}
    </>
  )
}

export default CollectionDetails
