import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OwnerRegister from '@/components/OwnerRegister'
import VisitorRegister from '@/components/VisitorRegister'
import Login from '@/components/Login'

import AdminOverview from '@/components/AdminOverview'

import OwnerOverview from '@/components/overview/OwnerOverview'
import OwnerPropertyDetail from '@/components/property/OwnerPropertyDetail'
import OwnerManageProperty from '@/components/property/OwnerManageProperty'
import OwnerOthersOverview from '@/components/overview/OwnerOthersOverview'
import OwnerOthersPropertyDetail from '@/components/property/OwnerOthersPropertyDetail'
import OwnerAddProperty from '@/components/property/OwnerAddProperty'

import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/owner_register',
      name: 'owner_register',
      component: OwnerRegister
    },
    {
      path: '/visitor_register',
      name: 'visitor_register',
      component: VisitorRegister
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/adminoverview',
      name: 'adminoverview',
      component: AdminOverview
    },
    {
      path: '/owner_overview',
      name: 'owner_overview',
      component: OwnerOverview
    },
    {
      path: '/owner_property_detail/:id',
      name: 'owner_property_detail',
      component: OwnerPropertyDetail
    },
    {
      path: '/owner_manage_property/:id',
      name: 'owner_manage_property',
      component: OwnerManageProperty
    },
    {
      path: '/owner_others_overview',
      name: 'owner_others_overview',
      component: OwnerOthersOverview
    },
    {
      path: '/owner_others_property_detail',
      name: 'owner_others_property_detail',
      component: OwnerOthersPropertyDetail
    },
    {
      path: '/owner_add_property',
      name: 'owner_add_property',
      component: OwnerAddProperty
    }
  ]
})
