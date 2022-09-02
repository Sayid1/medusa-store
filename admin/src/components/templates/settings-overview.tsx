import React from "react"
import PageDescription from "../atoms/page-description"

const SettingsOverview: React.FC = ({ children }) => {
  return (
    <div>
      <PageDescription title={"设置"} subtitle={"管理商店的设置"} />
      <div className="grid medium:grid-cols-2 auto-cols-fr grid-cols-1 gap-x-base gap-y-xsmall">
        {children}
      </div>
    </div>
  )
}

export default SettingsOverview
