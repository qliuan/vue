import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OwnerRegister from '@/components/OwnerRegister'
import VisitorRegister from '@/components/VisitorRegister'
import Login from '@/components/Login'
import OwnerOverview from '@/components/overview/OwnerOverview'
import OwnerPropertyDetail from '@/components/property_detail/OwnerPropertyDetail'

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
      path: '/owner_overview',
      name: 'owner_overview',
      component: OwnerOverview
    },
    {
      path: '/owner_property_detail',
      name: 'owner_property_detail',
      component: OwnerPropertyDetail
    }
  ]
})
