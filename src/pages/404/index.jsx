import React from 'react';
import styles from './index.less';

export default  ()=> {
  return (
    <div className={styles.container}>
      <div className={styles.tip}>
        <div className={styles.title}>404</div>
        <div className={styles.message}>如果您通过浏览器访问本系统，请尝试使用钉钉微应用进行访问</div>
      </div>
    </div>
  );
}
