import React from 'react'
import { Icon } from 'antd'
import IHome from '@/assets/i-home.svg'
import ICarSource from '@/assets/i-car-source.svg'
import IPricing from '@/assets/i-pricing.svg'
import IWarehouse from '@/assets/i-warehouse.svg'
import IAuthority from '@/assets/i-authority.svg'
import ISales from '@/assets/i-sales.svg'
import IFinancial from '@/assets/i-financial.svg'
import IContract from '@/assets/i-contract.svg'
import IReport from '@/assets/i-report.svg'

const IconMap = {
  'i-home': IHome,
  'i-car-source': ICarSource,
  'i-pricing': IPricing,
  'i-warehouse': IWarehouse,
  'i-authority': IAuthority,
  'i-sales': ISales,
  'i-financial': IFinancial,
  'i-contract': IContract,
  'i-report': IReport,
}

const SiderIcon = ({ type }) => {
  if (IconMap[type]) {
    return <Icon component={IconMap[type]} />
  }
  return null
}

export default SiderIcon
