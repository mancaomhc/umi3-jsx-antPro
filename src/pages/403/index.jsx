import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';

/**
 * 403 页面
 */
export default (props) => {
  const { location } = props
  const stateCode = location.pathname.slice(1)
  return (
    <Result
      status="403"
      title={stateCode}
      subTitle="对不起，您没有足够的权限访问页面"
      extra={<Button type="primary" onClick={() => history.push('/')}>返回首页</Button>}
    />
  )
};
