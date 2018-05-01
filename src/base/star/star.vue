<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses"
          :class="itemClass"
          :key="index"
          class="star-item"></span>
  </div>
</template>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        // 向下取整 4.2=4
        let score = Math.floor(this.score * 2) / 2
        // 半星 分数的余数不是0 4.5/1=4...0.5
        let hasDecimal = score % 1 !== 0
        // 全星 分数向下取整
        let integer = Math.floor(score)
        // 将全星push到数组
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) { // 如果有半星push到数组
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) { // 数组中的个数小于5时，补空星
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>
