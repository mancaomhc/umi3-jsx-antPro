import React from 'react'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './index.less'

const AccountManage = ({ userData }) => (
  <PageHeaderWrapper>
    账号管理界面
  </PageHeaderWrapper>
)

export default AccountManage;
