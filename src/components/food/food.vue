<template>
  <transition name="food">
    <scroll class="foodScroll"
            v-show="showFlag"
            :data="food"
            :probe-type="probeType"
            ref="foodDetail">
      <div class="food-content">
        <div class="image-header">
          <img  :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">{{food.price|currency('￥', 0)}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice|currency('￥', 0)}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <div class="buy"
               v-show="!food.count || food.count===0"
               @click.stop.prevent="addFirst">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :select-type="selectType"
                         :only-content="onlyContent"
                         :desc="desc"
                         :ratings="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item border-1px"
                  v-for="(rating, index) in food.ratings"
                  :key="index"
                  v-show="needShow(rating.rateType, rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime|formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>

    </scroll>
  </transition>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
.foodScroll
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  &.food-enter-active, &.food-leave-active
    transition: all 0.4s linear
    transform: translate3d(0, 0, 0)
  &.food-enter, &.food-leave-to
    transform: translate3d(100%, 0, 0)
  .food-content
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100% /*宽高相等的*/
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px /*点击区变大*/
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              vertical-align: top
              margin-right: 6px
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import CartControl from 'base/cartControl/cartControl'
import Split from 'base/split/split'
import RatingSelect from 'base/ratingSelect/ratingSelect'
import {currency} from 'common/js/currency'
import {formatDate} from 'common/js/date'
import newVue from 'common/js/newVue'
import Vue from 'vue'

const ALL = 2

export default {
  filters: {
    currency: currency,
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    Scroll,
    CartControl,
    Split,
    RatingSelect
  },
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        this.$refs.foodDetail.refresh()
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) { return }
      // 分发监听给上级组件v-goods
      newVue.$emit('cart.add', event.target)
      // 第一次添加购物车时需要添加count属性并初始化为1
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  created () {
    this.probeType = 3
    // 获取子组件的selectType的更新
    newVue.$on('ratingtype.select', selectType => {
      this.selectType = selectType
      this.$nextTick(() => {
        this.$refs.foodDetail.refresh()
      })
    })

    newVue.$on('content.toggle', onlyContent => {
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.$refs.foodDetail.refresh()
      })
    })
  }
}
</script>
