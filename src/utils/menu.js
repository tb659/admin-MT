const menuList = [
  {
    path: '/homePage',
    filePath: 'homePage',
    title: '首页',
    id: '0',
    meta: { requireAuth: true },
    icon: require('../assets/images/icon-nav/home.png')
  },
  {
    path: '/dataFill',
    filePath: 'dataFill',
    title: '数据填报',
    id: '1',
    meta: { requireAuth: true },
    icon: require('../assets/images/icon-nav/info.png'),
    list: [
      {
        path: '/general',
        filePath: 'dataFill/general',
        title: '办公厅',
        id: '10',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/statutory',
        filePath: 'dataFill/statutory',
        title: '法规局',
        id: '11',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/planDevelop',
        filePath: 'dataFill/planDevelop',
        title: '规划发展局',
        id: '12',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/moneyTubeRun',
        filePath: 'dataFill/moneyTubeRun',
        title: '财管运行局',
        id: '13',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/propertyRight',
        filePath: 'dataFill/propertyRight',
        title: '产权局',
        id: '14',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/innovate',
        filePath: 'dataFill/innovate',
        title: '改革局',
        id: '15',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/assessAllot',
        filePath: 'dataFill/assessAllot',
        title: '考核分配局',
        id: '16',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/capital',
        filePath: 'dataFill/capital',
        title: '资本局',
        id: '17',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/superviseClaim',
        filePath: 'dataFill/superviseClaim',
        title: '监督追责局',
        id: '18',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/companiesDo',
        filePath: 'dataFill/companiesDo',
        title: '企干一局',
        id: '19',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/reformDo',
        filePath: 'dataFill/reformDo',
        title: '改革办',
        id: '110',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      },
      {
        path: '/about',
        filePath: 'dataFill/about',
        title: '有关厅局',
        id: '111',
        parentId: '1',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      }
    ]
  },
  {
    path: '/systemSettings',
    filePath: 'systemSettings',
    title: '系统设置',
    id: '2',
    meta: { requireAuth: true },
    icon: require('../assets/images/icon-nav/info.png'),
    list: [
      {
        path: '/functionManage',
        filePath: 'systemSettings/functionManage',
        title: '职能管理',
        id: '20',
        parentId: '2',
        meta: { requireAuth: true },
        icon: require('../assets/images/icon-nav/info.png')
      }
    ]
  }
]

export default menuList
