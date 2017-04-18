// 配置路由
export default [{
  path: '/',
  component: require('../pages/index.vue')
}, {
  path: '/children',
  component: require('../pages/children.vue'),
  children: [{
    path: '/',
    component: require('../pages/children/index.vue')
  }, {
    path: 'test',
    component: require('../pages/children/test.vue')
  }, ],
}, {
  path:'/time',
  component: require('../pages/time.vue')
}]
