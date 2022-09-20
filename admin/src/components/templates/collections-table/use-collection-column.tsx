import moment from "moment"
import React, { useMemo } from "react"
import Tooltip from "../../atoms/tooltip"

const useCollectionTableColumn = (flag: boolean) => {
  const columns = [
    {
      Header: "名称",
      accessor: "title",
      Cell: ({ row: { original } }) => {
        return <div className="flex items-center">{original.title}</div>
      },
    },
    {
      Header: "唯一标识",
      accessor: "handle",
      Cell: ({ cell: { value } }) => <div>/{value}</div>,
    },
  ]
  if (flag) {
    columns.push(
      {
        Header: "创建时间",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      },
      {
        Header: "修改时间",
        accessor: "updated_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      }
    )
  }
  return [useMemo(() => columns, [])]
}

export default useCollectionTableColumn
