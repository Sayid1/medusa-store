import { useAdminStore, useAdminUsers } from "medusa-react"
import React, { useState } from "react"
import CashIcon from "../../fundamentals/icons/cash-icon"
import CustomerIcon from "../../fundamentals/icons/customer-icon"
import DollarSignIcon from "../../fundamentals/icons/dollar-sign-icon"
import GearIcon from "../../fundamentals/icons/gear-icon"
import GiftIcon from "../../fundamentals/icons/gift-icon"
import SaleIcon from "../../fundamentals/icons/sale-icon"
import TagIcon from "../../fundamentals/icons/tag-icon"
import SidebarCompanyLogo from "../../molecules/sidebar-company-logo"
import SidebarMenuItem from "../../molecules/sidebar-menu-item"
import SidebarTeam from "../sidebar-team"

const ICON_SIZE = 18

const Sidebar: React.FC = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState(-1)

  const { store } = useAdminStore()

  const triggerHandler = () => {
    const id = triggerHandler.id++
    return {
      open: currentlyOpen === id,
      handleTriggerClick: () => setCurrentlyOpen(id),
    }
  }
  // We store the `id` counter on the function object, as a state creates
  // infinite updates, and we do not want the variable to be free floating.
  triggerHandler.id = 0

  return (
    <div className="min-w-sidebar max-w-sidebar h-screen overflow-y-auto bg-gray-0 border-r border-grey-20 py-base px-base">
      <div className="h-full ">
        <SidebarCompanyLogo storeName={store?.name} />

        <div className="border-b pb-3.5 border-grey-20">
          <SidebarMenuItem
            pageLink={"/a/orders"}
            icon={<DollarSignIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"订单"}
          />
          <SidebarMenuItem
            pageLink={"/a/products"}
            icon={<TagIcon size={ICON_SIZE} />}
            text={"产品"}
            triggerHandler={triggerHandler}
          />
          <SidebarMenuItem
            pageLink={"/a/customers"}
            icon={<CustomerIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"顾客"}
          />
          <SidebarMenuItem
            pageLink={"/a/discounts"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"折扣"}
          />
          <SidebarMenuItem
            pageLink={"/a/gift-cards"}
            icon={<GiftIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"礼品卡"}
          />
          <SidebarMenuItem
            pageLink={"/a/pricing"}
            icon={<CashIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"价钱"}
          />
          <SidebarMenuItem
            pageLink={"/a/settings"}
            icon={<GearIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"设置"}
          />
        </div>

        <div className="font-semibold mt-5 flex flex-col text-small">
          <SidebarTeam />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
