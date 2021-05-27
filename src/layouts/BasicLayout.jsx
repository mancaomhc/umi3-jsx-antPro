import React, { useState } from 'react'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Breadcrumb } from 'antd';
import GlobalHeader from '@/components/GlobalHeader'
import GlobalSider from '@/components/GlobalSider'
import GlobalBread from '@/components/GlobalBread'
import MenuContext from './MenuContext'
import styles from './BasicLayout.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const BasicLayout = props => {
  const {
    dispatch,
    children,
    location = {
      pathname: '/',
    },
    global,
    userData,
  } = props


  const data = [
    { name: '查看数据', path: '/viewData', icon: <UserOutlined></UserOutlined>},
    { name: '汇报设置', path: '/reportSetting', icon: <DesktopOutlined></DesktopOutlined> },
    { name: '账号管理', path: '/accountManage', icon: <PieChartOutlined></PieChartOutlined> },
    { name: '扫码登录', path: '/scanLogin', icon: <FileOutlined></FileOutlined>},
    { name: '评分进度', path: '/scoreProgress', icon: <TeamOutlined></TeamOutlined>},
  ]

  return (
    <Layout className={ styles.layout }>
      <GlobalSider menuData={data} current={location.pathname} />
      <Layout className={styles.siteLayout}>
        <GlobalHeader userData={userData} {...props} />
        <Content className={styles.content}>
          {/* <GlobalBread></GlobalBread> */}
            <MenuContext.Provider
              value={{ routes: props.route.routes, currentPath: location.pathname }}
          >
             <div className={styles.siteLayoutBackground } style={{ padding: 24, minHeight: 360 }}>
               {children}
            </div>
            </MenuContext.Provider>
          </Content>
        </Layout>
      </Layout>
  )
}

export default BasicLayout;
