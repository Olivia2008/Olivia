<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease"
           v-show="food.count>0"
           @click.stop.prevent="decreaseCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0px
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition: all .4s linear
        opacity: 1
        transform: translate3D(0, 0, 0) rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3D(24px, 0, 0) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

</style>

<script type="text/ecmascript-6">
import Vue from 'vue'
import newVue from 'common/js/newVue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  /* created () {
    console.log(this.food)
  }, */
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      // console.log('click')
      if (!this.food.count) {
        // 添加food不存在的字段时 需要调用vue.set方法添加，这样才可以通过vue观测到这个字段的变化
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      newVue.$emit('cart.add', event.target)
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
