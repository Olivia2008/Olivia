<template>
  <div class="discountFour">
    <ul v-if="seller.supports" class="supports">
      <li class="support-item border-1px"
          v-for="(item, index) in seller.supports"
          :key="index">
        <span class="icon"
              :class="classMap[seller.supports[index].type]"></span>
        <span class="text">{{ seller.supports[index].description }}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
.discountFour
  .supports
    .support-item
      padding: 16px 12px
      font-size: 0
      border-1px(rgba(7, 17, 27, .1))
      &:last-child
        border-1px-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 16px
        height: 16px
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
</style>
<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {
        type: Object,
        default: () => {}
      }
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$axios.get('/api/seller').then((response) => {
      response = response.data
      if (response.errno === ERR_OK) {
        this.seller = response.data
        // console.log(this.seller)
      }
    })
  }
}
</script>
