/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const _vue = new Vue()

Vue.use(Router)

import Login from '@/pages/login/login'
import IndexPage from '@/pages/index'

let Overview = () => import('@/pages/overview/overview')
let Company = () => import('@/pages/company/company')
let UserManagement = () => import('@/pages/userManagement/userManage')
let Package = () => import('@/pages/package/package')
let CreatePackage = () => import('@/pages/package/create')
let PublicNum = () => import('@/pages/publicNum/public')
let Seat = () => import('@/pages/seat/seat')
let Seatinfo = () => import('@/pages/seat/seatinfo')
let Reg = () => import('@/pages/register/register')
let Customers = () => import('@/pages/systemSetting/customers/cus')
let SaveCustomer = () => import('@/pages/systemSetting/customers/saveCustomer')
let CustomerInfo = () => import('@/pages/systemSetting/customers/customerInfo')
let Menu = () => import('@/pages/systemSetting/menu/menu')
let Role = () => import('@/pages/systemSetting/role/role')
let SetAuth = () => import('@/pages/systemSetting/role/setAuth')
let Authority = () => import('@/pages/systemSetting/authority/auth')
let System = () => import('@/pages/systemSetting/system/sys')
let DataLib = () => import('@/pages/systemSetting/dataLib/datalib')
let DataLibDefine = () => import('@/pages/systemSetting/dataDefine/itemDefine')
let SensitiveWords = () => import('@/pages/systemSetting/sensitiveWord/sensitive')
let Setmeal = () => import('@/pages/systemSetting/setmeal/meal')
let Status = () => import('@/pages/systemSetting/statusSetting/status')
let Service = () => import('@/pages/systemSetting/serviceSetting/service')
let Tjob = () => import('@/pages/systemSetting/tjob/tjob')
let AddJob = () => import('@/pages/systemSetting/tjob/addjob')
let ConfigID = () => import('@/pages/systemSetting/configID/configID')
let AntiCheat = () => import('@/pages/systemSetting/antiCheat/anticheat')
let AppConfig = () => import('@/pages/systemSetting/appConfig/appconfig')
let SysMsg = () => import('@/pages/systemSetting/sysMessage/sysmsg')
let Version = () => import('@/pages/systemSetting/sysVersion/version')

let Upload = () => import('@/components/syscomponents/upload')
let TestTree = () => import('@/components/syscomponents/treeobj.vue')

const router = new Router({
  mode: 'history',
  base: 'omp',
  routes: [
    {path: '/register', name: 'register', component: Reg},
    {path: '/upload', name: 'upload', component: Upload},
    { path: '/testtree', name: 'testtree', component: TestTree },
    {
      path: '/ops', component: IndexPage, meta: { requiresAuth: true },
      children: [
        { path: 'overview', name: 'overview', component: Overview },
        { path: 'company', name: 'company', component: Company },
        { path: 'usermanage', name: 'userManagement', component: UserManagement },
        
        { path: 'public', name: 'public', component: PublicNum },
        { path: 'package', name: 'package', component: Package },
        { path: '/package/new', name: 'createPackage', component: CreatePackage, props: true },
        { path: 'seat', name: 'seat', component: Seat },
        { path: '/seat/info', name: 'seatinfo', component: Seatinfo, props: true }
      ]
    },
    {
      path: '/sys', component: IndexPage, meta: {requiresAuth: true},
      children : [
        { path: 'customers',  name: 'customers', component: Customers},
        { path: 'customers/save', name: 'saveCustomer', component: SaveCustomer, props: true},
        { path: 'customers/info', name: 'customerInfo', component: CustomerInfo, props: true},
        { path: 'menu',  name: 'menu', component: Menu},
        { path: 'role',  name: 'role', component: Role},
        { path: 'role/setauth', name: 'setAuth', component: SetAuth, props: true },
        { path: 'authority',  name: 'authority', component: Authority},
        { path: 'system',  name: 'system', component: System},
        { path: 'dataLib',  name: 'dataLib', component: DataLib},
        { path: 'dataLibDefine', name: 'dataLibDefine', component: DataLibDefine},
        { path: 'sensitive', name: 'sensitive', component: SensitiveWords},
        { path: 'setmeal', name: 'setmeal', component: Setmeal},
        { path: 'status', name: 'status', component: Status },
        { path: 'service', name: 'service', component: Service },
        { path: 'job', name: 'job', component: Tjob },
        { path: 'addjob', name: 'addjob', component: AddJob, props: true},
        { path: 'config', name: 'configID', component: ConfigID },
        { path: 'anticheat', name: 'anticheat', component: AntiCheat},
        { path: 'appconfig', name: 'appconfig', component: AppConfig },
        { path: 'sysmsg', name: 'sysmsg', component: SysMsg },
        { path: 'version', name: 'version', component: Version }
      ]
    },
    { path: '/', name: 'Login', alias: '/login', component: Login }
    // { path: '*', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    _vue.pageauth({ path: to.path }).then(res => {
      // console.log('此页面需要相关认证')
      if (res.valid) {
        store.commit('public/USER_INFO', res.data);
        next()
      } else {
        // console.log('session过期/验证失败, 权限失败')
        store.commit('public/USER_INFO', null);
        next({
          path: '/'
        });
      }
    }).catch(err => {
      next({
        path: '/'
      });
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router;