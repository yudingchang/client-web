import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/controlboard/controlboardIndex'),
        name: 'controlboardIndex',
        meta: { title: 'Dashboard', icon: 'Group', noCache: true }
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/controlboard/index'),
        meta: { title: 'New booking', noCache: true },
        hidden: true
      },
      {
        path: 'checkoutSuccess',
        name: 'checkoutSuccess',
        component: () => import('@/views/controlboard/checkoutSuccess'),
        meta: { title: 'New booking' },
        hidden: true
      },
      {
        path: 'inspectionAgreement',
        name: 'inspectionAgreement',
        component: () => import('@/views/controlboard/inspectionAgreement'),
        meta: {
          title: '验货协议'
        },
        hidden: true
      }
    ]
  }

  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // 订单管理
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/examineGood',
    alwaysShow: true,
    name: 'orderManagement',
    meta: {
      title: 'Bookings',
      icon: 'Icon 4 Copy 2'
    },
    children: [
      {
        path: 'examineGood',
        component: () => import('@/views/orderManagement/examineGood'),
        name: 'examineGood',
        meta: { title: 'Inspection bookings' }
      },
      {
        path: 'pay',
        hidden: true,
        name: 'pay',
        component: () => import('@/views/orderManagement/pay'),
        meta: { title: 'payment' }
      },
      {
        path: 'orderDetails',
        hidden: true,
        name: 'orderDetails',
        component: () => import('@/views/orderManagement/orderDetails'),
        meta: { title: 'Order details' }
      },
      {
        path: 'orderRefundDetail',
        hidden: true,
        name: 'orderRefundDetail',
        component: () => import('@/views/orderManagement/orderRefundDetail'),
        meta: { title: '退单详情' }
      }
    ]
  },

  // 报告管理
  {
    path: '/reportManagement',
    component: Layout,
    redirect: '/reportManagement/ReportManagement',
    name: 'reportManagement',
    meta: {
      // title: '报告管理',
      icon: 'Report'
    },
    children: [
      {
        path: 'ReportManagement',
        component: () => import('@/views/reportManagement/ReportManagement'),
        name: 'ReportManagement',
        meta: { title: 'Reports' }
        // hidden: true
      },
      {
        path: 'inspectionReport',
        component: () => import('@/views/reportManagement/inspectionReport'),
        name: 'inspectionReport',
        meta: { title: '网页报告' },
        hidden: true
      }
    ]
  },

  // 资金管理
  {
    path: '/fundManagement',
    component: Layout,
    redirect: '/fundManagement/wallet/walletAccount',
    name: 'fundManagement',
    meta: {
      title: 'Payment',
      icon: 'Group 2'
    },
    children: [
      {
        path: 'wallet',
        component: () => import('@/views/fundManagement/wallet'),
        name: 'wallet',
        redirect: '/fundManagement/wallet/walletAccountIndex',
        meta: { title: 'My Testcoo Pocket' },
        children: [
          {
            path: 'walletAccountIndex',
            component: () => import('@/views/fundManagement/walletAccountMune/walletAccountIndex'),
            name: 'walletAccountIndex',
            // meta: { title: '账户设置' },
            hidden: true
          },
          {
            path: 'walletRechargeDollar',
            component: () => import('@/views/fundManagement/walletAccountMune/walletRechargeDollar'),
            name: 'walletRechargeDollar',
            // meta: { title: '账户设置' },
            hidden: true
          },
          {
            path: 'walletRechargeRmb',
            component: () => import('@/views/fundManagement/walletAccountMune/walletRechargeRmb'),
            name: 'walletRechargeRmb',
            hidden: true
          },
          {
            path: 'walletDetail',
            component: () => import('@/views/fundManagement/walletAccountMune/walletDetail'),
            name: 'walletDetail',
            meta: { title: '钱包详情' },
            hidden: true
          }

        ]
      },
      {
        path: 'monthlyState',
        component: () => import('@/views/fundManagement/monthlyState'),
        name: 'monthlyState',
        redirect: '/fundManagement/monthlyState/monthlyStateIndex',
        meta: { title: 'My Monthly Payment' },
        children: [
          {
            path: 'monthlyStateIndex',
            component: () => import('@/views/fundManagement/monthlyStateMune/monthlyStateIndex'),
            name: 'monthlyStateIndex',
            hidden: true
          },
          {
            path: 'monthlyBillDetail',
            component: () => import('@/views/fundManagement/monthlyStateMune/monthlyBillDetail'),
            name: 'monthlyBillDetail',
            meta: { title: '账单详情' },
            hidden: true
          },
          {
            path: 'monthlypayDetail',
            component: () => import('@/views/fundManagement/monthlyStateMune/monthlypayDetail'),
            name: 'monthlypayDetail',
            meta: { title: '还款' },
            hidden: true
          },
          {
            path: 'monthlyReimbursement',
            component: () => import('@/views/fundManagement/monthlyStateMune/monthlyReimbursement'),
            name: 'monthlyReimbursement',
            // meta: { title: '已还款明细' },
            hidden: true
          },
          {
            path: 'OutstandingAccountDe',
            component: () => import('@/views/fundManagement/monthlyStateMune/OutstandingAccountDe'),
            name: 'OutstandingAccountDe',
            // meta: { title: '未出账明细' },
            hidden: true
          }
          // {
          //   path: 'ReimbursementDetail',
          //   component: () => import('@/views/fundManagement/monthlyStateMune/ReimbursementDetail'),
          //   name: 'ReimbursementDetail',
          //   meta: { title: '' },
          //   hidden: true
          // }
        ]
      }
    ]
  },

  // 账户管理
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/personalInformation',
    name: 'accountManagement',
    meta: {
      title: 'Account',
      icon: '我的'
    },
    children: [
      {
        path: 'personalInfor',
        component: () => import('@/views/accountManagement/personalInfor'),
        name: 'personalInfor',
        redirect: '/accountManagement/personalInfor/personalInformation',
        meta: { title: 'Personal information' },
        children: [
          {
            path: 'personalInformation',
            component: () => import('@/views/accountManagement/personalInforMune/personalInformation'),
            name: 'personalInformation',
            hidden: true
          },
          {
            path: 'personalInforEdit',
            component: () => import('@/views/accountManagement/personalInforMune/personalInforEdit'),
            name: 'personalInforEdit',
            hidden: true
          }
        ]
      },
      {
        path: 'companyInformation',
        component: () => import('@/views/accountManagement/companyInformation'),
        name: 'companyInformation',
        redirect: '/accountManagement/companyInformation/companyInformationIndex',
        meta: { title: 'Company information' },
        children: [
          {
            path: 'companyInformationIndex',
            component: () => import('@/views/accountManagement/companyInformationMune/companyInformationIndex'),
            name: 'companyInformationIndex',
            // meta: { title: '企业信息' },
            hidden: true
          },
          {
            path: 'companyEdit',
            component: () => import('@/views/accountManagement/companyInformationMune/companyEdit'),
            name: 'companyEdit',
            hidden: true
          }
        ]
      },

      {
        path: 'accountSetting',
        component: () => import('@/views/accountManagement/accountSetting'),
        name: 'accountSetting',
        redirect: '/accountManagement/accountSetting/accountSettingIndex',
        meta: { title: 'Contacts & password' },
        children: [
          {
            path: 'accountSettingIndex',
            component: () => import('@/views/accountManagement/accountSettingMune/accountSettingIndex'),
            name: 'accountSettingIndex',
            hidden: true
          },
          {
            path: 'accountResetLoginPassword',
            component: () => import('@/views/accountManagement/accountSettingMune/accountResetLoginPassword'),
            name: 'accountResetLoginPassword',
            meta: { title: 'Login password resetting' },
            hidden: true
          },
          {
            path: 'resetByPassword',
            component: () => import('@/views/accountManagement/accountSettingMune/resetByPassword'),
            name: 'resetByPassword',
            meta: { title: 'Login password resetting' },
            hidden: true
          },
          {
            path: 'resetByEmail',
            component: () => import('@/views/accountManagement/accountSettingMune/resetByEmail'),
            name: 'resetByEmail',
            meta: { title: 'Login password resetting' },
            hidden: true
          },
          {
            path: 'resetByTelephone',
            component: () => import('@/views/accountManagement/accountSettingMune/resetByTelephone'),
            name: 'resetByTelephone',
            meta: { title: 'Login password resetting' },
            hidden: true
          },
          {
            path: 'accountResetPayPassword',
            component: () => import('@/views/accountManagement/accountSettingMune/accountResetPayPassword'),
            name: 'accountResetPayPassword',
            meta: { title: 'Payment password resetting' },
            hidden: true
          },
          {
            path: 'resetPayByPassword',
            component: () => import('@/views/accountManagement/accountSettingMune/resetPayByPassword'),
            name: 'resetPayByPassword',
            meta: { title: 'Payment password resetting' },
            hidden: true
          },
          {
            path: 'resetPayByEmail',
            component: () => import('@/views/accountManagement/accountSettingMune/resetPayByEmail'),
            name: 'resetPayByEmail',
            meta: { title: 'Payment password resetting' },
            hidden: true
          },
          {
            path: 'resetPayByTelephone',
            component: () => import('@/views/accountManagement/accountSettingMune/resetPayByTelephone'),
            name: 'resetPayByTelephone',
            meta: { title: 'Payment password resetting' },
            hidden: true
          }
        ]
      },
      {
        path: 'dataSetting',
        component: () => import('@/views/accountManagement/dataSetting'),
        name: 'dataSetting',
        meta: { title: 'Suppliers & invoiced' }
      }
    ]
  },
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
