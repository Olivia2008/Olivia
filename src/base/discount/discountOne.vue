<template>
  <div class="discountOne">
    <div v-if="seller.supports" class="support">
      <span class="icon" :class="classMap[seller.supports[0].type]"></span>
      <span class="text">{{ seller.supports[0].description }}</span>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
.discountOne
  .support
    .icon
      display: inline-block
      vertical-align: top
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px 12px
      background-repeat: no-repeat
      &.decrease
        bg-image('decrease_1')
      &.discount
        bg-image('discount_1')
      &.guarantee
        bg-image('guarantee_1')
      &.invoice
        bg-image('invoice_1')
      &.special
        bg-image('special_1')
    .text
      line-height: 12px;
      font-size: 10px;
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
