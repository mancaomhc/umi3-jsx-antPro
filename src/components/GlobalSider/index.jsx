import React, { memo, useState, useEffect } from 'react'
import { Link } from 'umi'

import { Layout, Menu, Icon } from 'antd'
// import SiderIcon from './SiderIcon'
import { GitlabOutlined } from '@ant-design/icons';

import styles from './index.less'

const { Sider } = Layout

// const renderMenuIcon = icon => {
//   if (!icon) {
//     return null
//   }
//   // if (icon && icon.startsWith('i-')) {
//   //   return <SiderIcon type={icon} />
//   // }
//   return <Icon type={icon} />
// }

const MenuItem = ({ icon, name }) => (
  <span className={styles.menuItem}>
    {/* {renderMenuIcon(icon)} */}
    {/* <MailOutlined></MailOutlined> */}
    {icon}
    <span>{name}</span>
  </span>
)




// 菜单
const renderMenu = menuData =>
  menuData.map((item, i) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.path} key={i } title={<MenuItem icon={item.icon} name={item.name} />}>
          {renderMenu(item.children)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          <MenuItem icon={item.icon} name={item.name} />
        </Link>
      </Menu.Item>
    )
  })

const GlobalSider = ({ menuData, current }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  };
  const [defaultOpenKey] = menuData
    .filter(item => current.includes(item.path))
    .map(item => item.path)
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {
    setOpenKeys([defaultOpenKey, ...openKeys])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpenKey])

  const handleChangeOpenMenu = data => {
    if (data[data.length - 1]) {
      setOpenKeys([data[data.length - 1]])
      return
    }
    setOpenKeys([])
  }
  return (
    <Sider width={256} className={styles.sider} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className={styles.logo}><GitlabOutlined />东阳晒拼创评分应用 </div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[current]}
        onOpenChange={handleChangeOpenMenu}
        style={{ height: '100%', borderRight: 0 }}
      >
        {renderMenu(menuData)}
      </Menu>
    </Sider>
  )
}

export default memo(GlobalSider)
