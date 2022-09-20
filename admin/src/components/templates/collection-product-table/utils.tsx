import React from "react"
import StatusIndicator from "../../fundamentals/status-indicator"

export type SimpleProductType = {
  id: string
  thumbnail?: string
  title: string
  status: string
  created_at: Date
}

export const decideStatus = (status: string) => {
  switch (status) {
    case "published":
      return <StatusIndicator title="已发布" variant="success" />
    case "draft":
      return <StatusIndicator title="草稿" variant="default" />
    case "proposed":
      return <StatusIndicator title="建议修改" variant="warning" />
    case "rejected":
      return <StatusIndicator title="被拒绝" variant="danger" />
    default:
      return null
  }
}
