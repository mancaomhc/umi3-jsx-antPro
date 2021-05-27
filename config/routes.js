export default [{
  path: '/',
  history: 'hash',
  //component: '../layouts/BlankLayout',
  routes: [

      { path: '/401', component: '../pages/403' },
      { path: '/403', component: '../pages/403' },
      { path: '/404', component: '../pages/404' },
       {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
          },
      {
          path: '/',
         // component: '../layouts/SecurityLayout',
          routes: [{
                  path: '/',
                  component: '../layouts/BasicLayout',
                  // authority: ['admin', 'user'],
                  routes: [
                      {
                          path: '/',
                          redirect: '/index',
                    },
                    {
                          path: '/viewData',
                          name: '查看数据',
                          icon: 'smile',
                          component: './ViewData',
                    },
                    {
                          path: '/accountManage',
                          name: '账号管理',
                          icon: 'smile',
                          component: './AccountManage',
                    },
                    {
                          path: '/reportSetting',
                          name: '汇报设置',
                          icon: 'smile',
                          component: './ReportSetting',
                    },
                    {
                          path: '/scanLogin',
                          name: '扫码登录',
                          icon: 'smile',
                          component: './ScanLogin',
                    },
                    {
                          path: '/scoreProgress',
                          name: '评分进度',
                          icon: 'smile',
                          component: './ScoreProgress',
                    },
                  ],
              },
          ].filter(route => !!route),
      },
  ],
}
];
