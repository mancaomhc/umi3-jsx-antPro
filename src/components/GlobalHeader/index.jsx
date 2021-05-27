import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Icon, Spin } from 'antd'
import HeaderLogo from '@/components/HeaderLogo'
import styles from './index.less'

const { Header } = Layout

const GlobalHeader = ({ dispatch, hideUser, title, userData }) => {
  const onMenuClick = event => {
    const { key } = event

    // if (key === 'logout') {
    //   dispatch({
    //     type: 'user/logout',
    //   })
    // }
  }

  const renderUser = () => {
    if (hideUser) {
      return null
    }
    return (
      <div className={styles.user}>
        {'yyy' ? (
          <Dropdown
            overlay={
              <Menu onClick={onMenuClick}>
                <Menu.Item key="logout">
                  <Icon type="logout" />
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <span>
              {'yyy'} <Icon type="down" />
            </span>
          </Dropdown>
        ) : (
          <Spin />
        )}
      </div>
    )
  }

  return (
    <Header className={styles.header}>
      <HeaderLogo title={title} />
      {renderUser()}
    </Header>
  )
}

GlobalHeader.defaultProps = {
  hideUser: false,
}
GlobalHeader.propTypes = {
  hideUser: PropTypes.bool,
}

export default memo(GlobalHeader)
