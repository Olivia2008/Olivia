<template>
  <div class="discountTwo">
    <ul v-if="seller.supports" class="supports">
      <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
        <span class="text">{{ seller.supports[index].description }}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
.discountTwo
  .supports
    width: 80%
    margin: 0 auto
    .support-item
      padding: 0 12px
      margin-bottom: 12px
      font-size: 0
      &:last-child
        margin-bottom: 0
      .icon
        display: inline-block
        width: 16px
        height: 16px
        vertical-align: top
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_2')
        &.discount
          bg-image('discount_2')
        &.guarantee
          bg-image('guarantee_2')
        &.invoice
          bg-image('invoice_2')
        &.special
          bg-image('special_2')
      .text
        font-size: 12px
        line-height: 16px
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
