import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OwnerRegister from '@/components/OwnerRegister'
import VisitorRegister from '@/components/VisitorRegister'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/visitor_register',
      name: 'visitor_register',
      component: VisitorRegister
    },
    {
      path: '/owner_register',
      name: 'owner_register',
      component: OwnerRegister
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
