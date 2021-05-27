import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'umi'
import { Breadcrumb, Button } from 'antd'
import MenuContext from '@/layouts/MenuContext'
import styles from './PageHeader.less'

const HomeCrumb = {
  name: '东阳晒拼创评分应用',
  path: '/reportSetting',
  hasComponent: true,
}

const getBreadcrumbList = (routes, currentPath) => {
  const result = []

  // 递归父节点放入数据
  function loopAndUnshiftParent(route) {
    result.unshift({
      name: route.name,
      path: route.path,
      hasComponent: !!route.component,
    })
    if (route.parent) {
      loopAndUnshiftParent(route.parent)
    }
  }

  // 路由比较
  const compareRoute = (routeA, routeB) => {
    if (routeA === routeB) {
      return true
    }
    // 需要处理一种情况。 /sales/detail/:id 和 /sales/detail/123123 的匹配
    if (routeA?.includes('/:')) {
      // 分割 / 匹配每一个元素，遇到 :id 为 匹配成功
      const AArr = routeA.split('/')
      const BArr = routeB.split('/')
      let isMatch = true

      for (let index = 0; index < AArr.length; index++) {
        const aItem = AArr[index]
        const bItem = BArr[index]

        if (aItem !== bItem && !aItem.startsWith(':')) {
          isMatch = false
        }
      }
      if (isMatch) {
        return true
      }
    }
    return false
  }

  // 给路由添加父级。以便与匹配到数据后获取
  function loopRoute(routeData, parent) {
    routeData.forEach(route => {
      route.parent = parent
      // 匹配相同的路由。
      if (compareRoute(route.path, currentPath)) {
        loopAndUnshiftParent(route)
        return
      }
      // 继续兆下一级
      if (route.routes && route.routes.length > 0) {
        loopRoute(route.routes, route)
      }
    })
  }

  loopRoute(routes, null)

  result.unshift(HomeCrumb)

  if (result.length > 0) {
    result[result.length - 1].hasComponent = false
  }

  return result
}

const PageHeader = ({ buttonList, renderTitleRight, title }) => (
  <MenuContext.Consumer>
    {({ routes, currentPath }) => {
      const breadCrumbList = getBreadcrumbList(routes, currentPath)
      const currentCrumb = breadCrumbList[breadCrumbList.length - 1]

      return (
        <div className={styles.container}>
          <Breadcrumb className={styles.breadCrumb}>
            {breadCrumbList.map(item => (
              <Breadcrumb.Item key={item.path}>
                {item.hasComponent ? <Link to={item.path}>{item.name}</Link> : item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className={styles.head}>
            <div className={styles.title}>{title || currentCrumb.name}</div>
            {renderTitleRight}
            {buttonList && (
              <div className={styles.buttonList}>
                {buttonList.map((button, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={{ marginLeft: '11px' }}
                    {...button}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }}
  </MenuContext.Consumer>
)

PageHeader.defaultProps = {
  renderTitleRight: null,
  title: null,
}

PageHeader.propTypes = {
  renderTitleRight: PropTypes.node, // title 右侧内容自定义渲染
  title: PropTypes.node, // title
}

export default memo(PageHeader)
