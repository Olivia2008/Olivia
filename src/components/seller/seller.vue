<template>
  <div class="seller"
          ref="seller">
    <div class="seller-content">
      <!--商家销售介绍-->
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{'active': favorite}"></i>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <!--公告与活动-->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{ seller.bulletin }}</p>
        </div>
        <discount-four></discount-four>
      </div>
      <split></split>
      <!--商家实景-->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper"
             ref="picWrapper">
          <ul class="pic-list"
              ref="picList">
            <li class="pic-item"
                v-for="(pic, index) in seller.pics"
                :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <!--商家信息-->
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px"
              v-for="(info, index) in seller.infos"
              :key="index">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview
    position: relative
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .desc
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size: 0
      .star
        display: inline-block
        vertical-align: top
        margin-right: 8px
      .text
        display: inline-block
        vertical-align: top
        margin-right: 12px
        line-height: 18px
        font-size: 10px
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, .1)
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)
          .stress
            font-size: 24px
    .favorite
      position: absolute
      right: 11px
      top: 18px
      width: 50px
      text-align: center
      .icon-favorite
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        line-height: 10px
        font-size: 10px
        color: rgb(77, 85, 93)
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .content-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, .1))
      .content
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
  .pics
    padding: 18px 0 18px 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
  .info
    padding: 18px 18px 0 18px
    color: rgb(7, 17, 27)
    .title
      padding-bottom: 8px
      line-height: 14px
      font-size: 14px
      border-1px(rgba(7, 17, 27, .1))
    .info-item
      padding: 16px 12px
      line-height: 16px
      border-1px(rgba(7, 17, 27, .1))
      font-size: 12px
      &:last-child
        border-1px-none()
</style>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import Split from 'base/split/split'
import DiscountFour from 'base/discount/discountFour'
import BScroll from 'better-scroll'
import {saveToLocal, dataFromLocal} from 'common/js/store'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        return dataFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    Star,
    Split,
    DiscountFour
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
      this._initPics()
    }, 20)
  },
  methods: {
    // 收藏
    toggleFavorite (event) {
      if (!event._constructed) { return }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    // 页面整体滚动
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    // 商家图片横向滚动
    _initPics () {
      if (this.seller.pics) {
        // 每一张图片的宽度
        let picWidth = 120
        // 图片之间边距
        let margin = 6
        // ul的宽度=所有图片的宽度相加,再减去最后图片的边距
        let width = (picWidth + margin) * this.seller.pics.length - margin
        // 获取ul的DOM,使其与内部元素宽度相等
        this.$refs.picList.style.width = width + 'px'
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
      }
    }
  }
}
</script>
