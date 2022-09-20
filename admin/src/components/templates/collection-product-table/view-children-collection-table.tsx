import React, { useEffect, useState } from "react"
import { useDebounce } from "../../../hooks/use-debounce"
import Medusa from "../../../services/api"

type ViewChildrenCollectionTableProps = {
  collectionId: string
  refetchCollection: () => void
}

const ViewChildrenCollectionTable: React.FC<ViewChildrenCollectionTableProps> = ({
  collectionId,
}) => {
  const limit = 10
  const [query, setQuery] = useState("")
  const [offset, setOffset] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const debouncedSearchTerm = useDebounce(query, 500)

  useEffect(() => {
    Medusa.collections.list({
      q: debouncedSearchTerm,
      offset: offset,
      limit,
      parent_id: collectionId,
    })
  })

  return <div></div>
}

export default ViewChildrenCollectionTable
