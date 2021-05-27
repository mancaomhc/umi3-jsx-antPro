import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from './PageHeader'
import styles from './index.less'

const PageHeaderWrapper = ({ children, wrapperClassName, showFooter, ...props }) => (
  <>
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
      <PageHeader {...props} />
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  </>
)

PageHeaderWrapper.defaultProps = {
  wrapperClassName: null,
  buttonList: null,
  showFooter: true,
}

PageHeaderWrapper.propTypes = {
  wrapperClassName: PropTypes.string, // 外层class
  buttonList: PropTypes.array, // 按钮列表
  showFooter: PropTypes.bool, // 显示底部组件
}

export default PageHeaderWrapper
