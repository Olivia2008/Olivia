<template>
  <div class="goods">
    <!--左侧菜单-->
    <div class="menu-wrapper"
         ref="menuWrapper">
      <ul>
        <li class="menu-item"
            v-for="(item, index) in goods"
            :key="index"
            :class="{'current': currentIndex === index}"
            @click="menuSelect(index, $event)">
          <span class="text border-1px">
              <span v-show="item.type > 0"
                    class="icon"
                    :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!--右侧菜品-->
    <div class="foods-wrapper"
            ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook"
            v-for="(item, index) in goods"
            :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px"
                v-for="(food, index) in item.foods"
                :key="index"
                @click="selectFood(food, $event)">
              <div class="icon">
                <img v-lazy="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">{{food.price|currency('￥')}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice|currency('￥')}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--底部购物车-->
    <shop-cart :delivery-price="seller.deliveryPrice"
               :min-price="seller.minPrice"
               :select-foods="selectFoods"
               ref="shopCart"></shop-cart>
    <!--商品详情页-->
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*用于1像素border*/
  @import "~common/stylus/mixin"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      width: 80px
      flex: 0 0 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-1px-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
        border-left: 2px solid #d9dde1
      .food-item
        display: flex
        margin: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        padding-bottom: 18px /*与border-1px的下距离*/
        &:last-child
          border-1px-none() //最后子元素没有下划线
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0px
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .new
              margin-right: 8px
              color: rgb(240, 20, 20)
              font-size: 14px
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartControl-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

<script type="text/ecmascript-6">
  import {currency} from 'common/js/currency'
  import BScroll from 'better-scroll'
  import ShopCart from 'components/shopCart/shopCart'
  import CartControl from 'base/cartControl/cartControl'
//  import DiscountThree from 'base/discount/discountThree'
//  import Scroll from 'base/scroll/scroll'
  import Food from 'components/food/food'
  import newVue from 'common/js/newVue'

  const ERR_OK = 0
  export default {
    components: {
      ShopCart,
      CartControl,
      Food
    },
    props: {
      seller: {
        type: Object, // 因为scroll组件中定义的data是个Object
        default: () => {}
      }
    },
    filters: {
      currency: currency
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$axios.get('/api/goods').then((response) => {
        response = response.data
       // console.log(response)
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
      // 接收cartControl派发的带参event.target的事件cart.add
      // 体验优化，异步执行下落动画
      newVue.$on('cart.add', (target) => {
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target)
        })
      })
    },
    computed: {
      // 计算出左侧菜单在两个li间对应的index值
      currentIndex () {
        for (var i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          // 当最后一个不存在或在第一个和第二个li之间时
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 监测实时滚动的位置
        })

        this.foodScroll.on('scroll', (pos) => {
          // 拿到实时的y坐标
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 获取右侧菜谱的高度
      _calculateHeight () {
        // 获取到food-list元素
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        // 设置右侧菜品的初始高度height
        let height = 0
        // 将每一个foodList的高度push到整个右侧菜品listHeight中
        this.listHeight.push(height)
        // 将每一个foodList加等
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          // 加等每一个foodList的可视高度
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 左侧菜单 点击事件
      menuSelect (index, event) {
        // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
        if (!event._constructed) { return index }
        // console.log(index)
        // 获取食物的li Dom节点列表
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        // 调用better-scroll 方法滚动到响应位置
        this.foodScroll.scrollToElement(el, 300)
      },
      // 点击每一个商品赋值到food组件中
      selectFood (food, event) {
        if (!event._constructed) { return food }
        this.selectedFood = food
        this.$refs.food.show()
      }
    }
  }
</script>
