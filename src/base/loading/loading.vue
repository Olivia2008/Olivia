<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 12px
      color: rgba(255, 255, 255, 0.5)
</style>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>
