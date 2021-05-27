import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';

/**
 * 500 页面
 */
export default () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="服务器异常"
      extra={<Button type="primary" onClick={() => history.push('/') }>返回首页</Button>}
    />
  )
};
