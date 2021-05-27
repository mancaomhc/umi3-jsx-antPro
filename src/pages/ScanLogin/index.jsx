import React from 'react'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './index.less'

const ScanLogin = ({ userData }) => (
  <PageHeaderWrapper>
    扫码登录页面
  </PageHeaderWrapper>
)

export default ScanLogin;
