import { Router } from "@reach/router"
import React from "react"
import SettingsCard from "../../components/atoms/settings-card"
import CoinsIcon from "../../components/fundamentals/icons/coins-icon"
import CrosshairIcon from "../../components/fundamentals/icons/crosshair-icon"
import DollarSignIcon from "../../components/fundamentals/icons/dollar-sign-icon"
import HappyIcon from "../../components/fundamentals/icons/happy-icon"
import MailIcon from "../../components/fundamentals/icons/mail-icon"
import MapPinIcon from "../../components/fundamentals/icons/map-pin-icon"
import TaxesIcon from "../../components/fundamentals/icons/taxes-icon"
import TruckIcon from "../../components/fundamentals/icons/truck-icon"
import UsersIcon from "../../components/fundamentals/icons/users-icon"
import ChannelsIcon from "../../components/fundamentals/icons/channels-icon"
import SettingsOverview from "../../components/templates/settings-overview"
import Currencies from "./currencies"
import Details from "./details"
import PersonalInformation from "./personal-information"
import Regions from "./regions"
import RegionDetails from "./regions/details"
import NewRegion from "./regions/new"
import ReturnReasons from "./return-reasons"
import Taxes from "./taxes"
import Users from "./users"
import FeatureToggle from "../../components/fundamentals/feature-toggle"

const SettingsIndex = () => {
  return (
    <SettingsOverview>
      <SettingsCard
        heading={"地区"}
        description={"管理您将在其中运营的市场"}
        icon={<MapPinIcon />}
        to={`/a/settings/regions`}
      />
      <SettingsCard
        heading={"货币"}
        description={"管理您将在其中运营的市场"}
        icon={<CoinsIcon />}
        to={`/a/settings/currencies`}
      />
      <SettingsCard
        heading={"店铺详情"}
        description={"管理您的业务详细信息"}
        icon={<CrosshairIcon />}
        to={`/a/settings/details`}
      />
      <SettingsCard
        heading={"运输"}
        description={"管理运输资料"}
        icon={<TruckIcon />}
        to={`/a/settings/shipping-profiles`}
        disabled={true}
      />
      <SettingsCard
        heading={"退货原因"}
        description={"管理订单设置"}
        icon={<DollarSignIcon />}
        to={`/a/settings/return-reasons`}
      />
      <SettingsCard
        heading={"团队"}
        description={"管理商店的用户"}
        icon={<UsersIcon />}
        to={`/a/settings/team`}
      />
      <SettingsCard
        heading={"个人信息"}
        description={"管理您的商店档案"}
        icon={<HappyIcon />}
        to={`/a/settings/personal-information`}
      />
      <SettingsCard
        heading={"hello@medusajs.com"}
        description={"找不到您正在寻找的答案？"}
        icon={<MailIcon />}
        externalLink={"mailto: hello@medusajs.com"}
      />
      <SettingsCard
        heading={"税收设置"}
        description={"跨地区和跨产品管理税收"}
        icon={<TaxesIcon />}
        to={`/a/settings/taxes`}
      />
      <FeatureToggle featureFlag="sales_channels">
        <SettingsCard
          heading={"销售渠道"}
          description={"控制哪些产品在哪些渠道可用"}
          icon={<ChannelsIcon />}
          to={`/a/sales-channels`}
        />
      </FeatureToggle>
    </SettingsOverview>
  )
}

const Settings = () => (
  <Router className="h-full">
    <SettingsIndex path="/" />

    <Details path="details" />

    <Currencies path="currencies" />

    <ReturnReasons path="return-reasons" />

    <Regions path="regions" />
    <RegionDetails path="regions/:id" />
    <NewRegion path="regions/new" />

    <Taxes path="taxes" />

    <Users path="team" />

    <PersonalInformation path="personal-information" />
  </Router>
)

export default Settings
