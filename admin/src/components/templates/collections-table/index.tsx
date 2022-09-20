import { navigate } from "gatsby"
import { useAdminCollections, useAdminUpdateCollection } from "medusa-react"
import React, { useEffect, useState } from "react"
import { usePagination, useTable } from "react-table"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import EditIcon from "../../fundamentals/icons/edit-icon"
import { useDebounce } from "../../../hooks/use-debounce"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import Medusa from "../../../services/api"
import Spinner from "../../atoms/spinner"
import Table, { TablePagination } from "../../molecules/table"
import useCollectionActions from "./use-collection-actions"
import useCollectionTableColumn from "./use-collection-column"

const DEFAULT_PAGE_SIZE = 15

type CollectionTableProps = {
  parentId?: string
  // key?: number
  // onDelete?: (id: string) => void
  // clickCollection?: any
  // onRowClick?: (collection) => void
}

const CollectionsTable: React.FC<CollectionTableProps> = ({
  parentId = "0",
  // key,
  // onDelete,
  // clickCollection,
  // onRowClick,
}) => {
  const [offset, setOffset] = useState(0)
  const limit = DEFAULT_PAGE_SIZE

  const [query, setQuery] = useState("")
  const [numPages, setNumPages] = useState(0)

  const debouncedSearchTerm = useDebounce(query, 500)
  const {
    collections,
    isLoading,
    isRefetching,
    count,
    refetch,
  } = useAdminCollections({
    q: debouncedSearchTerm,
    offset: offset,
    limit,
    parent_id: parentId,
  })

  // useEffect(() => {
  //   refetch()
  // }, [key])

  useEffect(() => {
    if (typeof count !== "undefined") {
      const controlledPageCount = Math.ceil(count / limit)
      setNumPages(controlledPageCount)
    }
  }, [count])

  const [columns] = useCollectionTableColumn(parentId === "0")

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: collections || [],
      manualPagination: true,
      initialState: {
        pageIndex: Math.floor(offset / limit),
        pageSize: limit,
      },
      pageCount: numPages,
      autoResetPage: false,
    },
    usePagination
  )

  const handleNext = () => {
    if (canNextPage) {
      setOffset(offset + limit)
      nextPage()
    }
  }

  const handleSearch = (q) => {
    setOffset(0)
    setQuery(q)
  }

  const handlePrev = () => {
    if (canPreviousPage) {
      setOffset(offset - limit)
      previousPage()
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <Table
        enableSearch
        handleSearch={handleSearch}
        searchPlaceholder="搜索分类"
        {...getTableProps()}
      >
        {/* filteringOptions={filteringOptions} */}
        <Table.Head>
          {headerGroups?.map((headerGroup) => (
            <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Table.HeadCell
                  className="min-w-[100px]"
                  {...col.getHeaderProps()}
                >
                  {col.render("Header")}
                </Table.HeadCell>
              ))}
            </Table.HeadRow>
          ))}
        </Table.Head>
        {isLoading || isRefetching || !collections ? (
          <div className="w-full pt-2xlarge flex items-center justify-center">
            <Spinner size={"large"} variant={"secondary"} />
          </div>
        ) : (
          <Table.Body {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <CollectionRow row={row} refetch={refetch} />
                // parentId={parentId}
                // onDelete={onDelete}
                // clickCollection={clickCollection}
                // onRowClick={onRowClick}
              )
            })}
          </Table.Body>
        )}
      </Table>
      <TablePagination
        count={count!}
        limit={limit}
        offset={offset}
        pageSize={offset + rows.length}
        title="分类"
        currentPage={pageIndex + 1}
        pageCount={pageCount}
        nextPage={handleNext}
        prevPage={handlePrev}
        hasNext={canNextPage}
        hasPrev={canPreviousPage}
      />
    </div>
  )
}

const CollectionRow = ({
  row,
  // parentId,
  // onDelete,
  // onRowClick,
  refetch,
  // clickCollection,
}) => {
  const collection = row.original

  // let props: any = {
  //   className: `cursor-pointer hover:bg-grey-5 ${
  //     clickCollection?.id === collection.id
  //       ? "bg-violet-60 text-white hover:bg-violet-60"
  //       : ""
  //   }`,
  //   onClick: () => navigate(`/a/collections/${collection.id}`),
  //   // onRowClick(collection),
  //   actions: [
  //     {
  //       label: "修改分类",
  //       onClick: () => navigate(`/a/collections/${collection.id}`),
  //       icon: <EditIcon className="text-grey-40" size={20} />,
  //     },
  //     {
  //       label: "删除",
  //       variant: "danger",
  //       onClick: () => ,
  //       icon: <TrashIcon className="text-grey-40" size={20} />,
  //     },
  //   ],
  // }

  // if (parentId === "0") {
  const { getActions } = useCollectionActions(collection, refetch)
  //   props = {
  //     actions: getActions(collection),
  //     linkTo: `/a/collections/${collection.id}`,
  //   }
  // }

  // const dialog = useImperativeDialog()
  // const deleteCollection = useAdminDeleteCollection(collection?.id)

  // const handleDelete = async () => {
  //   const shouldDelete = await dialog({
  //     heading: "删除分类",
  //     text: "确定要删除此分类吗？",
  //   })

  //   if (shouldDelete) {
  //     Medusa.collections
  //       .removeCollection(collection?.id, collection?.id)
  //       .then(refetch)
  //     // deleteCollection.mutate()
  //   }
  // }

  return (
    <Table.Row
      color={"inherit"}
      linkTo={`/a/collections/${collection.id}`}
      actions={getActions(collection)}
      {...row.getRowProps()}
    >
      {" "}
      {row.cells.map((cell, index) => {
        return (
          <Table.Cell {...cell.getCellProps()}>
            {" "}
            {cell.render("Cell", { index })}{" "}
          </Table.Cell>
        )
      })}{" "}
    </Table.Row>
  )
}
export default CollectionsTable
