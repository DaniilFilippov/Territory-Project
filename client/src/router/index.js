import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyRegister from '@/components/MyRegister'
import GlobalMap from '@/components/GlobalMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'MyRegister',
      component: MyRegister
    },
    {
      path: '/map',
      name: 'Map',
      component: GlobalMap
    }
  ]
})
