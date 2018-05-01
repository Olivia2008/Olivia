import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Rating from 'components/rating/rating'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/rating',
      name: 'rating',
      component: Rating
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }

  ]
})
